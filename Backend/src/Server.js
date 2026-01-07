import express from "express"
import UserRouter from "../src/Routers/users.routers"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// cousrs
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))


// configration 
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


app.use("/api/users", UserRouter)



export default app