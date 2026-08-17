"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsRelations = exports.usersRelations = exports.moviesRelations = exports.reviewsRelations = void 0;
const relations_1 = require("drizzle-orm/relations");
const schema_1 = require("./schema");
exports.reviewsRelations = (0, relations_1.relations)(schema_1.reviews, ({ one, many }) => ({
    movie: one(schema_1.movies, {
        fields: [schema_1.reviews.movieId],
        references: [schema_1.movies.id]
    }),
    user: one(schema_1.users, {
        fields: [schema_1.reviews.userId],
        references: [schema_1.users.id]
    }),
    comments: many(schema_1.comments),
}));
exports.moviesRelations = (0, relations_1.relations)(schema_1.movies, ({ many }) => ({
    reviews: many(schema_1.reviews),
}));
exports.usersRelations = (0, relations_1.relations)(schema_1.users, ({ many }) => ({
    reviews: many(schema_1.reviews),
    comments: many(schema_1.comments),
}));
exports.commentsRelations = (0, relations_1.relations)(schema_1.comments, ({ one }) => ({
    review: one(schema_1.reviews, {
        fields: [schema_1.comments.reviewId],
        references: [schema_1.reviews.id]
    }),
    user: one(schema_1.users, {
        fields: [schema_1.comments.userId],
        references: [schema_1.users.id]
    }),
}));
