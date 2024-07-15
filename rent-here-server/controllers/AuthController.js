import { User } from "../models/UserModel.js";
import bcrypt from "bcrypt";

//to get the user
export const getUser = async (req, res) => {
  const { email } = req.body;
  try {
    const currentUser = await User.findOne({ email });
    if (!currentUser) {
      return res.json({
        message: "User does not exist",
      });
    }
    res.json({
      user: currentUser,
    });
  } catch (error) {
    console.log(error);
  }
};

//register
export const registerUser = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  if (name.length === 0 || email.length === 0 || password.length === 0) {
    return res.json({
      message: "Empty fields",
    });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        message: "User already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isEmailVerified: false,
      isPhoneVerified: false,
      EmailOtp: "",
      PhoneOtp: "",
      imageURL: "",
    });
    res.json({
      message: "Registered Successfully!",
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

//login
export const loginUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (email.length === 0 || password.length === 0) {
    return res.json({
      message: "Invalid Credentials",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        message: "User does not exists!",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({
        message: "Password does not match",
      });
    }

    res.json({
      name: user.name,
      email: user.email,
      message: "Login Successfull",
    });
  } catch (error) {
    console.error(error);
  }
};

export const GoogleLogin = async (req, res) => {
  const { name, email, imageURL } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const updatedUser = await User.updateOne(
        { email },
        {
          $set: {
            imageURL,
          },
        }
      );
      return res.json({
        message: "User exist!",
      });
    }

    const hashedPassword = await bcrypt.hash("GoogleLogin123456789!@#$%^&*(",10)
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      isEmailVerified: false,
      isPhoneVerified: false,
      EmailOtp: "",
      PhoneOtp: "",
      imageURL,
    });
    return res.json({
      message: "Registered Successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: error,
    });
  }
};
