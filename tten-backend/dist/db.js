import { Kysely, SqliteDialect } from "kysely";
import Database from "better-sqlite3";
const dialect = new SqliteDialect({
    database: new Database("db.sqlite"),
});
const db = new Kysely({
    dialect,
});
export default db;
