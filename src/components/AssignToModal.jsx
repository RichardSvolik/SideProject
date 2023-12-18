import { useState, useContext } from "react";
import {
  Avatar,
  Box,
  Button,
  Modal,
  TextField,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { itemContext } from "../App";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});

const AssignToModal = ({ id, item }) => {
  const { items } = useContext(itemContext);

  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen((prev) => !prev);
  };

  const [userEmail, setUserEmail] = useState();
  const [userName, setUserName] = useState();

  const onConfirm = () => {
    items.forEach((item) => {
      if (item.id === id) {
        item.assignedTo = { email: userEmail, name: userName };
      }
      setOpen(false);
    });
    localStorage.setItem("items", JSON.stringify(items));
  };
  return (
    <>
      <Tooltip onClick={toggleModal}>
        {item.assignedTo?.name ? (
          <Typography variant="body2" color="text.secondary">
            Assigned to {item.assignedTo.name}
          </Typography>
        ) : (
          <Button color="primary" aria-label="add">
            Assign To
          </Button>
        )}
      </Tooltip>
      <StyledModal
        open={open}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box width={400} height={250} bgcolor="white" p={3} borderRadius={5}>
          <Typography variant="h6" color="gray" textAlign="center">
            Assign to user
          </Typography>
          <UserBox>
            <Avatar
              sx={{ maxWidth: "fit-content" }}
              variant="rounded"
              alt={item.itemName}
              src={item.itemImage}
            />
            <Typography fontWeight={500}>{item.itemName}</Typography>
          </UserBox>
          <TextField
            sx={{ width: "100%", paddingBottom: 2 }}
            id="standard-multiline-static"
            rows={1}
            placeholder="Name"
            variant="standard"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />

          <TextField
            sx={{ width: "100%", paddingBottom: 2 }}
            id="standard-multiline-static"
            multiline
            rows={1}
            placeholder="E-mail"
            variant="standard"
            value={userEmail}
            onChange={(event) => setUserEmail(event.target.value)}
          />

          <Button
            variant="contained"
            aria-label="outlined primary button group"
            onClick={() => onConfirm()}
          >
            Confirm
          </Button>
        </Box>
      </StyledModal>
    </>
  );
};

export default AssignToModal;
