import express from "express"
import {DriverRegister,DriverLogin,DriverLogout, GetCurrectDriver} from "../../Controllers/Driver/driver.controller.js"


const router = express.Router()


router.post("/createDriver",DriverRegister)
router.post("/loginDriver",DriverLogin)
router.post("/logoutDriver",DriverLogout)
router.get("/currentDriver",GetCurrectDriver)


export default router