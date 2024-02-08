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
import { itemContext } from "../context/itemContext";

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
    const newItems = items.map((item) => {
      if (item.id === id) {
        item.assignedTo = { email: userEmail, name: userName };
      }
    });
    setOpen(false);
    localStorage.setItem("items", JSON.stringify(newItems));
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
      <StyledModal open={open} onClose={toggleModal}>
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
            id="userNameId"
            placeholder="Name"
            variant="standard"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />

          <TextField
            sx={{ width: "100%", paddingBottom: 2 }}
            id="useEmailId"
            placeholder="Name"
            variant="standard"
            value={userEmail}
            onChange={(event) => setUserEmail(event.target.value)}
          />

          <Button
            variant="contained"
            aria-label="confirm name and email button"
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
