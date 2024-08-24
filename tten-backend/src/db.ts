import { Kysely, SqliteDialect } from "kysely";
import Database from "better-sqlite3";
import { Database as DatabaseType } from "./types/db.js";

const dialect = new SqliteDialect({
  database: new Database("db.sqlite"),
});

const db = new Kysely<DatabaseType>({
  dialect,
});

export default db;
