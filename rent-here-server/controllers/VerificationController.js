import randomstring from "randomstring";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { User } from "../models/UserModel.js";
import twilio from "twilio";

//function to send mail
export const sendEmail = async (req, res) => {
  const { name, email } = req.body;
  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check if the user's email is already verified
    if (user.isEmailVerified === true) {
      return res.json({
        message: "Email already verified",
      });
    }

    // Create OTP using random string
    const otp = randomstring.generate({
      length: 6,
      charset: "numeric",
    });

    // Update the user with the new OTP
    try {
      await User.updateOne({ email }, { $set: { EmailOtp: otp } });
    } catch (error) {
      return res.status(500).json({
        message: "An error occurred while updating the OTP",
        error: error.message,
      });
    }

    // Send mail using nodemailer
    let config = {
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    };

    let transporter = nodemailer.createTransport(config);

    // Template for generating mail content
    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Cream Bun",
        link: "https://www.google.com/search?q=cream+bun&oq=cream+bun&gs_lcrp=EgZjaHJvbWUqEAgAEAAYgwEY4wIYsQMYgAQyEAgAEAAYgwEY4wIYsQMYgAQyDQgBEC4YgwEYsQMYgAQyBwgCEAAYgAQyCggDEAAYyQMYgAQyCggEEAAYkgMYgAQyBggFEEUYPDIGCAYQRRg8MgYIBxBFGD3SAQg3MDI1ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8",
      },
    });

    let emailTemplate = {
      body: {
        name: name,
        intro:
          "Welcome to Email Verification! We're very excited to verify your account!!!.",
        action: {
          instructions:
            "To get started with verification, please use the code below:",
          button: {
            color: "#22BC66", // Optional action button color
            text: otp,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };

    // Generating the email with the above details by passing it to MailGenerator
    let emailBody = MailGenerator.generate(emailTemplate);

    let message = {
      from: process.env.EMAIL,
      to: email,
      subject: "Email Verification",
      // Passing the emailBody as the html
      html: emailBody,
    };

    // Sending the mail using sendMail by passing the above message
    transporter
      .sendMail(message)
      .then(() => {
        return res.json({
          message: "Email sent successfully",
        });
      })
      .catch((error) => {
        return res.status(501).json({
          error,
        });
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An unexpected error occurred",
      error: error.message,
    });
  }
};

//function to verify mail
export const VerifyEmail = async (req, res) => {
  const { email, token } = req.body;
  try {
    const EmailToVerify = await User.findOne({ email });
    if (!EmailToVerify) {
      return res.json({
        message: "Email does not exist",
      });
    }
    if (EmailToVerify.EmailOtp !== Number(token)) {
      return res.json({
        message: "Incorrect OTP",
      });
    }
    await User.updateOne(
      { email },
      {
        $set: {
          isEmailVerified: true,
        },
      }
    );
    return res.json({
      message: "Verfied Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

//function to send phone otp
export const SendSMS = async (req, res) => {
  const { email } = req.body;
  try {
    // Create OTP using random string
    const otp = randomstring.generate({
      length: 6,
      charset: "numeric",
    });

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Update the user with the new OTP
    try {
      await User.updateOne({ email }, { $set: { PhoneOtp: otp } });
    } catch (error) {
      return res.status(500).json({
        message: "An error occurred while updating the OTP",
        error: error.message,
      });
    }

    const accountSid = process.env.accountSid;
    const authToken = process.env.authToken;
    const client = twilio(accountSid, authToken);

    client.messages
      .create({
        body: `Your Verification code : ${otp}`,
        from: "+16503766992",

        to: "+917510302992",
      })
      .then(() => {
        return res.json({
          message: "SMS sent successfully",
        });
      })
      .catch((error) => {
        return res.status(501).json({
          error,
        });
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An unexpected error occurred",
      error: error.message,
    });
  }
};


//function to verify the phone otp
export const verifyPhone = async (req, res) => {
  const { email, token } = req.body;
  try {
    const EmailToVerify = await User.findOne({ email });
    if (!EmailToVerify) {
      return res.json({
        message: "Email does not exist",
      });
    }
    if (EmailToVerify.PhoneOtp !== Number(token)) {
      return res.json({
        message: "Incorrect OTP",
      });
    }
    await User.updateOne(
      { email },
      {
        $set: {
          isPhoneVerified: true,
        },
      }
    );
    return res.json({
      message: "Verfied Successfully",
    });
  } catch (error) {
    console.log(error);
  }
}
