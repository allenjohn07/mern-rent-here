import { User } from "../models/UserModel.js";
import bcrypt from 'bcrypt'


//register
export const registerUser = async (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    if (name.length === 0 || email.length === 0 || password.length === 0) {
        return res.json({
            message: "Empty fields"
        })
    }
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.json({
                message: 'User already exists!'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({ name, email, password: hashedPassword })
        res.json({
            message: 'Registered Successfully!'
        })

    } catch (error) {
        res.json({
            message: error
        })
    }
}


//login
export const loginUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (email.length === 0 || password.length === 0) {
        return res.json({
            message: 'Invalid Credentials'
        })
    }

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({
                message: 'User does not exists!'
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.json({
                message: 'Password does not match'
            })
        }

        res.json({ name: user.name, email: user.email, message:'Login Successfull'})


    } catch (error) {
        console.error(error);
    }
}
