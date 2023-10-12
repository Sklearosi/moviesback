import mongoose, { Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface Movie extends Document {
  title: string;
  thumbnail: {
    regular: {
      small: string;
      medium: string;
      large: string;
    };
  };
  year: number;
  category: string;
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;
}

const movieSchema = new mongoose.Schema<Movie>({
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    regular: {
      small: String,
      medium: String,
      large: String,
    },
  },
  year: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  isBookmarked: {
    type: Boolean,
    required: true,
  },
  isTrending: {
    type: Boolean,
    required: true,
  },
});

movieSchema.pre<Movie>("save", function (next) {
  if (!this.id) {
    this.id = uuidv4();
  }
  next();
});

const Movie = mongoose.model<Movie>("Movie", movieSchema);

export default Movie;