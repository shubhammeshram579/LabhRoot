import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    pickup: {
      type: String,
      required: true,
    },
    drop: {
      type: String,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    businesstype: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true },
);

export const Booking = mongoose.model("Booking", bookingSchema);
