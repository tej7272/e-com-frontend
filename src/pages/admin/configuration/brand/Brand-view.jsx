import {
  Box,
  Paper,
  Button,
  Tooltip,
  MenuItem,
  MenuList,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from 'react-redux';
import AddUpdateModal from "./Add-update-modal";
import Iconify from "components/base/Iconify";
import ConfirmDialog from "components/confirm-dialog/ConfirmDialog";
import usePopover from "components/custom-popover/usePopover";
import Label from "components/label/Label";
import CustomPropover from "components/custom-popover/CustomPopover";
import { deleteBrand, getBrands } from "store/slices/admin/configuration/brandSlice";


const BrandView = () => {
  const [open, setOpen]               = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const popover  = usePopover();
  const dispatch = useDispatch();

  const loading  = useSelector((state) => state.configuration.brand.loading);
  const brand = useSelector((state) => state.configuration.brand.data);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    try{
      const res = await dispatch(deleteBrand(selectedData._id)).unwrap();
      if (res.status) {
        setOpenConfirm(false);
      }
    }catch(err){

    }
  };

  const filteredList = (brand ?? []).filter((v) => {
    const normalizedSearch = searchValue.replace(/\s+/g, '').toLowerCase();
    const normalizedName   = v.name.replace(/\s+/g, '').toLowerCase();
    return normalizedSearch ? normalizedName.includes(normalizedSearch) : true;
  });

  const columns = [
   { 
      field:     "name", 
      headerName: "Name", 
      flex: 1, 
      minWidth: 120,
    },
    { 
      field: "description", 
      headerName: "Description", 
      flex: 3, 
      minWidth: 150,
    },
    {
      field: "isActive",
      headerName: "Active",
      width: 100,
      minWidth: 80,
      renderCell: (params) => (
        <Label>{params.value ? 'Yes' : 'No'}</Label>
      ),
    },
    {
      field:      "actions",
      headerName: "Actions",
      width:      80,
      minWidth:   60,
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

      <AddUpdateModal open={open} onClose={handleClose} selectedData={selectedData} />

      <Box sx={{ mt: 3 }}>
        <Paper sx={{ width: "100%", minHeight: 400 }}>
          <DataGrid
            showToolbar
            rows={filteredList}
            getRowId={(row) => row._id}
            columns={columns}
            loading={loading}
            initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
            pageSizeOptions={[10, 20, 50, 100]}
            disableRowSelectionOnClick
            sx={{ border: 0 }}
            slotProps={{
              toolbar: {
                  searchValue,
                  onSearch:       (val) => setSearchValue(val),
                  exportData:     filteredList,
                  exportFileName: "brands",
                  title:  "Add brand",
                  handleOpen : () => {setOpen(true); setSelectedData(null)},
              }
            }}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default BrandView;
