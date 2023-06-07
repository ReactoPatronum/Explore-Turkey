/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ZoomImage({ open, setOpen, image }) {
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade className="w-3/4 p-0 border-none" in={open}>
          <Box sx={style}>
            <img
              className="object-cover"
              loading="lazy"
              src={image}
              alt="image"
            />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
