import { useState, useContext } from "react";
import { UPLOADS_ROOT } from "../config";
import { UserContext } from "../context";
import TimeAgo from "react-timeago";

const PostsList = ({ posts, submitComment, submitLike, deletePost }) => {
  const { user } = useContext(UserContext);

  const [comment, setComment] = useState({});

  const handleComment = async (e) => {
    e.preventDefault();

    if (!comment.message) {
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
            <div key={p.id} className="border max-h-13 mb-4 shadow rounded-lg">
              <div className="flex items-center p-4">
                <span className="mr-3 flex items-center font-bold justify-center w-10 h-10 rounded-full border border-green-600 bg-green-300">
                  {p.user.profile.firstName.charAt(0)}
                </span>
                <div>
                  <span className="font-bold">
                    {p.user.profile.firstName} {p.user.profile.lastName}
                  </span>
                  <div className="-mt-1 text-xs">
                    <TimeAgo date={p.createdAt} />
                  </div>
                </div>
              </div>
              {p.image && (
                <img
                  src={UPLOADS_ROOT + p.image}
                  alt=""
                  className="min-w-min"
                />
              )}
              <p className="p-5">{p.body}</p>
              <div className="flex items-center justify-between px-4 border-t border-b">
                <div></div>
                <div className="flex p-2 gap-16 ">
                  <button onClick={() => submitLike(p.id)}>
                    <i className="fa-regular fa-thumbs-up "></i>{" "}
                    {p._count.likes}
                  </button>
                  <button
                    onClick={() => setComment({ postId: p.id, message: "" })}
                  >
                    <i className="fa-solid fa-reply"></i>
                  </button>
                  {user.userId === p.userId && (
                    <button onClick={() => deletePost(p.id)}>
                      <i className="fa-sharp fa-solid fa-trash-can text-red-600"></i>
                    </button>
                  )}
                </div>
              </div>
              {comment.postId === p.id && (
                <form onSubmit={handleComment} className="relative">
                  <textarea
                    onChange={(e) =>
                      setComment({
                        ...comment,
                        message: e.target.value,
                      })
                    }
                    cols="30"
                    rows="2"
                    value={comment.message}
                    placeholder="Replay comment..."
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
              {p.comments.length > 0 ? (
                <ul className="p-4 border-solid rounded-lg">
                  {p.comments.map((c) => (
                    <li key={c.id} className="flex mb-3">
                      <span className="mr-3 flex items-center font-bold justify-center w-10 h-10 rounded-full border border-green-600 bg-green-300">
                        {c.user.profile.firstName.charAt(0)}
                      </span>

                      <div className="bg-gray-200 rounded-lg p-3 flex-1">
                        <div className="text-xs flex justify-between">
                          <span className="font-bold ">
                            {c.user.profile.firstName} {c.user.profile.lastName}
                          </span>
                          <span>
                            <TimeAgo date={c.createdAt} />
                          </span>
                        </div>
                        {c.message}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="p-4 border-solid rounded-lg">
                  <li>No comments yet...</li>
                </ul>
              )}
            </div>
          ))}
    </div>
  );
};

export default PostsList;
