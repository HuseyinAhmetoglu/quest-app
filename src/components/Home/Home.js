import React, { useState, useEffect } from "react";
import Post from "../Post/Post";
import "./Home.css";
import PostForm from "../Post/PostForm";

function Home() {
  const [error, setError] = useState(null);
  const [postList, setPostList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const setPostRefresh = () => {
    setRefresh(true);
  };

  const refreshPosts = () => {
    fetch("/posts")
      .then((res) => res.json())
      .then(
        (result) => {
          setPostList(result);
        },
        (error) => {
          console.log(error);
          setError(error);
        }
      );
    setRefresh(false);
  };

  useEffect(() => {
    refreshPosts();
  }, [refresh]);

  if (error) {
    return <div> Error !!!</div>;
  } else {
    return (
      <div className="homeContainer">
        {localStorage.getItem("currentUser") == null ? (
          ""
        ) : (
          <PostForm
            userId={localStorage.getItem("currentUser")}
            userName={localStorage.getItem("userName")}
            setPostRefresh={setPostRefresh}
          />
        )}
        {postList.map((post) => (
          <Post
            likes={post.likes}
            postId={post.id}
            userId={post.userId}
            userName={post.userName}
            title={post.title}
            text={post.text}
          ></Post>
        ))}
      </div>
    );
  }
}

export default Home;
