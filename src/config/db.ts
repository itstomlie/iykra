import { Pool } from "pg";
import { host, user, password, database, port } from "./config";

const pool = new Pool({
  host: host,
  user: user,
  password: password,
  database: database,
  port: parseInt(port || "5432"),
  idleTimeoutMillis: 30000,
});

export default pool;
