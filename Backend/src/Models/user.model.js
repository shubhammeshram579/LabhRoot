import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique:true,
        lowercase: true
    },
    email:{
        type:String,
        required: true,
        unique:true,
        lowercase: true
    },
    password:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required: true,
    },
    role:{
        type:String,
        default:"customer"
    },
    is_active: {
        type: Boolean, 
        default: true 
    },
    // email_verified: {
    //     type: Boolean, 
    //     default: false 
    // },
    // phone_verified: { 
    //     type: Boolean, 
    //     default: false 
    // },
    address: {
    street: String,
    city: String,
    },
    refreshToken:{
        type: String,
    }

},{timestamps:true})


// midelwere 
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})


// methods
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}


// methods secret token
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )

}


// generateRefreshToken for cookieys
userSchema.methods.generateRefreshToken = function(){
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


export const Users =  mongoose.model("Users",userSchema)