import { sql } from "kysely";
export async function up(db) {
    db.schema
        .createTable("user")
        .addColumn("username", "text", (col) => col.primaryKey())
        .addColumn("password", "text")
        .addColumn("createdAt", "int8", (col) => col.defaultTo(sql `CURRENT_TIMESTAMP`))
        .execute();
}
export async function down(db) {
    db.schema.dropTable("user").execute();
}
