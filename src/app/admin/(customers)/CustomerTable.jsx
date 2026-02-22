import {
  Box,
  Grid,
  Typography,
  Stack,
  IconButton,
  Paper,
  Tooltip,
  Avatar,
} from "@mui/material";
import React, {useState} from "react";
import { DataGrid } from "@mui/x-data-grid";
import AddProductModal from "./AddProductModal";
import { EllipsisVertical } from  'lucide-react';
// import CustomIcon from "../../../components/Icons/Icon";
import SearchBox from "../../../components/searchBox/SearchBox";
import useDebounce from "../../../hook/useDbounce";

const CustomerTable = () => {

  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedData, setSelectedData] = useState(null);
  const debounceVlaue = useDebounce(searchValue);
  const columns = [
    { 
      field: "userPic", 
      headerName: "Pics", 
      width: 100,
      renderCell: (params) => {
        return (
          <Avatar 
            src={params.value} 
            alt={params.row.name} 
            variant="square"
            sx={{ width: 40, height: 40 }}
          />
        );
      },
      flex: 1
    },
    { field: "name", headerName: "Name", flex: 2},
    { field: "email", headerName: "Email", flex: 2},
    
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
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
      userPic: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "Arjun Mehta",
      email: "arjun.mehta@example.com"
    },
    {
      id: 2,
      userPic: "https://randomuser.me/api/portraits/women/45.jpg",
      name: "Priya Sharma",
      email: "priya.sharma@example.com"
    },
    {
      id: 3,
      userPic: "https://randomuser.me/api/portraits/men/15.jpg",
      name: "Rohit Verma",
      email: "rohit.verma@example.com"
    },
    {
      id: 4,
      userPic: "https://randomuser.me/api/portraits/women/21.jpg",
      name: "Sneha Kapoor",
      email: "sneha.kapoor@example.com"
    },
    {
      id: 5,
      userPic: "https://randomuser.me/api/portraits/men/7.jpg",
      name: "Vikram Singh",
      email: "vikram.singh@example.com"
    }
  ];
  const paginationModel = { page: 0, pageSize: 5 };

  const handleClose = () => {
    setOpen(false);
  }


  const filteredList = rows.filter((v) => {
    const normalizedSearchValue = debounceVlaue.replace(/\s+/g, '').toLowerCase();
    const normalizedName = v.name.replace(/\s+/g, '').toLowerCase();

    const searchMatch = normalizedSearchValue ? normalizedName.includes(normalizedSearchValue) : true;

    return searchMatch;
  })



  return (
    <Box sx={{}}>

      <AddProductModal open ={open} onClose={handleClose} selectedData={selectedData}/>
      <Grid container spacing={1} alignItems="center" sx={{ px: 2, mt: 2 }}>
        <Grid size={6}>
          <Typography variant="h5" fontWeight={700}>
            Customers
          </Typography>
        </Grid>
        <Grid size={6}>
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <SearchBox searchValue={searchValue} onSearch={(val) => setSearchValue(val)} name= "Customer"/>
          </Stack>
        </Grid>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <Paper sx={{ width: "100%"}}>
          <DataGrid
            autoHeight
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

export default CustomerTable;
