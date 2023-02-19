import { CardContent, InputAdornment, OutlinedInput } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

export default function Comment(props) {
  const { text, userId, userName } = props;
  return (
    <CardContent>
      <OutlinedInput
        disabled
        id="outlined-adorment-amount"
        multiline
        inputProps={{ maxLength: 250 }}
        fullWidth
        value={text}
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
      ></OutlinedInput>
    </CardContent>
  );
}
