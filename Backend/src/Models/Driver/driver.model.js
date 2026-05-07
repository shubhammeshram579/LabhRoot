import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

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
    password:{
        type:String,
         required: true,
    },
     role:{
        type:String,
        default:"driver"
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
     refreshToken:{
        type: String,
    }
  },
  {
    timestamps: true,
  },
);


// midelwere 
driverSchema.pre("save", async function(){
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10)
})


// methods
driverSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}


// methods secret token
driverSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            driver_name:this.driver_name
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )

}


// generateRefreshToken for cookieys
driverSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
    
}

export const Driver = mongoose.model("Driver", driverSchema);
