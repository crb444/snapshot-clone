import React, { useEffect, useState } from "react";
import "./Chats.css";
import { Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { db } from "./firebase";
import Post from "./Post";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoggedUser } from "./features/appData/appSlice";
import LogoutAlert from "./LogoutAlert";

function Chats() {
  const [posts, setPosts] = useState([]);
  const history = useHistory();
  const user = useSelector(selectLoggedUser);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  const newSnap = () => {
    history.push("./chat");
  };

  return (
    <div className="chats">
      <div className="chats__header">
        <LogoutAlert />
        <div className="chats__headerSearch">
          <SearchIcon />
          <input type="text" placeholder="Friends" />
        </div>
        <ChatBubbleIcon />
      </div>
      <div className="chats__feed">
        {posts?.map((post) => {
          return (
            <Post
              key={post.id}
              id={post.id}
              username={post.data.username}
              imageUrl={post.data.imageUrl}
              read={post.data.read}
              timestamp={post.data.timestamp}
              profileUrl={post.data.profileUrl}
            />
          );
        })}
      </div>
      <RadioButtonUncheckedIcon className="chats__newSnap" onClick={newSnap} />
    </div>
  );
}

export default Chats;
