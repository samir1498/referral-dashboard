import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    dialect: 'postgresql',
    schema: './src/infrastructure/db/schema.ts',
    out: './drizzle/migrations',
});