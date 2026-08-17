import { relations } from "drizzle-orm/relations";
import { movies, reviews, users, comments } from "./schema";

export const reviewsRelations = relations(reviews, ({one, many}) => ({
	movie: one(movies, {
		fields: [reviews.movieId],
		references: [movies.id]
	}),
	user: one(users, {
		fields: [reviews.userId],
		references: [users.id]
	}),
	comments: many(comments),
}));

export const moviesRelations = relations(movies, ({many}) => ({
	reviews: many(reviews),
}));

export const usersRelations = relations(users, ({many}) => ({
	reviews: many(reviews),
	comments: many(comments),
}));

export const commentsRelations = relations(comments, ({one}) => ({
	review: one(reviews, {
		fields: [comments.reviewId],
		references: [reviews.id]
	}),
	user: one(users, {
		fields: [comments.userId],
		references: [users.id]
	}),
}));