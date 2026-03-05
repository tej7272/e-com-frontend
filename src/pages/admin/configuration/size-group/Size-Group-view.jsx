import {
  Box,
  Button,
  Stack,
  IconButton,
  Paper,
  Tooltip,
  MenuItem,
  MenuList,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from 'react-redux';
import AddUpdateModel from "./Add-update-modal";
import Iconify from "components/base/Iconify";
import ConfirmDialog from "components/confirm-dialog/ConfirmDialog";
import usePopover from "components/custom-popover/usePopover";
import { getCategories } from "store/slices/admin/configuration/categorySlice";
import { deleteCategory } from "store/slices/admin/configuration/categorySlice";
import Label from "components/label/Label";
import CustomPropover from "components/custom-popover/CustomPopover";
import SearchBox from "components/searchBox/SearchBox";

const SizeGroupView = () => {
  const [open, setOpen]               = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const popover  = usePopover();
  const dispatch = useDispatch();

  const loading  = useSelector((state) => state.configuration.category.loading);
  const category = useSelector((state) => state.configuration.category.data);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleOpen = () => {
    setSelectedData(null);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    try{
      const res = await dispatch(deleteCategory(selectedData._id)).unwrap();
      if (res.status) {
        setOpenConfirm(false);
      }
    }catch(err){

    }
  };

  const filteredList = (category ?? []).filter((v) => {
    const normalizedSearch = searchValue.replace(/\s+/g, '').toLowerCase();
    const normalizedName   = v.name.replace(/\s+/g, '').toLowerCase();
    return normalizedSearch ? normalizedName.includes(normalizedSearch) : true;
  });

  const columns = [
    { field: "name",        headerName: "Name",        width: 200 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "sizes", headerName: "Sizes", flex: 1 },
    {
      field: "isActive",
      headerName: "Active",
      width: 120,
      renderCell: (params) => (
        <Label>{params.value ? 'Yes' : 'No'}</Label>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <Tooltip title="Actions">
          <IconButton onClick={(e) => { setSelectedData(params.row); popover.onOpen(e); }}>
            <Iconify icon="formkit:reorder" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <Box>
      <ConfirmDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        title="Confirm Delete"
        content="Are you sure you want to delete? This action cannot be undone!"
        action={
          <Button variant="contained" color="success" size="large" onClick={handleDelete}>
            <Iconify icon="solar:plain-linear" sx={{ mr: 1 }} />
            Confirm
          </Button>
        }
      />

      <CustomPropover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
      >
        <MenuList>
          <MenuItem onClick={() => popover.onCloseWithCallback(() => setOpen(true))}>
            <Iconify icon="solar:pen-new-square-outline" sx={{ mr: 1, color: 'primary.main' }} />
            Edit
          </MenuItem>
          <MenuItem onClick={() => popover.onCloseWithCallback(() => setOpenConfirm(true))}>
            <Iconify icon="solar:trash-bin-trash-outline" sx={{ mr: 1, color: 'error.main' }} />
            Delete
          </MenuItem>
        </MenuList>
      </CustomPropover>

      <AddUpdateModel open={open} onClose={handleClose} selectedData={selectedData} />

      <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ mb: 2, pr: 3 }}>
        <Button type="button" variant="contained" onClick={handleOpen}>
          Add Size Group
        </Button>
        <SearchBox searchValue={searchValue} onSearch={(val) => setSearchValue(val)} name="Serach size-group" />
      </Stack>

      <Box sx={{ mt: 3 }}>
        <Paper sx={{ width: "100%", minHeight: 400 }}>
          <DataGrid
            rows={filteredList}
            getRowId={(row) => row._id}
            columns={columns}
            loading={loading}
            initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
            pageSizeOptions={[10, 20, 50, 100]}
            disableRowSelectionOnClick
            sx={{ border: 0 }}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default SizeGroupView;
