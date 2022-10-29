import { Schema, model } from "mongoose";

interface IContact {
  name: string;
  phone: string;
}

const contactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Contact", contactSchema);
