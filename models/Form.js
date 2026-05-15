import mongoose from "mongoose";

const fromSchema = new mongoose.Schema(
  {
    supplierToken: {
      type: String,
    },

    platform: {
      type: String,
      required: true,
    },

    platformEmail: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 15,
    },

    email: {
      type: String,
      required: true,
    },

    product: {
      type: String,
    },

    place: {
      type: String,
      required: true,
    },

    priceRange: {
      type: String,
      required: false,
    },

    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Form = mongoose.model("Form", fromSchema);
export default Form;