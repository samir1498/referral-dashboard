import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    dialect: 'postgresql',
    schema: './src/infrastructure/db/schema.ts',
    out: './drizzle/migrations',
});