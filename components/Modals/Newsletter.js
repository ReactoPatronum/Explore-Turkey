import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, Snackbar } from "@mui/material";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({
    message: "",
    open: false,
    type: "info",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValidEmail = emailRegex.test(email);

    if (isValidEmail) {
      setLoading(true);
      try {
        await fetch("/api/addSubscription", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        })
          .then((res) => res.json())
          .then((res) => {
            setEmail("");
            if (res.ok) {
              setSnackbar({
                message:
                  "Your email address has been successfully saved. Thank You!",
                open: true,
                type: "success",
              });
            } else {
              const {
                error: {
                  response: { text },
                },
              } = res;
              const infoText = JSON.parse(text);
              const errorType =
                infoText.title === "Member Exists"
                  ? "This email address has already been registered."
                  : infoText?.detail;
              setSnackbar({
                message: errorType,
                open: true,
                type: "error",
              });
            }
          })
          .finally(() => {
            setOpen(false);
            setLoading(false);
          });
      } catch (error) {
        setSnackbar({
          message: "An error occurred.",
          open: true,
          type: "error",
        });
      }
    } else {
      setSnackbar({
        message:
          "Please do not leave the field blank or enter a valid email address.",
        open: true,
        type: "info",
      });
    }
    setOpen(false);
  };

  return (
    <div>
      <Button
        className="bg-blue-500"
        fullWidth
        variant="contained"
        onClick={() => setOpen(true)}
      >
        Join Newsletter
      </Button>
      <form>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To stay informed about new articles, please enter your email
              address here.
            </DialogContentText>
            <TextField
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <div className="flex items-center justify-between">
            <DialogActions className="ml-3">
              <span></span>
            </DialogActions>
            <DialogActions>
              <Button type="button" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button disabled={loading} onClick={handleSubmit}>
                Subscribe
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      </form>
      <div>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleClose}
            severity={snackbar.type}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
