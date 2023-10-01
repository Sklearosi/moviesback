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
