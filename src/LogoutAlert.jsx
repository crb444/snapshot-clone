import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { resetUser, selectLoggedUser } from "./features/appData/appSlice";
import { Avatar } from "@material-ui/core";
import "./LogoutAlert.css";
import { auth } from "./firebase";

export default function LogoutAlert() {
  const [open, setOpen] = React.useState(false);
  const user = useSelector(selectLoggedUser);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logout = () => {
    auth.signOut();
    setOpen(false);
  };

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        <Avatar className="chats__headerAvatar" src={user.profileUrl} />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {" Do you wish to log out?"}
        </DialogTitle>

        <DialogActions>
          <Button
            className="logoutalert__disagree"
            onClick={handleClose}
            color="primary"
          >
            Disagree
          </Button>
          <Button
            className="logoutalert__agree"
            onClick={logout}
            color="primary"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
