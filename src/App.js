import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Camera from "./Camera";
import Preview from "./Preview";
import Chats from "./Chats";
import View from "./View";
import Login from "./Login";
import {
  resetUser,
  selectLoggedUser,
  saveUser,
} from "./features/appData/appSlice";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "./firebase";

function App() {
  const user = useSelector(selectLoggedUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          saveUser({
            userName: authUser.displayName,
            profileUrl: authUser.photoURL,
          })
        );
      } else {
        dispatch(resetUser());
      }
    });
  });

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <Switch>
            <Route path="/chat" exact>
              <Camera />
            </Route>
            <Route path="/preview" exact>
              <Preview />
            </Route>
            <Route path="/" exact>
              <Chats />
            </Route>
            <Route path="/view" exact>
              <View />
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
