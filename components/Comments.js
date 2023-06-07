import { Alert, Button, Divider, Snackbar, TextField } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import Convert from "@/utils/convertTime";

export default function Comments({ comments, id }) {
  const [data, setData] = useState({
    comment: "",
    name: "",
    email: "",
  });
  const [commentArea, setCommentArea] = useState(true);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    message: "",
    open: false,
    type: "info",
  });

  const createComment = async () => {
    data.id = id;
    setLoading(true);
    try {
      await fetch("/api/createComment", {
        method: "POST",
        body: JSON.stringify(data),
        type: "application/json",
      })
        .then((res) => {
          if (res.ok) {
            setCommentArea(false);
            setSnackbar({
              message: "Your comment has been successfully created.",
              open: true,
              type: "success",
            });
          }
        })
        .finally(() => setLoading(false));
    } catch (err) {
      setSnackbar({
        message: "An error occured.",
        open: true,
        type: "error",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createComment();
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <div className="px-5">
      {commentArea ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <TextField
              value={data.comment}
              onChange={(e) =>
                setData((prev) => ({ ...prev, comment: e.target.value }))
              }
              inputProps={{ maxLength: 500 }}
              required
              fullWidth
              id="outlined-multiline-static"
              multiline
              rows={4}
              placeholder="Your Comment *"
              variant="filled"
            />
            <span
              className={`${
                data.comment.length === 500
                  ? "text-red-600 font-semibold"
                  : " text-gray-500"
              } text-xs`}
            >
              {data.comment.length}/500
            </span>
          </div>
          <div className="flex space-x-5 items-center mt-4 justify-between">
            <TextField
              value={data.name}
              inputProps={{ maxLength: 50 }}
              onChange={(e) =>
                setData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-1/2"
              variant="filled"
              required
              id="outlined-required"
              placeholder="Your Name *"
            />
            <TextField
              value={data.email}
              inputProps={{ maxLength: 50 }}
              onChange={(e) =>
                setData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-1/2"
              variant="filled"
              id="outlined-required"
              placeholder="E-mail"
            />
          </div>
          <div>
            <Button disabled={loading} type="submit" variant="outlined">
              MAKE COMMENT
            </Button>
          </div>
        </form>
      ) : (
        <div className="border-2 border-green-400 rounded-xl flex items-center justify-center flex-col">
          <CheckCircleTwoToneIcon className="text-green-500 text-6xl" />
          <div className="flex items-center justify-center flex-col text-center">
            <h5 className="text-gray-500 text-lg">
              Thank you for your comment! Your message will be published after
              moderation.
            </h5>
            <h6 className="text-gray-600 text-xl font-semibold">Thank You!</h6>
          </div>
        </div>
      )}
      <Divider className="border-b-2 mt-4" variant="middle" />
      <div className="mt-6">
        <h5 className="text-xl font-semibold text-yellow-500">
          {comments?.length} Comment(s)
        </h5>
        {comments.length > 0 ? (
          comments?.map((item) => (
            <div
              key={item._id}
              className="mt-7 flex items-start border-b-2 pb-3"
            >
              <Image
                className="rounded-full"
                height={50}
                width={50}
                src="/../public/userImage.png"
                alt="default_user_logo"
              />
              <div className="ml-4">
                <div className="flex items-center space-x-3 text-sm">
                  <h5 className="text-sm font-semibold">{item.name}</h5>
                  <div className="flex items-center text-gray-500">
                    <AccessTimeIcon fontSize="small" />
                    <h5 className="ml-1">{Convert(item.createdAt)}</h5>
                  </div>
                </div>
                <p className="mt-2 text-sm">{item.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="mt-3 text-gray-500">
            There are no comments yet. Be the first one to comment.
          </div>
        )}
      </div>
      <div>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={5000}
          onClose={handleClose}
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
