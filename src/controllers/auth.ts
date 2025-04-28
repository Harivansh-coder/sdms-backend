import { Request, Response } from "express";
import prisma from "@/src/utils/database";
import bcrypt from "bcryptjs";
import { generateToken } from "@/src/utils/auth";
import { envVariables } from "../utils/env";
import jwt from "jsonwebtoken";

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  const invalidMessage = {
    status: "error",
    message: "Invalid email or password",
  };

  if (!user) {
    res.status(401).json(invalidMessage);
    return;
  }

  const now = new Date();

  // Check if user is blocked
  if (user.isBlocked && user.blockedUntil && user.blockedUntil > now) {
    res.status(401).json({
      status: "error",
      message: "Account is blocked. Please try again after some time",
    });
    return;
  }

  // check if user is blocked
  // Unblock user if block period is over
  if (user.isBlocked && user.blockedUntil && user.blockedUntil <= now) {
    await prisma.user.update({
      where: { email },
      data: {
        isBlocked: false,
        failedLoginAttempts: 0,
        blockedUntil: null,
      },
    });
    user.isBlocked = false;
    user.failedLoginAttempts = 0;
  }

  // check if password is correct
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    const newAttemptCount = user.failedLoginAttempts + 1;

    const dataToUpdate: any = {
      failedLoginAttempts: { increment: 1 },
    };

    // lock the account if failed login attempts are more than 5
    if (newAttemptCount >= 5) {
      dataToUpdate.isBlocked = true;
      dataToUpdate.blockedUntil = new Date(Date.now() + 24 * 60 * 60 * 1000); // block for 24 hours
    }

    await prisma.user.update({
      where: { email },
      data: dataToUpdate,
    });

    res.status(401).json({
      status: "error",
      message:
        newAttemptCount >= 5
          ? "Account is blocked. Please try again after some time"
          : "invalid email or password",
    });
    return;
  }

  // make the failed login attempts to 0
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      failedLoginAttempts: 0,
      isBlocked: false,
      blockedUntil: null,
    },
  });

  // generate token
  const token = generateToken(user.id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    sameSite: "strict",
  });

  res.redirect("/");
};

export const signupController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
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
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  // Generate token
  const token = generateToken(newUser.id);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    sameSite: "strict",
  });

  res.redirect("/");
};

export const getCurrentUserController = async (req: Request, res: Response) => {
  const currentUser = req.user;
  if (!currentUser) {
    res.status(401).json({
      status: "error",
      message: "Unauthorized",
    });
    return;
  }

  // Check if token is valid
  const user = await prisma.user.findUnique({
    where: { id: currentUser.id },
    select: { email: true },
  });

  if (!user || user.email) {
    res.status(401).json({
      status: "error",
      message: "Unauthorized",
    });
    return;
  }

  res.status(200).json({
    status: "success",
    message: "User retrieved successfully",
    data: {
      user: {
        email: user.email,
      },
    },
  });
};

export const logoutController = async (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.redirect("/login");
};

export const getUserEmailByToken = async (token: string) => {
  if (!token) {
    return null;
  }

  // Verify token and extract user ID
  const decodedToken = jwt.verify(token, envVariables.JWT_SECRET_KEY) as {
    id: string;
  };

  const userId = decodedToken.id;
  if (!userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true },
  });

  return user;
};
