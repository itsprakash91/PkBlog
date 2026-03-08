import { handleError } from "../helpers/handleError.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

export const Register = async (req, res, next) => {
    try {
        console.log("Incoming body:", req.body); // 👈 add this
        const { name, email, password } = req.body;

        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return next(handleError(409, 'User already registered.'));
        }

        const hashedPassword = bcryptjs.hashSync(password, 10); // 👈 add salt rounds = 10
        console.log("Hashed password generated."); // 👈 log

        const user = new User({
            name, email, password: hashedPassword
        });

        await user.save();
        console.log("User saved successfully."); // 👈 log

        res.status(200).json({
            success: true,
            message: 'Registration Successful.'
        });

    } catch (error) {
        console.error("Register Error:", error); // 👈 add this line
        next(handleError(500, error.message));
    }
}

export const Login = async (req, res, next) => {
    try {
        console.log("Incoming body:", req.body);

        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            next(handleError(404, 'Invalid Login Credentials.'))
        }

        const hashedPassword = user.password
        const comparePassword = await bcryptjs.compare(password, hashedPassword)
        if (!comparePassword) {
            next(handleError(404, 'Invalid Login Credentials.'))
        }

        const token = jwt.sign({
            _id: user._id,
            role: user.role,
            name: user.name,
            email: user.email,
            avatar: user.avatar
        }, process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: '/'
        })

        const newUser = user.toObject({ getters: true })
        delete newUser.password

        res.status(200).json({
            success: true,
            user: newUser,
            message: 'Login Successful'
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const GoogleLogin = async (req, res, next) => {
    try {
        const { name, email, avatar } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            // NEW USER → DEFAULT ROLE = user
            const password = Math.round(Math.random() * 100000000).toString();
            const hashedPassword = bcryptjs.hashSync(password, 10);

            user = await new User({
                name,
                email,
                password: hashedPassword,
                avatar,
                role: "user" // 👈 IMPORTANT
            }).save();
        }

        const token = jwt.sign(
            {
                _id: user._id,
                role: user.role,
                name: user.name,
                email: user.email,
                avatar: user.avatar
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            path: "/"
        });

        const userObj = user.toObject();
        delete userObj.password;

        res.status(200).json({
            success: true,
            user: userObj,
            message: "Login Successful"
        });

    } catch (error) {
        next(handleError(500, error.message));
    }
};


export const Logout = async (req, res, next) => {
    try {
        res.clearCookie('access_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: '/'
        })

        res.status(200).json({
            success: true,
            message: 'Logout Successful.'
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}