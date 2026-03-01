import {
  Box,
  Grid,
  Typography,
  Stack,
  IconButton,
  Paper,
  Tooltip,
} from "@mui/material";
import React, {useState} from "react";
import { DataGrid } from "@mui/x-data-grid";
import AddProductModal from "./AddProductModal";
// import CustomIcon from "../../../components/Icons/Icon";
import SearchBox from "../../../components/searchBox/SearchBox";

const ReviewTable = () => {

  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const columns = [
    { 
      field: "itemPics", 
      headerName: "Pics", 
      width: 100,
      renderCell: (params) => {
        const imgUrl = params.value
        return (
          <Box sx={{display: 'flex', alignItems: 'center', height: '100%'}}>
            <img
              src={imgUrl}
              alt="item"
              style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 4 }}
            />
          </Box>
        );
      }
    },
    { field: "name", headerName: "Name", flex: 1},
    { field: "item", headerName: "Item", flex: 1},
    { field: "review", headerName: "Review", flex: 2 },
    { field: "rating", headerName: "Rating" },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => {
        return (
          <Tooltip title="Actions">
            <IconButton onClick={() => {setSelectedData(params.row)}}>
              {/* <CustomIcon icon={EllipsisVertical}/> */}X
            </IconButton>
          </Tooltip>
        )
      }
    },
  ];

  const rows = [
  {
    id: 1,
    itemPics: "https://picsum.photos/id/1011/100/100",
    name: "Classic Cotton T-Shirt",
    review: "Very comfortable fabric and perfect fit.",
    rating: 4.5,
  },
  {
    id: 2,
    itemPics: "https://picsum.photos/id/1025/100/100",
    name: "Slim Fit Denim Jeans",
    review: "Good quality denim but slightly tight.",
    rating: 4.2,
  },
  {
    id: 3,
    itemPics: "https://picsum.photos/id/103/100/100",
    name: "Running Shoes Pro",
    review: "Excellent cushioning and lightweight.",
    rating: 4.8,
  },
  {
    id: 4,
    itemPics: "https://picsum.photos/id/1040/100/100",
    name: "Leather Wallet",
    review: "Premium look and durable stitching.",
    rating: 4.0,
  },
  {
    id: 5,
    itemPics: "https://picsum.photos/id/1050/100/100",
    name: "Winter Hoodie",
    review: "Warm and stylish, great for winters.",
    rating: 4.6,
  },
  {
    id: 6,
    itemPics: "https://picsum.photos/id/1062/100/100",
    name: "Sports Watch",
    review: "Accurate tracking and long battery life.",
    rating: 4.3,
  },
];

  const paginationModel = { page: 0, pageSize: 5 };

  
  const handleClose = () => {
    setOpen(false);
  }



  return (
    <Box sx={{}}>

      <AddProductModal open ={open} onClose={handleClose} selectedData={selectedData}/>
      {/* <Grid container spacing={1} alignItems="center" sx={{ px: 2, mt: 2 }}>
        <Grid size={12}> */}
          <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{p: 3}}>
            <SearchBox searchValue={searchValue} onSearch={(val) => setSearchValue(val)} name="Search reviews"/>
          </Stack>
        {/* </Grid>
      </Grid> */}
      <Box >
        <Paper sx={{ width: "100%"}}>
          <DataGrid
            rows={rows}
            getRowId={(row) => row.id}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection={false}
            sx={{ border: 0 }}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default ReviewTable;
