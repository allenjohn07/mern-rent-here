import express from "express";
import { sendEmail, SendSMS, VerifyEmail, verifyPhone } from "../controllers/VerificationController.js";
const router = express.Router();

//route to send the email
router.post("/email/send", sendEmail)

//route to verify the email otp
router.post("/email/verify", VerifyEmail)

//route to send the phone otp
router.post("/phone/send", SendSMS)

//route to verify the phone otp
router.post("/phone/verify", verifyPhone)

export { router as VerifyRoutes };
