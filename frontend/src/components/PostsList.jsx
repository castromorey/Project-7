import React from "react";
import { useState } from "react";
import { UPLOADS_ROOT } from "../config";

const PostsList = ({ posts, submitComment, submitLike }) => {
  const [comment, setComment] = useState({});

  const handleComment = async (e) => {
    e.preventDefault();
    console.log({ comment });

    if (!comment.message) {
      console.log(comment.message);
      return;
    }

    const success = await submitComment(comment);

    if (success) setComment({});
  };

  return (
    <div className="flex flex-col mt-5">
      {posts.length === 0
        ? "No posts yet..."
        : posts.map((p) => (
            <div className="border max-h-13 mb-4">
              {p.image && (
                <img src={UPLOADS_ROOT + p.image} alt="" className="w-full" />
              )}
              <p className="p-5">{p.body}</p>
              <div className="flex p-2 gap-16 ">
                <button onClick={() => submitLike(p.id)}>
                  <i class="fa-regular fa-thumbs-up "></i> {p._count.likes}
                </button>
                <button
                  onClick={() => setComment({ postId: p.id, message: "" })}
                >
                  <i class="fa-solid fa-reply"></i>
                </button>
              </div>
              {comment.postId === p.id && (
                <form onSubmit={handleComment} className="relative">
                  <textarea
                    onChange={(e) =>
                      setComment({ ...comment, message: e.target.value })
                    }
                    cols="30"
                    rows="2"
                    value={comment.message}
                    placeholder="Add your comment..."
                    className="w-full p-5"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-3 absolute bottom-2 right-0"
                  >
                    Comment
                  </button>
                </form>
              )}
              {p.comments.length > 0 && (
                <ul className="p-4 border-t">
                  {p.comments.map((c) => (
                    <li key={c.id}>{c.message}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
    </div>
  );
};

export default PostsList;
