import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSavedImage } from "./features/appData/appSlice";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./View.css";
import { useHistory } from "react-router-dom";
import { resetSelectedImage } from "./features/appData/appSlice";

function View() {
  const imageUrl = useSelector(selectSavedImage);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!imageUrl) {
      history.push("./");
    }
  }, []);

  const snapOver = () => {
    console.log("timer is done");
    dispatch(resetSelectedImage());
    history.push("./");
  };

  return (
    <div className="view">
      <img src={imageUrl} />
      <div className="view__timer">
        <CountdownCircleTimer
          isPlaying
          duration={10}
          colors={[
            ["#004777", 0.33],
            ["#F7B801", 0.33],
            ["#A30000", 0.33],
          ]}
          size={70}
          strokeWidth={6}
          onComplete={snapOver}
        >
          {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
      </div>
    </div>
  );
}

export default View;
