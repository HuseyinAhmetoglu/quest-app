import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Container from "@mui/material/Container";
import Comment from "../Comment/Comment";
import CommentIcon from "@mui/icons-material/Comment";
import CommentForm from "../Comment/CommentForm";
import IconButton from "@mui/material/IconButton";
import { DeleteWithAuth, PostWithAuth } from "../../services/HttpService";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Post(props) {
  const { userId, userName, title, text, postId, likes } = props;
  const [expanded, setExpanded] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [error, setError] = useState(null);
  const [isliked, setIsLiked] = useState(false);
  const isInitialMount = useRef(true);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [likeId, setLikedId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  let disabled = localStorage.getItem("currentUser") == null ? true : false;

  const setCommentRefresh = () => {
    setRefresh(true);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
  };

  const handleLike = () => {
    setIsLiked(!isliked);
    if (!isliked) {
      saveLike();
      setLikeCount(likeCount + 1);
    } else {
      deleteLike();
      setLikeCount(likeCount - 1);
    }
  };

  const refreshComments = () => {
    fetch("/comments?postId=" + postId)
      .then((res) => res.json())
      .then(
        (result) => {
          setCommentList(result);
        },
        (error) => {
          console.log(error);
          setError(error);
        }
      );
    setRefresh(false);
  };

  const saveLike = () => {
    PostWithAuth("/likes", {
      postId: postId,
      userId: localStorage.getItem("currentUser"),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const deleteLike = () => {
    DeleteWithAuth("/likes/" + likeId).catch((err) => console.log(err));
  };

  const checkLikes = () => {
    var likeControl = likes.find(
      (like) => "" + like.userId === localStorage.getItem("currentUser")
    );
    if (likeControl != null) {
      setLikedId(likeControl.id);
      setIsLiked(true);
    }
  };

  useEffect(() => {
    if (isInitialMount.current) isInitialMount.current = false;
    else refreshComments();
  }, [refresh]);

  useEffect(() => {
    checkLikes();
  }, []);

  return (
    <Card sx={{ width: 800, m: 2, textAlign: "left" }}>
      <CardHeader
        avatar={
          <Link className="link" to={{ pathname: "/users/" + userId }}>
            <Avatar
              sx={{ backgroundColor: "#2196f3", color: "#fff" }}
              aria-label="recipe"
            >
              {userName.charAt(0).toUpperCase()}
            </Avatar>
          </Link>
        }
        title={title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          disabled={disabled}
          aria-label="add to favorites"
          onClick={handleLike}
        >
          <FavoriteIcon style={isliked ? { color: "red" } : null} />
        </IconButton>
        {likeCount}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CommentIcon></CommentIcon>
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Container fixed>
          {error
            ? "error"
            : commentList.map((comment) => (
                <Comment
                  userId={comment.userId}
                  userName={comment.userName}
                  text={comment.text}
                ></Comment>
              ))}

          {disabled == null ? (
            ""
          ) : (
            <CommentForm
              userId={localStorage.getItem("currentUser")}
              userName={localStorage.getItem("userName")}
              postId={postId}
              setCommentRefresh={setCommentRefresh}
            ></CommentForm>
          )}
        </Container>
      </Collapse>
    </Card>
  );
}
