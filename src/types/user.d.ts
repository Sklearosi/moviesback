export interface UserType {
  name: string;
  email: string;
  password: string;
  id: string;
  bookmarks: {
    moviesId: [];
  };
}

export interface NewUser {
  name: string;
  email: string;
  password: string;
}

export interface MovieInfo  {
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
};