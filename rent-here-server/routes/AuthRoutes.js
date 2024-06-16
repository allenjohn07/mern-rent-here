import express from 'express'
import { loginUser, registerUser } from '../controllers/AuthController.js'
const router = express.Router()


//register route
router.post("/register", registerUser)

//login route
router.post("/login", loginUser)

export { router as AuthRoutes };