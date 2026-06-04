import { pgTable, serial, text, integer, numeric, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const registrationsTable = pgTable("registrations", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  emergencyContact: text("emergency_contact").notNull(),
  donationAmount: numeric("donation_amount", { precision: 10, scale: 2 }).notNull().default("0"),
  sponsorCode: text("sponsor_code"),
  schoolReferralCode: text("school_referral_code"),
  totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
  paymentStatus: text("payment_status").notNull().default("pending"),
  paypalOrderId: text("paypal_order_id"),
  termsAccepted: boolean("terms_accepted").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const registrationMembersTable = pgTable("registration_members", {
  id: serial("id").primaryKey(),
  registrationId: integer("registration_id")
    .notNull()
    .references(() => registrationsTable.id, { onDelete: "cascade" }),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  gender: text("gender").notNull(),
  age: integer("age").notNull(),
  runDistance: text("run_distance").notNull(),
  shirtSize: text("shirt_size").notNull(),
  cost: numeric("cost", { precision: 10, scale: 2 }).notNull(),
});

export const insertRegistrationSchema = createInsertSchema(registrationsTable).omit({
  id: true,
  createdAt: true,
});

export const insertMemberSchema = createInsertSchema(registrationMembersTable).omit({
  id: true,
  registrationId: true,
});

export type Registration = typeof registrationsTable.$inferSelect;
export type RegistrationMember = typeof registrationMembersTable.$inferSelect;
export type InsertRegistration = z.infer<typeof insertRegistrationSchema>;
export type InsertMember = z.infer<typeof insertMemberSchema>;
