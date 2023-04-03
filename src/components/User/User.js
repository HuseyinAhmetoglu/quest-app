import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import UserActivity from "../UserActivity/UserActivity";
import { GetWithAuth } from "../../services/HttpService";

import "./User.css";

export default function User() {
  const { userId } = useParams();
  const [user, setUser] = useState();

  const getUser = () => {
    GetWithAuth("/users/" + userId)
      .then((res) => res.json())
      .then(
        (result) => {
          setUser(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="userRoot">
      {user ? (
        <Avatar
          avatarId={user.avatar}
          userId={userId}
          userName={user.userName}
        />
      ) : (
        ""
      )}
      {localStorage.getItem("currentUser") == userId ? (
        <UserActivity userId={userId} />
      ) : (
        ""
      )}
    </div>
  );
}
