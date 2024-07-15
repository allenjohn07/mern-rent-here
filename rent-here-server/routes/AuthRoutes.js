import express from 'express'
import { getUser, GoogleLogin, loginUser, registerUser } from '../controllers/AuthController.js'
const router = express.Router()


//route to get the currentUser
router.post("/user", getUser)

//register route
router.post("/register", registerUser)

//login route
router.post("/login", loginUser)

//google login route
router.post("/google/login",GoogleLogin)

export { router as AuthRoutes };