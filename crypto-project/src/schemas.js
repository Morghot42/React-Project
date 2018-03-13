import { schema } from "normalizr";

export const coinSchema = new schema.Entity(
  "coins",
  {},
  { idAttribute: "_id" }
);
