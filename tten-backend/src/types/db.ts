import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable,
} from "kysely";

export interface Database {
  user: UserTable;
}

export interface UserTable {
  username: string;
  password: string;
  createdAt: Generated<Date>;
}
