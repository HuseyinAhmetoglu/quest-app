import React, { useState, useEffect } from "react";
import Post from "../Post/Post";
import "./Home.css";
import PostForm from "../Post/PostForm";

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);

  const refreshPost = () => {
    fetch("/posts")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPostList(result);
        },
        (error) => {
          console.log(error);
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  useEffect(() => {
    refreshPost();
  }, [postList]);

  if (error) {
    return <div> Error!!!</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="homeContainer">
        <PostForm userId={1} userName={""} refreshPost={refreshPost}></PostForm>
        {postList.map((post) => (
          <Post
            postId={post.id}
            userId={post.userId}
            userName={post.userName}
            title={post.title}
            text={post.text}
            likes={post.likes}
          ></Post>
        ))}
      </div>
    );
  }
}

export default Home;
