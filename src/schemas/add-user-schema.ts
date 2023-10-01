import Joi, { CustomHelpers } from "joi";
import User from "models/User";
import { NewUser, UserType } from "types/user";

const ifUserExists =
  (user: UserType | null) => (value: string, helpers: CustomHelpers) => {
    if (user) {
      return helpers.error("User with this email already exists");
    }
    return value;
  };

const addUserSchema = async (data: NewUser) => {
  const user = await User.findOne({ email: data.email });

  return Joi.object<NewUser>({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().custom(ifUserExists(user)).required(),
    password: Joi.string().min(8).max(15).required(),
  });
};

export default addUserSchema;
