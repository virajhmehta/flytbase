import User from '../model/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            throw new Error("All fields are required.");
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email format.");
        }
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("User already exists.");
        }

        const user = new User({ username, email, password });
        await user.save();
        
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            throw new Error("Email and password are required.");
        }

        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            throw new Error("Invalid email or password.");
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.status(200).send({ user, token });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};


export { register, login };
