import { ApiError } from "../Utils/apiErrors.js";
import jwt from "jsonwebtoken"
import Users from "../Models/user.model.js"


export const verifyJWT = async (req,res,next) => {
    try {
        const token = req.cookies?.accessToken || req.headers["Authorization"]?.replace("Bearer ", "");

        if(!token){
            throw new ApiError(401, "Unauthorized requrest")
        }


       const decodedToken =  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

       const user = Users.findById(decodedToken._id).select("-password -refreshToken")

        if(!user){
            throw new ApiError(401, "Invalid Access Token")
        }

        req.user = user
        next()
        
    } catch (error) {
        throw new ApiError(400, error.message || "something userAuht middelwere error")
    }


}