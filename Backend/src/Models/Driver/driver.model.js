import mongoose from "mongoose";

const driverSchema = new mongoose.Schema(
  {
    driver_name: {
      type: String,
      required: true,
      trim: true,
    },

    mobile_number: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
    },

    license_number: {
      type: String,
      required: true,
      unique: true,
    },

    vehicle_type: {
      type: String,
      enum: [
        "Pickup",
        "Mahindra Pickup",
        "Chota Hathi",
        "Mini Truck",
        "Tempo",
        "Truck",
      ],
      default: "Pickup",
    },

    vehicle_number: {
      type: String,
      required: true,
      uppercase: true,
    },

    address: {
      type: String,
    },

    city: {
      type: String,
    },

    state: {
      type: String,
    },

    pincode: {
      type: String,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    is_verified: {
      type: Boolean,
      default: false,
    },

    joining_date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export const Driver = mongoose.model("Driver", driverSchema);
