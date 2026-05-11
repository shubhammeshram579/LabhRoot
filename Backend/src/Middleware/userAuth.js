import { ApiError } from "../Utils/apiErrors.js";
import jwt from "jsonwebtoken"
import {Users} from "../Models/user.model.js"
import {Driver} from "../Models/Driver/driver.model.js"
import dotenv from "dotenv"

dotenv.config();


// customer middelwere
 const verifyJWT = async (req,res,next) => {
    try {
        const token = req.cookies?.accessToken || req.headers["Authorization"]?.replace("Bearer ", "");

        // console.log("token",token)

        if(!token){
            throw new ApiError(401, "Unauthorized requrest")
        }


       const decodedToken =  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)


    //    console.log("decodedToken",decodedToken)



       const user = await Users.findById(decodedToken?._id).select("-password -refreshToken")

    //    console.log("usernext auth",user)

        if(!user){
            throw new ApiError(401, "Invalid Access Token")
        }

        req.user = user
        next()
        
    } catch (error) {
        throw new ApiError(400, error.message || "something userAuht middelwere error")
    }


}


// driver midelwere
 const verifyJWTDriver = async (req,res,next) => {
    try {
        const token = req.cookies?.accessToken || req.headers["Authorization"]?.replace("Bearer ", "");


        if(!token){
            throw new ApiError(401, "Unauthorized requrest")
        }


       const decodedToken =  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)



       const driver = await Driver.findById(decodedToken?._id).select("-password -refreshToken")

       console.log("driver midelwere",driver)


        if(!driver){
            throw new ApiError(401, "Invalid Access Token")
        }

        req.user = driver
        next()
        
    } catch (error) {
        throw new ApiError(400, error.message || "something userAuht middelwere error")
    }


}



export {

    verifyJWT,
    verifyJWTDriver

}