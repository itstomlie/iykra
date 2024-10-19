"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const config_1 = require("./config");
const pool = new pg_1.Pool({
    host: config_1.host,
    user: config_1.user,
    password: config_1.password,
    database: config_1.database,
    port: parseInt(config_1.port || "5432"),
    idleTimeoutMillis: 30000,
});
exports.default = pool;
