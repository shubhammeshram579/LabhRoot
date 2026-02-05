import express from "express"
import {UserRegiter,UserLogin,UserLogout,CurretUser} from "../Controllers/users.controller.js"
import {verifyJWT} from "../Middleware/userAuth.js"


const router = express.Router();


router.post("/createUsers", UserRegiter);
router.post("/login", UserLogin);
router.post("/logout", verifyJWT, UserLogout);
router.get("/crrentUser" ,verifyJWT,CurretUser);


export default router