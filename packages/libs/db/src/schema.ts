import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid} from "drizzle-orm/pg-core";


export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password"),
    following: text("following").array(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
})

export const images = pgTable("images", {
  id: uuid("id").defaultRandom().primaryKey(),
  url: text("url").notNull(),
  fileId: text("file_id").notNull(),
  userId: uuid("user_id").references(() => users.id),
});

// Its just like we use populate in the mongoDB

export const usersRelations = relations(users, ({ one }) => ({
   avatar: one(images, {
    fields: [users.id],    // It's like => Take my user.id and points to the filed that matches user's id to the images me userId field
    references: [images.userId]
   })
}))

export const imagesRelations = relations(images, ({ one }) => ({
   user: one(users, {
    fields: [images.userId],  // It's like => Take my userId field and points to the user filed that matches user's id.
    references: [users.id]
   })
}))