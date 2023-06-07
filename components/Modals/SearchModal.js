import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { TextField, Tooltip } from "@mui/material";
import { useRouter } from "next/router";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [helperText, setHelperText] = React.useState(
    "Press 'Enter' to perform the search."
  );
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      if (input.trim() === "") {
        setHelperText("Please type something to search");
        setTimeout(() => {
          setHelperText("Press 'Enter' to perform the search.");
        }, 2500);
      } else {
        await router.push(`/search?q=${input}`);
        handleClose();
        setInput("");
      }
    }
  };

  return (
    <div>
      <Tooltip title="Search" placement="top">
        <SearchOutlinedIcon
          onClick={handleOpen}
          className="mx-5 hover:text-yellow-500 transition-all duration-200 cursor-pointer"
          fontSize="large"
        />
      </Tooltip>
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
        <Fade
          className="w-11/12 max-w-lg border rounded-lg bg-slate-200"
          in={open}
        >
          <Box sx={style}>
            <div className="flex items-center justify-between ">
              <TextField
                onKeyDown={handleKeyPress}
                helperText={helperText}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                id="standard-basic"
                label="Search for a city, place, or food."
                variant="standard"
                fullWidth
              />
              <SearchOutlinedIcon
                className="hover:text-yellow-500 transition-all duration-200 cursor-pointer"
                fontSize="large"
              />
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
