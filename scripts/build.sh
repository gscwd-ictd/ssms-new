#!/usr/bin/env bash
#
# Builds and starts the app with Docker Compose, then applies database migrations.
#
# Usage: scripts/build.sh [options]
#   --web-only      Rebuild and restart only the app container
#   --no-cache      Build the image without using the Docker layer cache
#   --skip-migrate  Don't run database migrations
#   --logs          Follow the app logs when done
#   -h, --help      Show this help

set -euo pipefail

cd "$(dirname "$0")/.."

APP_URL="http://localhost:3000"
DB_CONTAINER="ssms_db"
TIMEOUT=60

WEB_ONLY=false
NO_CACHE=false
SKIP_MIGRATE=false
FOLLOW_LOGS=false

log() { printf '\033[1;34m==>\033[0m %s\n' "$*"; }
fail() { printf '\033[1;31mError:\033[0m %s\n' "$*" >&2; exit 1; }

usage() {
  sed -n '3,11p' "$0" | sed 's/^# \{0,1\}//'
}

while [ $# -gt 0 ]; do
  case "$1" in
    --web-only) WEB_ONLY=true ;;
    --no-cache) NO_CACHE=true ;;
    --skip-migrate) SKIP_MIGRATE=true ;;
    --logs) FOLLOW_LOGS=true ;;
    -h | --help) usage; exit 0 ;;
    *) usage; fail "Unknown option: $1" ;;
  esac
  shift
done

# --- Prerequisites ---------------------------------------------------------

command -v docker >/dev/null 2>&1 || fail "Docker is not installed."
docker compose version >/dev/null 2>&1 || fail "Docker Compose v2 ('docker compose') is not available."
docker info >/dev/null 2>&1 || fail "The Docker daemon is not running. Start Docker Desktop and try again."

if [ "$SKIP_MIGRATE" = false ]; then
  command -v npm >/dev/null 2>&1 || fail "npm is required to run migrations (or pass --skip-migrate)."
fi

if [ ! -f .dockerignore ]; then
  log "Warning: no .dockerignore found. Local node_modules will be copied into the build context."
fi

# --- Build and start -------------------------------------------------------

if [ "$WEB_ONLY" = true ]; then
  services="web"
else
  services=""
fi

if [ "$NO_CACHE" = true ]; then
  log "Building images without cache..."
  # shellcheck disable=SC2086
  docker compose build --no-cache $services
fi

log "Building and starting containers..."
# shellcheck disable=SC2086
docker compose up --build -d $services

# --- Wait for the database -------------------------------------------------

wait_for_db() {
  log "Waiting for the database to accept connections..."
  local elapsed=0
  until docker exec "$DB_CONTAINER" pg_isready -U admin -d ssms >/dev/null 2>&1; do
    [ "$elapsed" -ge "$TIMEOUT" ] && fail "Database was not ready after ${TIMEOUT}s. Check 'docker compose logs db'."
    sleep 2
    elapsed=$((elapsed + 2))
  done
}

# --- Migrations ------------------------------------------------------------

if [ "$SKIP_MIGRATE" = false ]; then
  wait_for_db

  if [ ! -d node_modules ]; then
    log "Installing npm dependencies..."
    npm ci
  fi

  log "Applying database migrations..."
  npm run db:migrate
fi

# --- Wait for the app ------------------------------------------------------

log "Waiting for the app at $APP_URL..."
elapsed=0
until curl -s -o /dev/null "$APP_URL"; do
  if [ "$elapsed" -ge "$TIMEOUT" ]; then
    fail "App did not respond after ${TIMEOUT}s. Check 'docker compose logs web'."
  fi
  sleep 2
  elapsed=$((elapsed + 2))
done

log "Done. The app is running at $APP_URL"

if [ "$FOLLOW_LOGS" = true ]; then
  docker compose logs -f web
fi
