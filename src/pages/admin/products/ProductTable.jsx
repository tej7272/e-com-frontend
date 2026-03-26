import {
  Box,
  IconButton,
  Paper,
  Tooltip,
  MenuItem,
  MenuList,
} from "@mui/material";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import usePopover from "../../../components/custom-popover/usePopover";
import CustomPropover from "../../../components/custom-popover/CustomPopover";
import Label from "../../../components/label/Label";
import Iconify from "components/base/Iconify";
import ProductFormModal from "./ProductFormModal";
import NewAddProduct from "./NewAddProduct";

const ProductTable = () => {

  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedData, setSelectedData] = useState(null);

  const popover = usePopover();




  const columns = [
    { 
      field: "itemPics", 
      headerName: "Pics", 
      width: 100,
      renderCell: (params) => {
        const imgUrl = params.value[0]
        return (
          <img
            src= "https://www.kasandbox.org/programming-images/avatars/spunky-sam.png"
            alt="item"
            style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 4 }}
          />
        );
      }
    },
    { field: "name", headerName: "Product name", width: 200},
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
              <Iconify icon="formkit:reorder" />
            </IconButton>
          </Tooltip>
        )
      }
    },
  ];

  const rows = [
  {
    id: 1,
    name: "Running Shoes Pro",
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
    name: "Classic Cotton T-Shirt",
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
    name: "Slim Fit Jeans",
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
    name: "Leather Wallet",
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
    name: "Sports Cap",
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
    name: "Casual Sneakers",
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



  const paginationModel = { page: 0, pageSize: 10 };

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

      {/* Keep only one product modal mounted; two open dialogs can fight over focus/state. */}
      {/* <NewAddProduct open ={open} onClose={handleClose} selectedData={selectedData}/> */}
      <ProductFormModal open ={open} onClose={handleClose} selectedData={selectedData}/>
      <Box sx={{ mt: 3 }}>
        <Paper sx={{ width: "100%", pt: 2}}>
          <DataGrid
            showToolbar
            rows={filteredList}
            getRowId={(row) => row.id}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 20, 50]}
            disableRowSelectionOnClick
            checkboxSelection={false}
            // sx={{ border: 0 }}
            slotProps={{
              toolbar: {
                searchValue,
                onSearch:  (val) => setSearchValue(val),
                exportData:  filteredList,
                exportFileName: "products",
                title:  "Add Product",
                handleOpen : () => {setOpen(true); setSelectedData(null)},
              }
            }}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default ProductTable;
