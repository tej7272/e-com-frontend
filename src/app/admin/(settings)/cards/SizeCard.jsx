import { Box, Grid, Button, Stack, Typography, Divider, Chip } from "@mui/material";
import React, { useState } from "react";
// import CustomIcon from "../../../../components/Icons/Icon";
import { Users, SquarePen, Plus } from 'lucide-react'
import SizeModal from "../models/SizeModal";
import { useSelector, useDispatch } from "react-redux";
import { deleteSize } from "../../../../redux/admin/settings/masterSlice";
import ConfirmDialog from "../../../../components/confirm-dialog/ConfirmDialog";

export default function SizeCard(){

    const master = useSelector((state) => state.master.data);
    const dispatch = useDispatch()

    const [selectedData, setSelectedData] = useState(null)
    const [open, setOpen] = useState(false);
    const [sizeId, setSizeId] = useState("")
    const [openConfirm, setOpenConfirm] = useState(false);

    const handleSelect = (size) => {
        if(!selectedData || selectedData.id !== size.id){
            setSelectedData(size)
        }else{
            setSelectedData(null);
        }
    }

    const handleOpen = () => {
        setOpen(true);
        setSelectedData(null);
    }

    const handleDelete = async () => {
            const res = await dispatch(deleteSize(sizeId)).unwrap();
            if(res.status){
                setOpenConfirm(false);
            }
        }

    const categoryWithSize = master?.categories.filter((category) => 
        master?.sizes.some(size => size.categoryId === category._id)
    )

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

                <SizeModal open={open} onClose={() => setOpen(false)} selectedData={selectedData}/>
                <Box width="100%" sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant="h6"> 
                        {/* <CustomIcon icon={Users} style={{marginRight: '5px'}} strokeWidth={2}/> */}
                        Sizes
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
                <Divider sx={{mt: 1}}/>
                
                { categoryWithSize?.map((category, index) => {
                    return (
                    <Stack direction="column" sx={{mt: 1,}} key={index}>
                        <Box sx={{backgroundColor: "chocolate", p: 1, maxWidth: 80, borderRadius: 2, color: "#ffff"}}>{category.label}</Box>
                        
                        <Stack
                            direction="row"
                            sx={{
                                mt: 1,
                                mb: 1.5,
                                flexWrap: "wrap",
                                gap: 1.5,          // 👈 handles both row & column gap
                                alignItems: "flex-start",
                            }}
                        >
                            {
                                master?.sizes.filter((row) => row.categoryId === category._id).map((row) => {
                                    return (
                                        <Chip 
                                            label={row.label} 
                                            key={row._id} 
                                            color="warning" 
                                            clickable
                                            sx={{ minWidth: 80, display: 'flex', justifyContent: 'space-between' }}
                                            onClick={() => handleSelect(row)} 
                                            onDelete={() => { setOpenConfirm(true); setSizeId(row._id) }}
                                        />
                                    )
                                })
                            }
                         </Stack>
                    </Stack>
                    )
                })}
            </Grid>
        </>
    )
}