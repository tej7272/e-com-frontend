import { Box, Grid, Button, Stack, Typography, Divider, Chip } from "@mui/material";
import React, { useState } from "react";
// import CustomIcon from "../../../../components/Icons/Icon";
import { Users, SquarePen, Plus } from 'lucide-react';
import { useSelector, useDispatch } from "react-redux";
import OrderStatusModal from "../models/OrderStatusModal";
import { deleteOrderStatus } from "../../../../redux/admin/settings/masterSlice";
import ConfirmDialog from "../../../../components/confirm-dialog/ConfirmDialog";

export default function OrderStatusCard(){

     const master = useSelector((state) => state.master.data);
     const dispatch = useDispatch()

    const [selectedData, setSelectedData] = useState(null)
    const [open, setOpen] = useState(false);
    const [orderStatusId, setOrderStatusId] = useState("")
    const [openConfirm, setOpenConfirm] = useState(false);

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
            const res = await dispatch(deleteOrderStatus(orderStatusId)).unwrap();
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

                <OrderStatusModal open={open} onClose={() => setOpen(false)} selectedData={selectedData} />
                <Box width="100%" sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant="h6"> 
                        {/* <CustomIcon icon={Users} style={{marginRight: '5px'}} strokeWidth={2}/> */}
                        Order Status
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
                    sx={{
                        mt: 1,
                        flexWrap: "wrap",
                        gap: 1.5,          // 👈 handles both row & column gap
                        alignItems: "flex-start",
                    }}
                >
                {
                        master?.orderStatus.map((row) => {
                            return (
                                <Chip 
                                    label={row.label} 
                                    key={row._id} 
                                    color="warning" 
                                    clickable
                                    sx={{ minWidth: 80, display: 'flex', justifyContent: 'space-between' }}
                                    onClick={() => handleSelect(row)} 
                                    onDelete={() => { setOpenConfirm(true); setOrderStatusId(row._id) }}
                                />
                            )
                        })
                    }
                </Stack>
            </Grid>
        </>
    )
}