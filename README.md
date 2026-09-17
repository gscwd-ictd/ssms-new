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

| Variable             | Description                                                             | Default in image                                 |
| -------------------- | ----------------------------------------------------------------------- | ------------------------------------------------ |
| `DATABASE_URL`       | PostgreSQL connection string                                            | `postgres://admin:password@localhost:5435/ssms`  |
| `BETTER_AUTH_URL`    | Public URL of the app, used by Better Auth                              | `http://localhost:3000`                          |
| `BETTER_AUTH_SECRET` | Secret used to sign sessions                                            | Development value (replace it in production)     |
| `PORT`               | Port the server listens on                                              | `3000`                                           |

For any real deployment, generate a new secret with `openssl rand -hex 32` and pass it at runtime. Don't rely on the value baked into the image.

### Notes

- The build installs dependencies with `npm ci`, because the Dockerfile checks for `package-lock.json` before `pnpm-lock.yaml`. Keep `package-lock.json` up to date when you change dependencies.
- Add a `.dockerignore` that excludes `node_modules`, `.next`, `.git` and `.env*`. Without it, your local `node_modules` is copied into the image and can break native modules on Alpine Linux.
- For Apple Silicon Macs building for an amd64 server, add `--platform linux/amd64` to `docker build`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
