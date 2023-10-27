import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Divider, Typography, Box, Link } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function ListOfItems({ items, setItems }) {
  const handleDeleteItem = (itemName) => {
    JSON.parse(localStorage.getItem("items"));
    console.log("itemsInLocalStorage: ", items);

    const newItems = items.filter((item) => item.itemName !== itemName);
    console.log("newItems: ", newItems);
    localStorage.clear();
    localStorage.setItem("items", JSON.stringify(newItems));
    setItems(JSON.parse(localStorage.getItem("items")));
    setItems(newItems);
  };

  return (
    <Box sx={{ flex: 4, padding: 2 }}>
      {items.map((item, index) => (
        <List
          key={index}
          sx={{ maxWidth: "100%", bgcolor: "background.paper" }}
        >
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                sx={{ maxWidth: "fit-content" }}
                variant="rounded"
                alt={item.itemName}
                src={item.itemImage}
              />
            </ListItemAvatar>
            <ListItemText
              primary={item.itemName}
              secondary={
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  <Link href={item.itemLink} target="_blank" underline="none">
                    {item.itemLink}
                  </Link>
                </Typography>
              }
            />
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => handleDeleteItem(item.itemName)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      ))}
    </Box>
  );
}

export default ListOfItems;
