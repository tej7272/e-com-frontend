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
import { Ellipsis } from  'lucide-react';
// import CustomIcon from "../../../components/Icons/Icon";
import SearchBox from "../../../components/searchBox/SearchBox";

const OrderTable = () => {

  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const columns = [
    { 
      field: "itemPics", 
      headerName: "Pics", 
      width: 100,
      renderCell: (params) => {
        const imgUrl = params.value
        return (
          <img
            src={imgUrl}
            alt="item"
            style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 4 }}
          />
        );
      }
    },
    { field: "item", headerName: "Item"},
    { field: "order", headerName: "Order"},
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "total",
      headerName: "Total",
      width: 80
    },
    {
      field: "status",
      headerName: "Status",
      width: 80
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        return (
          <Tooltip title="Actions">
            <IconButton onClick={() => {setSelectedData(params.row)}}>
              {/* <CustomIcon icon={Ellipsis}/> */}X
            </IconButton>
          </Tooltip>
        )
      }
    },
  ].map((col) => ({...col, flex: 1}));

  const rows = [
  {
    id: 1,
    itemPics: "https://dummyimage.com/100x100/000/fff&text=T1",
    item: "T-shirt",
    order: "ORD-1001",
    date: "2025-01-12 10:32 AM",
    total: 1299
  },
  {
    id: 2,
    itemPics: "https://dummyimage.com/100x100/3b82f6/ffffff&text=T2",
    item: "Puma black jeans",
    order: "ORD-1002",
    date: "2025-01-15 04:18 PM",
    total: 2499
  },
  {
    id: 3,
    itemPics: "https://dummyimage.com/100x100/f59e0b/ffffff&text=T3",
    item: "Jocky shirt",
    order: "ORD-1003",
    date: "2025-01-20 01:05 PM",
    total: 899
  },
  {
    id: 4,
    itemPics: "https://dummyimage.com/100x100/10b981/ffffff&text=T4",
    item: "Inerwear",
    order: "ORD-1004",
    date: "2025-01-25 09:44 AM",
    total: 1799
  },
  {
    id: 5,
    itemPics: "https://dummyimage.com/100x100/ef4444/ffffff&text=T5",
    item: "Leather jacket",
    order: "ORD-1005",
    date: "2025-02-01 11:12 AM",
    total: 3299
  }
];


  const paginationModel = { page: 0, pageSize: 5 };

  const handleClose = () => {
    setOpen(false);
  }

  const filteredList = rows.filter((v) => {
    const normalizedSearchValue = searchValue.replace(/\s+/g, '').toLowerCase();
    const normalizedName = v.item.replace(/\s+/g, '').toLowerCase();

    const searchMatch = normalizedSearchValue ? normalizedName.includes(normalizedSearchValue) : true;

    return searchMatch;
  })



  return (
    <Box sx={{}}>

      <AddProductModal open ={open} onClose={handleClose} selectedData={selectedData}/>
      <Grid container spacing={1} alignItems="center" sx={{ px: 2, mt: 2 }}>
        <Grid size={6}>
          <Typography variant="h5" fontWeight={700}>
            Orders
          </Typography>
        </Grid>
        <Grid size={6}>
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <SearchBox searchValue={searchValue} onSearch={(val) => setSearchValue(val)} name="Order"/>
          </Stack>
        </Grid>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <Paper sx={{ width: "100%"}}>
          <DataGrid
            rows={filteredList}
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

export default OrderTable;
