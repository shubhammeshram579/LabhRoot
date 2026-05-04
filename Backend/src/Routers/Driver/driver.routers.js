import express from "express"
import {DriverRegister} from "../../Controllers/Driver/driver.controller.js"


const router = express.Router()


router.post("/createDriver",DriverRegister)


export default router