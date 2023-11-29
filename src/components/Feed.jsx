/* eslint-disable react/prop-types */
import { useContext } from "react";
import { itemContext } from "../App";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Post from "./Post";

const Feed = () => {
  const { items } = useContext(itemContext);

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
  ];

  return (
    <Box sx={{ flex: 4, padding: 2 }}>
      {/* <DataGrid rows={rows} /> */}

      {items.map((item, index) => (
        <Post
          key={index}
          itemName={item.itemName}
          itemLink={item.itemLink}
          itemImage={item.itemImage}
          itemPrice={item.itemPrice}
          itemCategory={item.itemCategory}
          itemId={item.itemId}
          assignedTo={item.assignedTo}
          // setItems={setItems}
          item={item}
        />
      ))}
      {/* <Post items={items} /> */}
    </Box>
  );
};

export default Feed;
