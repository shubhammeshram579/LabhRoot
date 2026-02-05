import express from "express"
import {CreateBooking} from "../Controllers/booking.controller.js"
import {verifyJWT} from "../Middleware/userAuth.js"

const router = express.Router();


router.post("/createbooking", verifyJWT, CreateBooking)


export default router;