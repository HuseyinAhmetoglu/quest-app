import {
  Button,
  CardContent,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

export default function CommentForm(props) {
  const { postId, userId, userName } = props;
  const [text, setText] = useState("");

  const saveComment = () => {
    console.log(postId);
    console.log(userId);
    console.log(text);

    fetch("/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: postId,
        userId: userId,
        text: text,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const handleChange = (value) => {
    setText(value);
  };

  const handleSubmit = () => {
    saveComment();
    setText("");
  };

  return (
    <CardContent>
      <OutlinedInput
        id="outlined-adorment-amount"
        multiline
        inputProps={{ maxLength: 250 }}
        fullWidth
        onChange={(i) => handleChange(i.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <Link className="link" to={{ pathname: "/users/" + userId }}>
              <Avatar
                sx={{
                  backgroundColor: "#2196f3",
                  color: "#fff",
                  width: 30,
                  height: 30,
                }}
                aria-label="recipe"
              >
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <Button
              variant="conrained"
              style={{ backgroundColor: "#2196f3", color: "#fff" }}
              onClick={handleSubmit}
            >
              Comment
            </Button>
          </InputAdornment>
        }
        value={text}
      ></OutlinedInput>
    </CardContent>
  );
}
