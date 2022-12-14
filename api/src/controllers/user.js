import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

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
          create: { bio: "I like turtles", firstName, lastName },
        },
      },
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (ex) {
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
    res.status(400).json({ error: ex.message });
  }
};

export const me = async (req, res) => {
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

    const user2 = {
      email: user.email,
      ...user.profile,
    };

    res.status(200).json({ ...user2 });
  } catch (ex) {
    res.status(400).json({ error: ex.message });
  }
};

export const remove = async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: req.user.userId,
      },
    });

    res.status(200).json({ message: "User has been deleted" });
  } catch (ex) {
    res.status(400).json({ error: ex });
  }
};
