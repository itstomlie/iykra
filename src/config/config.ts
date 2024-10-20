import * as dotenv from "dotenv";
dotenv.config();

export const host = process.env.DB_HOST;
export const port = process.env.DB_PORT;
export const user = process.env.POSTGRES_USER;
export const password = process.env.POSTGRES_PASSWORD;
export const database = process.env.POSTGRES_DB;
