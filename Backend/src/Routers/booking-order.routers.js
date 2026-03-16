import exporess from "express"
import { CreateBookingOrder ,GetBookingOrderbyId} from "../Controllers/booking-order.controller.js"
import {verifyJWT} from "../Middleware/userAuth.js"



const router = exporess.Router()

router.post("/bookingorder", verifyJWT,CreateBookingOrder)
router.get("/bookingorder/:bookingId", verifyJWT,GetBookingOrderbyId)


export default router