"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUserController = exports.signupController = exports.loginController = void 0;
const database_1 = __importDefault(require("../utils/database"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_1 = require("../utils/auth");
const loginController = async (req, res) => {
    const { email, password } = req.body;
    // Check if user exists
    const user = await database_1.default.user.findUnique({
        where: {
            email,
        },
    });
    const invalidMessage = {
        status: "error",
        message: "Invalid email or password",
    };
    // if user does not exist, return error
    if (!user) {
        res.status(401).json(invalidMessage);
        return;
    }
    // if user exists then check the password
    const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        res.status(401).json(invalidMessage);
        return;
    }
    // generate token
    const token = (0, auth_1.generateToken)(user.id);
    res.status(200).json({
        status: "success",
        message: "Login successful",
        data: {
            access_token: token,
        },
    });
};
exports.loginController = loginController;
const signupController = async (req, res) => {
    const { email, password, name } = req.body;
    // Check if user already exists
    const existingUser = await database_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (existingUser) {
        res.status(409).json({
            status: "error",
            message: "User already exists",
        });
        return;
    }
    // Hash password
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    // Create user
    const newUser = await database_1.default.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        },
    });
    // Generate token
    const token = (0, auth_1.generateToken)(newUser.id);
    res.status(201).json({
        status: "success",
        message: "User created successfully",
        data: {
            user: {
                id: newUser.id,
                email: newUser.email,
            },
            access_token: token,
        },
    });
};
exports.signupController = signupController;
const getCurrentUserController = async (req, res) => {
    const { id } = req.user;
    if (!id) {
        res.status(401).json({
            status: "error",
            message: "Unauthorized",
        });
        return;
    }
    // Check if token is valid
    const user = await database_1.default.user.findUnique({
        where: { id: id },
        select: {
            id: true,
            name: true,
            email: true,
        },
    });
    // incase the user is deleted from the database
    if (!user || !user.email) {
        res.status(404).json({
            status: "error",
            message: "User not found",
        });
        return;
    }
    res.status(200).json({
        status: "success",
        message: "User retrieved successfully",
        data: {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        },
    });
};
exports.getCurrentUserController = getCurrentUserController;
