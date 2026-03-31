import exporess from "express"
import { CreateBookingOrder ,GetallBookingbyUser,GetBookingOrderbyId} from "../Controllers/booking-order.controller.js"
import {verifyJWT} from "../Middleware/userAuth.js"



const router = exporess.Router()

router.post("/bookingorder", verifyJWT,CreateBookingOrder)
router.get("/bookingorder/:bookingId", verifyJWT,GetBookingOrderbyId)
router.get("/bookingorderList", verifyJWT,GetallBookingbyUser)


export default router