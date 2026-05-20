import mongoose from "mongoose";

const bookingOrderSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
        driver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Driver",
        },
        bookingAddressId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
        },

        vehicleName:{
            type:String,
            required: true,
        },

        priceToll:{
            type:String,
            required: true,
        },
        netvalue:{
            type:String,
            required: true,
        },
        paidprice:{
            type:String,
            required: true,
        },
        weight:{
            type:String,
            required: true,
        },
        size:{
            type:String,
            required: true,
        },
        image:{
            type:String
        },
        paymentMode:{
            type: String,
            required:true
        },
        goodsTypes:{
            type:String,
            required:true
        },
        stutus:{
            type:String,
            enum: [
            "pending",
            "accepted",
            "pickup",
            "in-transit",
            "delivery complete",
            "cancelled",
            "failed"
        ],
        default: "pending",
        }


    },{timestamps:true}
)


export const BookingOrder = mongoose.model("BookingOrder",bookingOrderSchema)