import { pgTable, unique, uuid, varchar, text, timestamp, check, integer, foreignKey, numeric } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: varchar({ length: 25 }).notNull(),
	email: varchar({ length: 50 }).notNull(),
	passwordHash: varchar("password_hash", { length: 255 }).notNull(),
	description: varchar({ length: 120 }),
	avatarUrl: text("avatar_url"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("users_email_key").on(table.email),
]);

export const movies = pgTable("movies", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	title: varchar({ length: 70 }).notNull(),
	description: text(),
	durationMinutes: integer("duration_minutes").notNull(),
	releaseYear: integer("release_year"),
	coverUrl: text("cover_url"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("movies_title_key").on(table.title),
	check("movies_duration_positive", sql`duration_minutes > 0`),
	check("movies_release_year_valid", sql`(release_year IS NULL) OR ((release_year >= 1888) AND (release_year <= 2200))`),
]);

export const reviews = pgTable("reviews", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	movieId: uuid("movie_id").notNull(),
	reviewText: text("review_text"),
	rating: numeric({ precision: 2, scale:  1 }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAi: timestamp("updated_ai", { withTimezone: true, mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.movieId],
			foreignColumns: [movies.id],
			name: "reviews_movie_id_fkey"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "reviews_user_id_fkey"
		}),
	check("reviews_rating_valid", sql`(rating >= 0.5) AND (rating <= (5)::numeric)`),
]);

export const comments = pgTable("comments", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	reviewId: uuid("review_id").notNull(),
	comentText: text("coment_text").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.reviewId],
			foreignColumns: [reviews.id],
			name: "comments_review_id_fkey"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "comments_user_id_fkey"
		}),
]);
