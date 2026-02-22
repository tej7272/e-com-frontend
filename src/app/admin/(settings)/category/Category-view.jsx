import {
  Box,
  Button,
  Grid,
  Typography,
  Stack,
  IconButton,
  Paper,
  Tooltip,
  MenuItem,
  MenuList,
} from "@mui/material";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { EllipsisVertical } from  'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import AddUpdateModel from "./Add-update-modal";
import usePopover from "../../../../components/custom-popover/usePopover";
import Label from "../../../../components/label/Label";
// import CustomIcon from "../../../../components/Icons/Icon";
import CustomPropover from "../../../../components/custom-popover/CustomPopover";
import SearchBox from "../../../../components/searchBox/SearchBox";
import IconifyIcon from "components/base/IconifyIcon";
// import IconifyIcon from "../../../../components/base/IconifyIcon";

const CategoryView = () => {

  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedData, setSelectedData] = useState(null);

  const popover = usePopover();

  const dispatch = useDispatch()
 
  const loading = useSelector((state) => state.master.loading);
  const master = useSelector((state) => state.master.data);

  // useEffect(() => {
  //     dispatch(fetchMaster());
  // },[dispatch])

  // if(loading && !master){
  //   return <Box>Loading...</Box>
  // }



  const columns = [
    
    { field: "name", headerName: "Name", width: 200},
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "isActive",
      headerName: "Active",
      width: 120,
      renderCell: (params) => (
        <Label>{params.value ? 'Yes' : 'No'}</Label>
      )
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => {
        return (
          <Tooltip title="Actions">
            <IconButton onClick={(e) => {setSelectedData(params.row); popover.onOpen(e)}}>
              {/* <CustomIcon icon={EllipsisVertical}/> */}+
            </IconButton>
          </Tooltip>
        )
      }
    },
  ];

  const rows = [
    {
      id: 1,
      name: 'Apparel',
      description: 'Clothing and fashion items',
      image: '/images/categories/apparel.jpg',
      isActive: true,
      sortOrder: 1
    },
    {
      id: 2,
      name: 'Footwear',
      description: 'Shoes and accessories',
      image: '/images/categories/footwear.jpg',
      isActive: true,
      sortOrder: 2
    },
    {
      id: 3,
      name: 'Accessories',
      description: 'Fashion accessories',
      image: '/images/categories/accessories.jpg',
      isActive: false,
      sortOrder: 3
    }
  ];



  const paginationModel = { page: 0, pageSize: 5 };

  const handleOpen = () => {
    setSelectedData(null);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

   const filteredList = rows.filter((v) => {
    const normalizedSearchValue = searchValue.replace(/\s+/g, '').toLowerCase();
    const normalizedName = v.name.replace(/\s+/g, '').toLowerCase();

    const searchMatch = normalizedSearchValue ? normalizedName.includes(normalizedSearchValue) : true;
    return searchMatch;
  })


  return (
    <Box sx={{}}>

      <CustomPropover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
      >
        <MenuList sx={{ }}>
          <MenuItem onClick={() => setOpen(true)}>
           <IconifyIcon icon="solar:pen-new-square-outline" sx={{ mr: 1, color: 'primary.main' }} />
            Edit
          </MenuItem>
          <MenuItem onClick={() => setOpen(true)}>
            <IconifyIcon icon="solar:trash-bin-trash-outline" sx={{ mr: 1, color: 'error.main' }} />
            Delete
          </MenuItem>
        </MenuList>
      </CustomPropover>

      <AddUpdateModel open ={open} onClose={handleClose} selectedData={selectedData}/>
      <Grid container spacing={1} alignItems="center" sx={{ px: 2, mt: 2 }}>
        <Grid size={6}>
          {/* <Typography variant="h5" fontWeight={700}>
            Products
          </Typography> */}
        </Grid>
        <Grid size={6}>
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button type="button" variant="contained" onClick={handleOpen}>
              Add Product
            </Button>
            <SearchBox searchValue={searchValue} onSearch={(val) => setSearchValue(val)} name="Product"/>
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
            disableRowSelectionOnClick
            checkboxSelection={false}
            sx={{ border: 0 }}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default CategoryView;
