import { useState, useRef } from "react";

const Post = ({ submit }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const uploadRef = useRef();

  const filePicker = () => {
    uploadRef.current.click();
  };

  const handleUpload = ({ target }) => {
    setImage(target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content && !image) {
      return;
    }

    const success = await submit({ image, content });

    if (success) {
      setContent("");
      setImage(null);
    }
  };

  return (
    <div className="border ">
      {image && (
        <div className="relative">
          <img
            src={URL.createObjectURL(image)}
            alt=""
            className="w-full h-auto"
          />
          <button
            onClick={() => setImage(null)}
            className="absolute top-0 right-0 bg-red-500 text-white p-1"
          >
            x
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          cols="30"
          rows="3"
          placeholder="Add your comment..."
          className="w-full p-5"
        />

        <div className="flex justify-start items-center gap-6">
          <input
            ref={uploadRef}
            accept="image/*"
            type="file"
            name="image"
            id="image"
            className="hidden"
            onChange={handleUpload}
          />
          <button type="button" onClick={filePicker} className=" p-2">
            <i className="fa-regular fa-image"></i>
          </button>

          <button className="bg-blue-500 p-2 block text-white w-full border-spacing-1">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default Post;
