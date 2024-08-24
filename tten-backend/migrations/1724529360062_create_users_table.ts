import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  db.schema
    .createTable("user")
    .addColumn("username", "text", (col) => col.primaryKey())
    .addColumn("password", "text")
    .addColumn("createdAt", "int8", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`)
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  db.schema.dropTable("user").execute();
}
