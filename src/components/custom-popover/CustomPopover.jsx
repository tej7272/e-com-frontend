import { Popover, Box } from "@mui/material"

const CustomPropover = ({
    id="popover",
    open, 
    onClose, 
    anchorEl, 
    children
}) => {
    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{vertical: 'bottom', horizontal: 'left',}}
            transformOrigin={{vertical: 'top', horizontal: 'left',}}
            slotProps={{
                paper: {
                    sx: {
                        px: .5,
                        borderRadius: 2,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    },
                },
            }}
        >
            <Box minWidth='100px'>
                {children}
            </Box>
      </Popover>
    )
}

export default CustomPropover