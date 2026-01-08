import expores from "express"
import {ApiError} from "../Utils/apiErrors.js"
import {ApiResponse} from "../Utils/apiResponse.js"
import {Users} from "../Models/user.model.js"



const genrateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await Users.findById(userId);

        const accesToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accesToken,refreshToken}

        
    } catch (error) {
        throw new ApiError(500,"Something went wrong while genrating refresh and access token")
        
    }

}
const UserRegiter =  async (req,res) => {
    try {
        const {username,email,password,mobile} = req.body;

        if(!username || !email || !password  || !mobile){
            throw new ApiError(400, "all files required");
        }

        const UserExite = await Users.findOne(
            {$or: [{email}]}
        )

        if(UserExite){
            throw new ApiError(400, "User allready created");
        }

        const user = await Users.create({
            username:username.toLowerCase(),
            email,
            password,
            mobile
        })

        const createUser = await Users.findById(user.id).select("-password");

        if(!createUser){
            throw new ApiError(400, "user not create sonthing error");
        }

        return res.status(200).json(
             new ApiResponse(200,{createUser},"User registered succesfully")

        )

        
    } catch (error) {
        throw new ApiError(400, error.message);
        
    }


}


const UserLogin = async (req,res) => {
    try {

        const {email,password} = req.body;

        if(!email || !password){
            throw new ApiError(400, "all filed required")
        }

        const user = await Users.findOne({
            $or: [{email}]
        })

        if(!user){
            throw new ApiError(400, "User not exid")
        }

        const isuserpasswordValid = user.isPasswordCorrect(password)

        if(!isuserpasswordValid){
             throw new ApiError(401, "Password is invaild")
        }

       const {accesToken,refreshToken} = await  genrateAccessAndRefreshToken(user._id)

       const loginUser = await Users.findById(user._id).select("-password -refreshToken")


        // send cookie
        const options = {
            httpOnly: true,
            secure: true
        }

        return res
        .status(200)
        .cookie("accessToken",accesToken,options)
        .cookie("refreshToken",refreshToken ,options)
        .json(
            new ApiResponse(201,{
                user:loginUser,accesToken,refreshToken
            },
            "user loaged in succesfully"
        ))

        
    } catch (error) {
        throw new ApiError(400, error.message);   
    }

}


const UserLogout = async (req,res) => {
    try {

        await Users.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200, {}, "user logout succesfully"))
        
    } catch (error) {
        throw new ApiError(400, error.message);
    }

}

export {
    UserRegiter,
    UserLogin,
    UserLogout
}