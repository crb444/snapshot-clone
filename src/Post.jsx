import { Avatar } from "@material-ui/core";
import React from "react";
import "./Post.css";
import StopIcon from "@material-ui/icons/Stop";
import TimeAgo from "react-timeago";
import { useDispatch } from "react-redux";
import { saveSelectedImage } from "./features/appData/appSlice";
import { useHistory } from "react-router-dom";
import { db } from "./firebase";

function Post({ username, imageUrl, read, timestamp, id, profileUrl }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const selectPost = () => {
    if (!read) {
      dispatch(saveSelectedImage(imageUrl));
      db.collection("posts").doc(id).set(
        {
          read: true,
        },
        { merge: true }
      );
      history.push("/view");
    }
  };

  return (
    <div className="post" onClick={selectPost}>
      <Avatar src={profileUrl} />
      <div className="post__details">
        <h4>{username}</h4>
        <p>
          Tap to view -{" "}
          <TimeAgo date={new Date(timestamp?.toDate()).toUTCString()} />
        </p>
      </div>
      {!read ? <StopIcon className="post__unreadIcon" /> : ""}
    </div>
  );
}

export default Post;
