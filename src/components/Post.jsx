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
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import { Link } from "react-router-dom";

const Post = ({ itemName, itemLink, itemImage, itemCategory, itemPrice }) => {
  return (
    <div>
      <Card sx={{ marginTop: 5 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={itemName}
          subheader={
            <Typography
              noWrap
              style={{
                maxWidth: "550px",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <Link href={itemLink} target="_blank" underline="none">
                {/* ^^^ Link is used only for internal links in SPA, not for external ones  */}
                {itemLink}
              </Link>
            </Typography>
          }
        />
        <CardMedia
          sx={{
            display: "flex",
            maxWidth: "20%",
            alignItems: "center",
            justifyContent: "center",
          }}
          component="img"
          image={itemImage}
          alt="Paella dish"
          // ^^ really? :)
        />
        <CardContent>
          {itemImage}
          <Typography variant="body2" color="text.secondary">
            {itemCategory}
            {itemPrice}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
            />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default Post;
