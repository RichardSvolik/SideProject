/* eslint-disable react/prop-types */
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import { green } from "@mui/material/colors";

import AssignToModal from "./AssignToModal";

const Post = ({
  itemContext,
  itemName,
  itemImage,
  itemCategory,
  itemPrice,
  id,
  item,
}) => {
  return (
    <>
      {itemContext}
      <Card sx={{ marginTop: 5 }}>
        <CardMedia
          sx={{
            marginTop: 2,
            marginLeft: 2,
            maxHeight: "300px",
            maxWidth: "200px",
            alignItems: "center",
          }}
          component="img"
          height="100%"
          image={itemImage}
          alt={itemName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {itemName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {itemCategory}
          </Typography>
          <Typography variant="body2" style={{ color: green[600] }}>
            {itemPrice}
          </Typography>
        </CardContent>

        <CardActions>
          <AssignToModal id={id} item={item}></AssignToModal>
        </CardActions>
      </Card>
    </>
  );
};

export default Post;
