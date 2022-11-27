import prisma from "../lib/prisma.js";

export const create = async (req, res) => {
  const { content } = req.body;

  try {
    if (!content && !req.file) throw Error("Not content or image provided");

    const post = await prisma.post.create({
      //create a post
      data: {
        body: content,
        image: req.file?.filename,
        user: {
          connect: { id: req.user.userId },
        },
      },
      include: {
        comments: true,
        _count: {
          select: { likes: true },
        },
      },
    });

    res.status(201).json(post);
  } catch (ex) {
    console.log({ ex: ex.message });
    res.status(400).json({ error: ex.message });
  }
};

export const getAll = async (req, res) => {
  //   console.log({ test: req.user });
  try {
    const posts = await prisma.post.findMany({
      orderBy: [
        {
          id: "desc",
        },
      ],
      include: {
        comments: true,
        _count: {
          select: { likes: true },
        },
      },
    });

    res.status(200).json(posts);
  } catch (ex) {
    console.log({ ex: ex.message });
    res.status(400).json({ error: ex.message });
  }
};

export const like = async (req, res) => {
  const postId = Number(req.params.postId);

  try {
    const hasLiked = await prisma.like.findFirst({
      where: { postId, userId: req.user.userId },
    });

    if (hasLiked) throw Error("Not content or image provided");

    const liked = await prisma.like.create({
      data: {
        post: {
          connect: { id: postId },
        },
        user: {
          connect: { id: req.user.userId },
        },
      },
    });

    res.status(201).json(liked);
  } catch (ex) {
    console.log({ ex: ex.message });
    res.status(400).json({ error: ex.message });
  }
};
