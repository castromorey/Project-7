import prisma from "../lib/prisma.js";

export const create = async (req, res) => {
  const { message, postId } = req.body;

  try {
    if (!message && !postId) throw Error("Not content or image provided");

    const comment = await prisma.comment.create({
      //create a post
      data: {
        message,
        post: {
          connect: { id: postId },
        },
        user: {
          connect: { id: req.user.userId },
        },
      },
    });

    // post.image = `http://localhost:3000/uploads/${post.image}`;

    res.status(201).json(comment);
  } catch (ex) {
    console.log({ ex: ex.message });
    res.status(400).json({ error: ex.message });
  }
};
