import "dotenv/config";
import express from "express";
import prisma from "./lib/prisma.js";
import * as userCtrl from "./controllers/user.js";
import * as postCtrl from "./controllers/post.js";
import * as commentCtrl from "./controllers/comment.js";
import { authMiddleware } from "./middlewares/auth.js";
import cors from "cors";
import multer from "multer";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use("/uploads", express.static("uploads"));

app.get("/", authMiddleware, (req, res) =>
  res.json({ message: "API running!" })
);

app.post("/users/signup", userCtrl.signup);
app.post("/users/signin", userCtrl.signin);

app.delete("/users", authMiddleware, userCtrl.remove);
app.get("/users/me", authMiddleware, userCtrl.me);

app.get("/profile", async (req, res) => {
  const allUsers = await prisma.user.findMany();
  res.json(allUsers);
});

app.post("/posts", [authMiddleware, upload.single("image")], postCtrl.create);
app.get("/posts", authMiddleware, postCtrl.getAll);
app.delete("/posts/:postId", authMiddleware, postCtrl.deletePost);
app.post("/posts/:postId/like", authMiddleware, postCtrl.like);
app.post("/comments", authMiddleware, commentCtrl.create);

app.listen(3001, () => console.log(`Server running on port 3001`));
