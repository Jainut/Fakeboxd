"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comments = exports.reviews = exports.movies = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.uuid)().defaultRandom().primaryKey().notNull(),
    name: (0, pg_core_1.varchar)({ length: 25 }).notNull(),
    email: (0, pg_core_1.varchar)({ length: 50 }).notNull(),
    passwordHash: (0, pg_core_1.varchar)("password_hash", { length: 255 }).notNull(),
    description: (0, pg_core_1.varchar)({ length: 120 }),
    avatarUrl: (0, pg_core_1.text)("avatar_url"),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
    (0, pg_core_1.unique)("users_email_key").on(table.email),
]);
exports.movies = (0, pg_core_1.pgTable)("movies", {
    id: (0, pg_core_1.uuid)().defaultRandom().primaryKey().notNull(),
    title: (0, pg_core_1.varchar)({ length: 70 }).notNull(),
    description: (0, pg_core_1.text)(),
    durationMinutes: (0, pg_core_1.integer)("duration_minutes").notNull(),
    releaseYear: (0, pg_core_1.integer)("release_year"),
    coverUrl: (0, pg_core_1.text)("cover_url"),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
    (0, pg_core_1.unique)("movies_title_key").on(table.title),
    (0, pg_core_1.check)("movies_duration_positive", (0, drizzle_orm_1.sql) `duration_minutes > 0`),
    (0, pg_core_1.check)("movies_release_year_valid", (0, drizzle_orm_1.sql) `(release_year IS NULL) OR ((release_year >= 1888) AND (release_year <= 2200))`),
]);
exports.reviews = (0, pg_core_1.pgTable)("reviews", {
    id: (0, pg_core_1.uuid)().defaultRandom().primaryKey().notNull(),
    userId: (0, pg_core_1.uuid)("user_id").notNull(),
    movieId: (0, pg_core_1.uuid)("movie_id").notNull(),
    reviewText: (0, pg_core_1.text)("review_text"),
    rating: (0, pg_core_1.numeric)({ precision: 2, scale: 1 }).notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    updatedAi: (0, pg_core_1.timestamp)("updated_ai", { withTimezone: true, mode: 'string' }),
}, (table) => [
    (0, pg_core_1.foreignKey)({
        columns: [table.movieId],
        foreignColumns: [exports.movies.id],
        name: "reviews_movie_id_fkey"
    }),
    (0, pg_core_1.foreignKey)({
        columns: [table.userId],
        foreignColumns: [exports.users.id],
        name: "reviews_user_id_fkey"
    }),
    (0, pg_core_1.check)("reviews_rating_valid", (0, drizzle_orm_1.sql) `(rating >= 0.5) AND (rating <= (5)::numeric)`),
]);
exports.comments = (0, pg_core_1.pgTable)("comments", {
    id: (0, pg_core_1.uuid)().defaultRandom().primaryKey().notNull(),
    userId: (0, pg_core_1.uuid)("user_id").notNull(),
    reviewId: (0, pg_core_1.uuid)("review_id").notNull(),
    comentText: (0, pg_core_1.text)("coment_text").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
    (0, pg_core_1.foreignKey)({
        columns: [table.reviewId],
        foreignColumns: [exports.reviews.id],
        name: "comments_review_id_fkey"
    }),
    (0, pg_core_1.foreignKey)({
        columns: [table.userId],
        foreignColumns: [exports.users.id],
        name: "comments_user_id_fkey"
    }),
]);
