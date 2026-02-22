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
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import NewAddProduct from "./NewAddProduct";
import { EllipsisVertical } from  'lucide-react';
// import CustomIcon from "../../../components/Icons/Icon";
import SearchBox from "../../../components/searchBox/SearchBox";
import usePopover from "../../../components/custom-popover/usePopover";
import CustomPropover from "../../../components/custom-popover/CustomPopover";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMaster } from '../../../redux/admin/settings/masterSlice';
import Label from "../../../components/label/Label";
import AddProductModal from "./AddProductModal";

const ProductTable = () => {

  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedData, setSelectedData] = useState(null);

  const popover = usePopover();

  const dispatch = useDispatch()
 
  const loading = useSelector((state) => state.master.loading);
  const master = useSelector((state) => state.master.data);

  useEffect(() => {
      dispatch(fetchMaster());
  },[dispatch])

  if(loading && !master){
    return <Box>Loading...</Box>
  }



  const columns = [
    { 
      field: "itemPics", 
      headerName: "Pics", 
      width: 100,
      renderCell: (params) => {
        const imgUrl = params.value[0]
        return (
          <img
            src={imgUrl}
            alt="item"
            style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 4 }}
          />
        );
      }
    },
    { field: "title", headerName: "Title", width: 170},
    {
      field: "brand",
      headerName: "Brand",
      flex: 1,
    },
    { field: "category", headerName: "Category", flex: 1 },
    {
      field: "price",
      headerName: "Price",
      width: 120
    },
    {
      field: "inStock",
      headerName: "In Stock",
      width: 120,
      renderCell: (params) => (
        <Label>{params.value ? 'Yes' : 'No'}</Label>
      )
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => {
        return (
          <Tooltip title="Actions">
            <IconButton onClick={(e) => {setSelectedData(params.row); popover.onOpen(e)}}>
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
    title: "Running Shoes Pro",
    price: 3299,
    categoryId: "clothing",
    category: "Footwear",
    sku: "SHOE-900",
    brandId: "RUNMAX",
    brand: "RunMax",
    inStock: true,
    quantity: 18,
    itemPics: [
      "https://example.com/images/shoes-red.png"
    ],
    colorId: ["RED", "BLACK"],
    color: ["Red", "Black"],
    sizeId: ["7","8","9","10"],
    size: ["7","8","9","10"],
    description: "Lightweight running shoes with superior cushioning."
  },

  {
    id: 2,
    title: "Classic Cotton T-Shirt",
    price: 799,
    categoryId: "APPAREL",
    category: "Apparel",
    sku: "TSHIRT-210",
    brandId: "STYLECO",
    brand: "StyleCo",
    inStock: true,
    quantity: 50,
    itemPics: [
      "https://example.com/images/tshirt.png"
    ],
    colorId: ["WHITE","BLUE"],
    color: ["White","Blue"],
    sizeId: ["S","M","L","XL"],
    size: ["S","M","L","XL"],
    description: "Comfortable cotton t-shirt for daily wear."
  },

  {
    id: 3,
    title: "Slim Fit Jeans",
    price: 1899,
    categoryId: "APPAREL",
    category: "Apparel",
    sku: "JEAN-778",
    brandId: "DENIMX",
    brand: "DenimX",
    inStock: true,
    quantity: 22,
    itemPics: [
      "https://example.com/images/jeans.png"
    ],
    colorId: ["BLUE"],
    color: ["Blue"],
    sizeId: ["30","32","34","36"],
    size: ["30","32","34","36"],
    description: "Stretchable slim fit denim jeans."
  },

  {
    id: 4,
    title: "Leather Wallet",
    price: 1299,
    categoryId: "ACCESSORIES",
    category: "Accessories",
    sku: "WAL-501",
    brandId: "URBANCRAFT",
    brand: "UrbanCraft",
    inStock: false,
    quantity: 0,
    itemPics: [
      "https://example.com/images/wallet.png"
    ],
    colorId: ["BROWN"],
    color: ["Brown"],
    sizeId: [],
    size: [],
    description: "Premium leather wallet with multiple compartments."
  },

  {
    id: 5,
    title: "Sports Cap",
    price: 499,
    categoryId: "ACCESSORIES",
    category: "Accessories",
    sku: "CAP-310",
    brandId: "RUNMAX",
    brand: "RunMax",
    inStock: true,
    quantity: 35,
    itemPics: [
      "https://example.com/images/cap.png"
    ],
    colorId: ["BLACK","GREY"],
    color: ["Black","Grey"],
    sizeId: [],
    size: [],
    description: "Breathable cap suitable for workouts and travel."
  },

  {
    id: 6,
    title: "Casual Sneakers",
    price: 2499,
    categoryId: "FOOTWEAR",
    category: "Footwear",
    sku: "SNKR-611",
    brandId: "RUNMAX",
    brand: "RunMax",
    inStock: true,
    quantity: 12,
    itemPics: [
      "https://example.com/images/sneakers.png"
    ],
    colorId: ["WHITE","GREEN"],
    color: ["White","Green"],
    sizeId: ["8","9","10"],
    size: ["8","9","10"],
    description: "Stylish everyday sneakers with soft sole."
  }
]



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
    const normalizedName = v.title.replace(/\s+/g, '').toLowerCase();

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
            Edit
          </MenuItem>
          <MenuItem onClick={() => setOpen(true)}>
            Delete
          </MenuItem>
        </MenuList>
      </CustomPropover>

      <NewAddProduct open ={open} onClose={handleClose} selectedData={selectedData}/>
      <AddProductModal open ={open} onClose={handleClose} selectedData={selectedData}/>
      <Grid container spacing={1} alignItems="center" sx={{ px: 2, mt: 2 }}>
        <Grid size={6}>
          <Typography variant="h5" fontWeight={700}>
            Products
          </Typography>
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
            autoHeight
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

export default ProductTable;
