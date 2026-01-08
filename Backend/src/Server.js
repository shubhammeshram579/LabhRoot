import express from "express"
import UserRouter from "../src/Routers/users.routers.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import ConnectDB from "..//src/Db/connectDB.js"

const app = express()

// cousrs
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

// database connection 
ConnectDB()


// configration 
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


app.use("/api/users", UserRouter)

app.get("/home",(req,res) => {
    res.send("sunnn")
})

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server runing on ${PORT}`))



export  {app}