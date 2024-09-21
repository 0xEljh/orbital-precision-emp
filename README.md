# Orbital Precision EMP

## Running locally

Install nextjs client dependencies and then run the development server:

```bash
cd orbital-precision-emp-client
npm install
npm run db:generate
npm run db:migrate
npm run dev
```

Start the python backend server via Docker:

```bash
cd superdestroyer
docker-compose up
```
