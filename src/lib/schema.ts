import { pgTable, text, timestamp, real, integer, unique } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const motorcycles = pgTable("motorcycles", {
  id: text("id").primaryKey(),
  model: text("model").notNull(),
  year: integer("year").notNull(),
  fuelEfficiency: real("fuel_efficiency").notNull(),
  fuelPrice: real("fuel_price").notNull(),
  userId: text("user_id").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const shifts = pgTable("shifts", {
  id: text("id").primaryKey(),
  status: text("status").default("em_andamento").notNull(),
  startKm: real("start_km").notNull(),
  goal: real("goal").notNull(),
  endKm: real("end_km"),
  startTime: timestamp("start_time").defaultNow().notNull(),
  endTime: timestamp("end_time"),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const snapshots = pgTable("snapshots", {
  id: text("id").primaryKey(),
  km: real("km").notNull(),
  platform: text("platform").notNull(),
  earnings: real("earnings").notNull(),
  totalRides: integer("total_rides").notNull().default(0),
  shiftId: text("shift_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ one }) => ({
  motorcycle: one(motorcycles, {
    fields: [users.id],
    references: [motorcycles.userId],
  }),
  shifts: one(shifts, {
    fields: [users.id],
    references: [shifts.userId],
  }),
}));

export const motorcyclesRelations = relations(motorcycles, ({ one }) => ({
  user: one(users, {
    fields: [motorcycles.userId],
    references: [users.id],
  }),
}));

export const shiftsRelations = relations(shifts, ({ one, many }) => ({
  user: one(users, {
    fields: [shifts.userId],
    references: [users.id],
  }),
  snapshots: many(snapshots),
}));

export const snapshotsRelations = relations(snapshots, ({ one }) => ({
  shift: one(shifts, {
    fields: [snapshots.shiftId],
    references: [shifts.id],
  }),
}));
