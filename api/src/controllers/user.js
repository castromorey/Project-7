import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) throw Error("Not email and/or password provided");

    const exists = await prisma.user.findUnique({
      where: { email },
    });

    if (exists) throw Error("User already exists");

    const hash = await bcrypt.hash(String(password), 10);

    await prisma.user.create({
      data: {
        email,
        password: hash,
        profile: {
          create: { bio: "I like turtles" },
        },
      },
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (ex) {
    console.log({ ex: ex.message });
    res.status(400).json({ error: ex.message });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) throw Error("Not email and/or password provided");

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        profile: true,
      },
    });

    if (!user) throw Error("User not found");

    const isValid = await bcrypt.compare(String(password), user.password);
    if (!isValid) throw Error("Invalid password");

    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365,
        userId: user.id,
      },
      process.env.JWT_SECRET
    );

    delete user.password;

    const user2 = {
      email: user.email,
      ...user.profile,
    };

    res.status(201).json({ token, ...user2 });
  } catch (ex) {
    console.log({ ex: ex.message });
    res.status(400).json({ error: ex.message });
  }
};

export const me = async (req, res) => {
  // console.log({ test: req.user });
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      include: {
        posts: true,
        profile: true,
      },
    });

    if (user.id !== req.user.userId) throw Error("Unauthorized");

    delete user.password;

    res.status(200).json(user);
  } catch (ex) {
    console.log({ ex: ex.message });
    res.status(400).json({ error: ex.message });
  }
};
