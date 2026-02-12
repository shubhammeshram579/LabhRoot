import express from "express"
import {CreateBooking,getBookingByid} from "../Controllers/booking.controller.js"
import {verifyJWT} from "../Middleware/userAuth.js"

const router = express.Router();


router.post("/createbooking",verifyJWT, CreateBooking)
router.get("/booking/:id", getBookingByid)


export default router;