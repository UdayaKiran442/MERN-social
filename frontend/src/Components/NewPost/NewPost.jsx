import { Button, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import "./NewPost.css";

const NewPost = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.onload = (e) => {
      if (Reader.readyState === 2) {
        console.log(Reader.result);
      }
    };
    Reader.readAsDataURL(file);
  };
  return (
    <div className="newPost">
      <form className="newPostForm">
        <Typography variant="h3">New Post</Typography>
        {image && <img src={image} alt="post" />}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input
          type="text"
          placeholder="Caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Button type="submit">Post</Button>
      </form>
    </div>
  );
};

export default NewPost;
