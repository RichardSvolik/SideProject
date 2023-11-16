/* eslint-disable react/prop-types */
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Checkbox,
  Button,
  CardActionArea,
} from "@mui/material";
import { green } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import { Link } from "react-router-dom";

import BuyModal from "/src/components/buyModal";

const Post = ({
  item,
  itemName,
  itemLink,
  itemImage,
  itemCategory,
  itemPrice,
}) => {
  return (
    <>
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
          <BuyModal itemImage={itemImage} itemName={itemName}></BuyModal>
        </CardActions>
      </Card>
    </>
  );
};

export default Post;
