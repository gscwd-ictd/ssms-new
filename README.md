This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Docker

The [Dockerfile](Dockerfile) builds a production image of the app using Next.js standalone output. It listens on port `3000`.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) with Docker Compose v2 (`docker compose`)
- Node.js and npm on your machine, used only to run database migrations

### Option 1: Docker Compose (recommended)

[docker-compose.yaml](docker-compose.yaml) builds the app image and starts it together with a PostgreSQL 15 database.

#### Using the build script

[scripts/build.sh](scripts/build.sh) runs all the steps below with one command. It:

1. Checks that Docker, Docker Compose v2 and npm are installed and that the Docker daemon is running.
2. Builds the image and starts the containers with `docker compose up --build -d`.
3. Waits for the database to accept connections.
4. Installs npm dependencies if `node_modules` is missing, then runs `npm run db:migrate`. Migrations that were already applied are skipped, so this is safe on every run.
5. Waits until the app responds at [http://localhost:3000](http://localhost:3000).

Run it from the project root:

```bash
scripts/build.sh
```

If you get a `permission denied` error, make the script executable first with `chmod +x scripts/build.sh`, or run it with `bash scripts/build.sh`.

Options:

| Option           | Description                                           |
| ---------------- | ----------------------------------------------------- |
| `--web-only`     | Rebuild and restart only the app container            |
| `--no-cache`     | Build the image without using the Docker layer cache  |
| `--skip-migrate` | Don't run database migrations (npm isn't needed then) |
| `--logs`         | Follow the app logs when the build is done            |
| `-h`, `--help`   | Show the help message                                 |

Options can be combined. For example, after changing app code, rebuild only the app and watch its logs:

```bash
scripts/build.sh --web-only --skip-migrate --logs
```

The script waits up to 60 seconds for the database and for the app. If either one isn't ready by then, the script exits with an error. Check the logs with `docker compose logs db` or `docker compose logs web`.

#### Running the steps by hand

1. Build the image and start both containers:

   ```bash
   docker compose up --build -d
   ```

2. On the first run, apply the database migrations from your machine. Postgres is exposed on `localhost:5435`, which is where [drizzle.config.ts](drizzle.config.ts) points:

   ```bash
   npm install
   npm run db:migrate
   ```

3. Open [http://localhost:3000](http://localhost:3000).

Useful commands:

```bash
docker compose build web      # rebuild only the app image
docker compose up -d web      # restart the app with the new image
docker compose logs -f web    # follow the app logs
docker compose down           # stop the containers (database data is kept)
docker compose down -v        # stop the containers and delete the database volume
```

### Option 2: Build and run the image on its own

Build the image:

```bash
docker build -t ssms-app .
```

Run it and point it at an existing PostgreSQL database. Don't use `localhost` in `DATABASE_URL`: inside the container, `localhost` means the container itself. To reach a database running on your machine, use `host.docker.internal` (Docker Desktop):

```bash
docker run -d --name ssms_app -p 3000:3000 \
  -e DATABASE_URL=postgres://admin:password@host.docker.internal:5435/ssms \
  -e BETTER_AUTH_URL=http://localhost:3000 \
  -e BETTER_AUTH_SECRET=<your-secret> \
  ssms-app
```

To start only the database for this option, run `docker compose up -d db`.

### Environment variables

| Variable             | Description                                | Default in image                                |
| -------------------- | ------------------------------------------ | ----------------------------------------------- |
| `DATABASE_URL`       | PostgreSQL connection string               | `postgres://admin:password@localhost:5435/ssms` |
| `BETTER_AUTH_URL`    | Public URL of the app, used by Better Auth | `http://localhost:3000`                         |
| `BETTER_AUTH_SECRET` | Secret used to sign sessions               | Development value (replace it in production)    |
| `PORT`               | Port the server listens on                 | `3000`                                          |

For any real deployment, generate a new secret with `openssl rand -hex 32` and pass it at runtime. Don't rely on the value baked into the image.

### Notes

- The build installs dependencies with `npm ci`, because the Dockerfile checks for `package-lock.json` before `pnpm-lock.yaml`. Keep `package-lock.json` up to date when you change dependencies.
- Add a `.dockerignore` that excludes `node_modules`, `.next`, `.git` and `.env*`. Without it, your local `node_modules` is copied into the image and can break native modules on Alpine Linux.
- For Apple Silicon Macs building for an amd64 server, add `--platform linux/amd64` to `docker build`.
