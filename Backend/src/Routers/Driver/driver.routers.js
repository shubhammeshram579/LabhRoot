import express from "express"
import {DriverRegister,DriverLogin,DriverLogout, GetCurrectDriver} from "../../Controllers/Driver/driver.controller.js"
import {verifyJWTDriver} from "../../Middleware/userAuth.js"


const router = express.Router()


router.post("/createDriver",DriverRegister)
router.post("/loginDriver",DriverLogin)
router.post("/logoutDriver",verifyJWTDriver, DriverLogout)
router.get("/currentDriver",verifyJWTDriver ,GetCurrectDriver)


export default router