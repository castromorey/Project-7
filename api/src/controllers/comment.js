import prisma from "../lib/prisma.js";
/*
const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});
<>
  {user.firstName}
  {dateFormatter.format(date.parse(createdAT))}
</>;*/

export const create = async (req, res) => {
  const { message, postId } = req.body; //, createdAT
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
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
    });

    //post.image = `http://localhost:3000/uploads/${post.image}`;

    res.status(201).json(comment);
  } catch (ex) {
    console.log({ ex: ex.message });
    res.status(400).json({ error: ex.message });
  }
};
