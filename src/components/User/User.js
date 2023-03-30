import React from "react";
import { useParams } from "react-router-dom";
import Avatar from "../Avatar/Avatar";

export default function User() {
  const { userId } = useParams();
  return (
    <div>
      User!! {userId}
      <Avatar avatarId = {0}/>
    </div>
  );
}
