import { ApiError } from "../../../src/Utils/apiErrors.js";
import { ApiResponse } from "../../../src/Utils/apiResponse.js";
import { Driver } from "../../../src/Models/Driver/driver.model.js";
import { BookingOrder } from "../../Models/booking-order.model.js";





const orderlist = async (req,res) => {
    try {

        const driverId = req.user._id;


        const order = await BookingOrder.find({driver:driverId})

         if(!order){
            throw new ApiError(400, "user not found")
        }

        return res.status(200).json(
            new ApiResponse(201,order, "order get succesfully" )

        )

        
    } catch (error) {
        throw new ApiError(500, "something went wrong", error.message)

        
    }
}


const orderAccept = async (req,res) => {
    try {
        const orderId = req.params;
        const userId = req.user._id;
        const {status} = req.body;
        
        
        if(!orderId || !userId){
            throw new ApiError(400, "orderid and userid not found")
        }

        const orderaccept  = await BookingOrder.findOneAndUpdate(
            {_id:orderId , driver:userId},
            {
                $set:{
                    stutus:status
                }
            },{
                new: true
            }
               
        )

          if(!orderaccept){
            throw new ApiError(400, "order not accepted")
        }


        return res.status(200).json(
              new ApiResponse(201,orderaccept, "order acceped get succesfully" )
        )
        
    } catch (error) {
        throw new ApiError(500, "something went wrong", error.message)
        
    }
} 


export {orderlist,orderAccept}