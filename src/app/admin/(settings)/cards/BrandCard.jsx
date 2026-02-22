import { Box, Grid, Button, Stack, Typography, Divider, Chip } from "@mui/material";
import React, { useState } from "react";
// import CustomIcon from "../../../../components/Icons/Icon";
import { ShoppingBag, SquarePen, Plus } from 'lucide-react'
import BrandModal from "../models/BrandModal";
import { useSelector, useDispatch } from "react-redux";
import ConfirmDialog from "../../../../components/confirm-dialog/ConfirmDialog";
import { deleteBrand } from "../../../../redux/admin/settings/masterSlice";

export default function BrandCard(){
    
    const master = useSelector((state) => state.master.data);
    const dispatch = useDispatch()

    const [selectedData, setSelectedData] = useState(null)
    const [brandId, setBrandId] = useState("")
    const [openConfirm, setOpenConfirm] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSelect = (row) => {
        if(!selectedData || selectedData._id !== row._id){
            setSelectedData(row)
        }else{
            setSelectedData(null);
        }
    }

    const handleOpen = () => {
        setOpen(true);
        setSelectedData(null);
    }

    const handleDelete = async () => {
        const res = await dispatch(deleteBrand(brandId)).unwrap();
        if(res.status){
            setOpenConfirm(false);
        }
    }

    return (
        <>
            <ConfirmDialog 
                open={openConfirm}
                onClose={() => setOpenConfirm(false)}
                title = "Confirm Delete"
                content="Are you sure you want to delete? This action cannot be Undone!"
                action={
                    <Button variant="contained" color="success" size="large" onClick={handleDelete}>Confirm</Button>
                }
            />

            <Grid 
                size={4} 
                sx={{
                    bgColor: 'background.paper', 
                    boxShadow: "0 4px 12px rgba(83, 75, 75, 0.33)", 
                    borderRadius: 2, 
                    p: 2,
                    minHeight: 300
                }}
            >
                <BrandModal open={open} onClose={() => setOpen(false)} selectedData={selectedData}/>
                <Box width="100%" sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    {/* <Box> */}
                        <Typography variant="h6"> 
                            {/* <CustomIcon icon={ShoppingBag} style={{marginRight: '5px'}} strokeWidth={2}/> */}
                            Brand
                        </Typography>
                    <Stack direction="row" spacing={1} >
                        <Button variant="contained" type="button" color="success" onClick={handleOpen}>
                            {/* <CustomIcon icon={Plus} size={11} strokeWidth={2} style={{marginRight: '3px'}}/> */}
                            Add new
                        </Button>
                        <Button variant="contained" disabled={!selectedData} onClick={() => setOpen(true)}>
                            {/* <CustomIcon icon={SquarePen} size={11} strokeWidth={2} style={{marginRight: '3px'}}/> */}
                            Edit
                        </Button>
                    </Stack>
                </Box>
                <Divider sx={{my: 1}}/>
                <Stack 
                    direction="row" 
                    alignItems="flex-start" 
                    sx={{
                        mt: 1,
                        flexWrap: "wrap",
                        gap: 1.5,
                    }}
                >
                    {master?.brands.map((row) => 
                        <Chip 
                            label={row.label} 
                            key={row._id} 
                            color="warning" 
                            clickable
                            sx={{ minWidth: 80, display: 'flex', justifyContent: 'space-between' }}
                            onClick={() => handleSelect(row)} 
                            onDelete={() => { setOpenConfirm(true); setBrandId(row._id) }}
                        />
                    )}
                </Stack>
            </Grid>
        </>
    )
}