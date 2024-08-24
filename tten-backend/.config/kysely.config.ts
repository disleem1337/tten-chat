import { SqliteDialect } from "kysely";
import { defineConfig } from "kysely-ctl";
import Database from "better-sqlite3";

const dialect = new SqliteDialect({
  database: new Database("db.sqlite"),
});

export default defineConfig({
  // replace me with a real dialect instance OR a dialect name + `dialectConfig` prop.
  dialect: dialect,
  migrations: {
    migrationFolder: "migrations",
  },
});
