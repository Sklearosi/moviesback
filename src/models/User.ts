import mongoose from "mongoose";
import { UserType } from "types/user";
import { v4 as uuid } from "uuid";

const userSchema = new mongoose.Schema<UserType>({
  name: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  id: {
    type: mongoose.Schema.Types.String,
    required: true,
    default: uuid,
  },
  bookmarks: {
    moviesId: {
      type: mongoose.Schema.Types.Array,
    },
  },
});

const User = mongoose.model("User", userSchema);

export default User;
