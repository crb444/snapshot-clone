import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetImage, selectImage } from "./features/appData/cameraSlice";
import { selectLoggedUser } from "./features/appData/appSlice";
import "./Preview.css";
import CloseIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { db, storage } from "./firebase";
import firebase from "firebase";
import { HistoryOutlined } from "@material-ui/icons";

function Preview() {
  const image = useSelector(selectImage);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedUser);

  const goBack = () => {
    dispatch(resetImage());
    history.push("./chat");
  };

  useEffect(() => {
    if (!image) {
      history.push("./chat");
    }
  }, [image]);

  const sendPost = () => {
    const id = uuid();
    const uploadTask = storage.ref(`posts/${id}`).putString(image, "data_url");

    uploadTask.on(
      "stage_changed",
      null,
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("posts")
          .child(id)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              imageUrl: url,
              username: user.userName,
              read: false,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              profileUrl: user.profileUrl,
            });
          });
      }
    );

    history.push("./");
  };

  return (
    <div className="preview">
      <img src={image} />
      <CloseIcon className="preview__close" onClick={goBack} />
      <button className="preview__send" onClick={sendPost}>
        Send
      </button>
    </div>
  );
}

export default Preview;
