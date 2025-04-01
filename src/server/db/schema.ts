
import {
  int,
  text,
  index,
  singlestoreTableCreator,
  bigint,
  timestamp,
} from "drizzle-orm/singlestore-core";


/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = singlestoreTableCreator(
  (name) => `drive_tutorial_${name}`,
);

export const files_table = createTable("files_table", {
  id: bigint("id", {mode: "number", unsigned: true}).primaryKey().autoincrement(),
  owenerId: text("user_id").notNull(),

  name: text("name").notNull(),
  size: int("size").notNull(),
  url: text("url").notNull(),
  parent: bigint("parent", {mode: "number", unsigned: true}).notNull(),
  createAt: timestamp("create_at").notNull().defaultNow(),
}, 
(t) => {
  return [
    index("parent_index").on(t.parent),
    index("owner_index").on(t.owenerId),
  ];
});

export type DB_FileType = typeof files_table.$inferSelect

export const folders_table = createTable("folders_table", {
  id: bigint("id", {mode: "number", unsigned: true}).primaryKey().autoincrement(),
  owenerId: text("user_id").notNull(),
  name: text("name").notNull(),
  parent: bigint("parent", {mode: "number", unsigned: true}),
  createAt: timestamp("create_at").notNull().defaultNow(),
}, 
(t) => {
  return [
    index("parent_index").on(t.parent),
    index("owner_index").on(t.owenerId),
  ];
});

export type DB_FolderType = typeof files_table.$inferSelect