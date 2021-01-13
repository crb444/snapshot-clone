import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import "./Camera.css";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { useDispatch } from "react-redux";
import { setImage } from "./features/appData/cameraSlice";
import { useHistory } from "react-router-dom";

const videoConstraints = {
  width: 550,
  height: 1000,
  facingMode: "user",
};

function Camera() {
  const webcamRef = useRef(null);
  const history = useHistory();

  const dispatch = useDispatch();

  const capture = React.useCallback(() => {
    dispatch(setImage(webcamRef.current.getScreenshot()));
    history.push("/preview");
  }, [webcamRef]);

  return (
    <div className="camera">
      <Webcam
        audio={false}
        screenshotFormat="image/jpeg"
        ref={webcamRef}
        videoConstraints={videoConstraints}
        height="1000px"
        width="550px"
      />

      <RadioButtonUncheckedIcon className="camera__button" onClick={capture} />
    </div>
  );
}

export default Camera;
