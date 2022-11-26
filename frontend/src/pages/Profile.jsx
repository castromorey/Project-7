import axios from "axios";
import { useState, useEffect } from "react";
import { API_ROOT } from "../config";
import { Layout } from "../components/Layout3";
import { Link, useNavigate } from "react-router-dom";

export const Home = () => {
  const [content, setContent] = useState("");

  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  // Context API

  useEffect(() => {
    if (!localStorage.getItem("token")) return navigate("/");

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
      console.log(res);
      setData(res.data);
    } catch (ex) {
      // setError(ex.response.data.error);
      console.log({ ex });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API_ROOT}/posts`,
        { content },
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPosts([res.data, ...posts]); //add post ti the list
      setContent(""); //delete text area content
      console.log(res);
    } catch (ex) {
      // setError(ex.response.data.error);
      console.log({ ex });
    }
  };
  return (
    <Layout>
      <div className="flex">
        <div className="w-1/4"></div>
        <div className="w-1/2 border">
          <form onSubmit={handleSubmit}>
            <textarea
              onChange={(e) => setContent(e.target.value)}
              cols="30"
              rows="3"
              value={content}
              placeholder="Add your comment..."
              className="w-full p-5"
            />
            <div className="flex justify-start items-center gap-6">
              <div className=" p-2">
                <i class="fa-regular fa-image"></i>
              </div>
              <div>
                <i class="fa-regular fa-face-smile"></i>
              </div>
              <button className="bg-blue-500 p-2 block text-white w-full">
                Post
              </button>
            </div>
          </form>

          <form onClick={handleSubmit}>
            <div className="flex flex-col  p-4 ">
              {posts.length === 0
                ? "No posts yet..."
                : posts.map((p) => (
                    <div className="border max-h-13">
                      {p.body || p.image}
                      <div className=" flex p-2 gap-16">
                        <i class="fa-regular fa-thumbs-up"></i>
                        <i class="fa-solid fa-reply"></i>
                      </div>
                    </div>
                  ))}
            </div>
          </form>
        </div>
      </div>

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
};

/*import axios from "axios";
import { useState, useEffect } from "react";
import { API_ROOT } from "../config";
import { Layout } from "../components/Layout3";

export const Profile = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${API_ROOT}/users/me`, {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res);
      setData(res.data);
    } catch (ex) {
      setError(ex.response.data.error);
      //console.log({ ex });
    }
  };

  return (
    <Layout>
      <main className="flex">
        <aside className="bg-orange-300 w-1/3">
          <ul className=" flex flex-col p-3  gap-3">
            <li className="flex gap-3 items-center">
              <i class="fa-regular fa-envelope"></i>E-mail to: {data.email}
            </li>

            <li className="flex gap-3 items-center">
              <i class="fa-regular fa-calendar"></i> Events
            </li>
          </ul>
        </aside>

        <aside className="Wmax-h-80 bg-orange-400 w-1/3">
          <textarea name="Post" id="Post" cols="85" rows="4"></textarea>
          <nav className=" flex flex-col">
            <ul className="p-5  items-start">
              <li>
                <i class="fa-solid fa-image"></i> Photo or video
              </li>
            </ul>
            <div className=" flex justify-center">
              <button className="bg-purple-400 rounded-md px-7 py-1 mb-2">
                Share
              </button>
            </div>
          </nav>
        </aside>

        <aside className="bg-orange-300 w-1/3 max-h-60">
          <p className="flex gap-3 items-center p-3">
            <i class="fa-solid fa-gift"></i> <b>Dioni</b> and
            <b>2 ohers friends</b>
            have Birthday today.
          </p>
          <p className="text-5xl text-al">
            <center> We celebrate Birthday Togeder.</center>
          </p>
        </aside>
      </main>
    </Layout>
  );
};
*/
