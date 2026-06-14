import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  boolean,
  integer,
  jsonb,
} from "drizzle-orm/pg-core";

// ── Admin Users ───────────────────────────────────────────────
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ── Appointments ──────────────────────────────────────────────
export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  patientName: varchar("patient_name", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  department: varchar("department", { length: 50 }).notNull(),
  preferredDate: varchar("preferred_date", { length: 20 }).notNull(),
  message: text("message"),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
  notified: boolean("notified").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ── Contact Leads ─────────────────────────────────────────────
export const contactLeads = pgTable("contact_leads", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 200 }),
  phone: varchar("phone", { length: 20 }).notNull(),
  subject: varchar("subject", { length: 200 }),
  message: text("message").notNull(),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ── Services ──────────────────────────────────────────────────
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  title: varchar("title", { length: 200 }).notNull(),
  shortDesc: text("short_desc").notNull(),
  longDesc: text("long_desc"),
  icon: varchar("icon", { length: 50 }),
  category: varchar("category", { length: 20 }).notNull().default("eye"),
  isActive: boolean("is_active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  metaTitle: varchar("meta_title", { length: 200 }),
  metaDesc: text("meta_desc"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ── Gallery ───────────────────────────────────────────────────
export const gallery = pgTable("gallery", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  label: varchar("label", { length: 100 }),
  description: varchar("description", { length: 200 }),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ── Blog / Articles ───────────────────────────────────────────
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  title: varchar("title", { length: 300 }).notNull(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  coverImage: text("cover_image"),
  author: varchar("author", { length: 100 }).notNull().default("Dr. Rachit Agarwal"),
  category: varchar("category", { length: 50 }),
  tags: text("tags"), // comma-separated
  isPublished: boolean("is_published").notNull().default(false),
  metaTitle: varchar("meta_title", { length: 200 }),
  metaDesc: text("meta_desc"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ── SEO Settings ──────────────────────────────────────────────
export const seoSettings = pgTable("seo_settings", {
  id: serial("id").primaryKey(),
  page: varchar("page", { length: 50 }).notNull().unique(), // home, about, services, doctors, gallery, contact
  title: varchar("title", { length: 200 }),
  description: text("description"),
  keywords: text("keywords"),
  ogImage: text("og_image"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ── Site Settings (key-value) ─────────────────────────────────
export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  value: jsonb("value"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ── WhatsApp Templates ────────────────────────────────────────
export const whatsappTemplates = pgTable("whatsapp_templates", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  message: text("message").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ── Notifications Log ─────────────────────────────────────────
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  type: varchar("type", { length: 20 }).notNull(), // email, sms, whatsapp
  recipient: varchar("recipient", { length: 200 }).notNull(),
  subject: varchar("subject", { length: 200 }),
  message: text("message").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("sent"),
  relatedTo: varchar("related_to", { length: 50 }), // appointment_id, contact_id
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ── Analytics (daily stats) ───────────────────────────────────
export const analyticsDaily = pgTable("analytics_daily", {
  id: serial("id").primaryKey(),
  date: varchar("date", { length: 10 }).notNull().unique(), // YYYY-MM-DD
  pageViews: integer("page_views").notNull().default(0),
  appointments: integer("appointments").notNull().default(0),
  contactLeads: integer("contact_leads").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ── Types ─────────────────────────────────────────────────────
export type Appointment = typeof appointments.$inferSelect;
export type ContactLead = typeof contactLeads.$inferSelect;
export type Service = typeof services.$inferSelect;
export type GalleryItem = typeof gallery.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type WhatsAppTemplate = typeof whatsappTemplates.$inferSelect;
