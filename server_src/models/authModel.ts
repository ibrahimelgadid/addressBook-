import { Schema, model } from "mongoose";

interface IUser {
  username: string;
  email: string;
  password: string;
}
const authSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Auth", authSchema);
