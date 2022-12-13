import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { API_ROOT, UPLOADS_ROOT } from "../config";
import { Layout } from "../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { PostForm } from "../components/Forms";
import PostsList from "../components/PostsList";
import { UserContext } from "../context";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!localStorage.getItem("token")) return;

    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API_ROOT}/posts`, {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });
      setPosts(res.data);
    } catch (ex) {
      console.log({ ex });
    }
  };

  const submit = async (data) => {
    try {
      const res = await axios.post(`${API_ROOT}/posts`, data, {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setPosts([res.data, ...posts]); //add post to the list

      return true;
    } catch (ex) {
      console.log({ ex });
      return false;
    }
  };

  const submitComment = async (data) => {
    try {
      const res = await axios.post(`${API_ROOT}/comments`, data, {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });

      setPosts((prev) => {
        return prev.map((p) => {
          if (p.id === data.postId) {
            p.comments = [res.data, ...p.comments];

            return p;
          } else {
            return p;
          }
        });
      });

      return true;
    } catch (ex) {
      console.log({ ex });
      return false;
    }
  };

  const submitLike = async (postId) => {
    try {
      const res = await axios.post(`${API_ROOT}/posts/${postId}/like`, null, {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });

      setPosts((prev) => {
        return prev.map((p) => {
          if (p.id === postId) {
            p._count.likes = p._count.likes + 1;

            return p;
          } else {
            return p;
          }
        });
      }); //add post ti the list

      return true;
    } catch (ex) {
      // setError(ex.response.data.error);
      console.log({ ex });
      return false;
    }
  };

  const deletePost = async (postId) => {
    try {
      const res = await axios.delete(`${API_ROOT}/posts/${postId}`, {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });

      setPosts((prev) => {
        return prev.filter((p) => p.id !== postId);
      }); //add post ti the list

      console.log(res);

      return true;
    } catch (ex) {
      console.log({ ex });
      return false;
    }
  };

  if (!user.token) {
    return (
      <Layout>
        <header className="flex justify-center items-center flex-col gap-3">
          <span>Any account yet? Click on the button below</span>
          <div>
            <button className="w-40 border-0 rounded-md p-1 bg-blue-500">
              <Link to="/signup">Sign Up</Link>
            </button>
          </div>
        </header>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex">
        <div className="w-1/4"></div>
        <div className="w-1/2">
          <PostForm submit={submit} />
          <PostsList
            posts={posts}
            submitComment={submitComment}
            submitLike={submitLike}
            deletePost={deletePost}
          />
        </div>
      </div>
    </Layout>
  );
};
