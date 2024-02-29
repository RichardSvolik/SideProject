import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Link,
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
          <Typography noWrap>
            <Link
              color="orange"
              underline="none"
              target="_blank"
              href={item.itemLink}
            >
              Where to buy
            </Link>
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
