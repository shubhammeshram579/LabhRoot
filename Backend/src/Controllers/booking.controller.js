import {ApiError} from "../Utils/apiErrors.js"
import {ApiResponse} from "../Utils/apiResponse.js"
import {Booking} from "../Models/booking.model.js"




const CreateBooking = async (req,res) => {
    try {

        const {pickup,drop,receiver,number,businesstype} = req.body;
        const userId = req.user._id

        if(!pickup || !drop || !receiver || !number || !businesstype){
            throw new ApiError(400, "all filed is required")
        }


        const booking = await Booking.create({
            pickup,
            drop,
            receiver,
            number,
            businesstype,
            owner:userId

        })

        if(!booking){
            throw new ApiError(400, "booking not create")
        }

        return res
        .status(200)
        .json(
            new ApiResponse(200,{booking},"booking succesfully")
        )
        
    } catch (error) {
        throw new ApiError(500, error.message)
    }

}

export {
    CreateBooking
}