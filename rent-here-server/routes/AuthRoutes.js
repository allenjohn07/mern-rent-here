import express from 'express'
import { getUser, loginUser, registerUser } from '../controllers/AuthController.js'
const router = express.Router()


//route to get the currentUser
router.post("/user", getUser)

//register route
router.post("/register", registerUser)

//login route
router.post("/login", loginUser)

export { router as AuthRoutes };