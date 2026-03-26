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
            anchorOrigin={{vertical: 'bottom', horizontal: 'right',}}
            transformOrigin={{vertical: 'top', horizontal: 'right',}}
        >
            <Box minWidth='110px'>
                {children}
            </Box>
      </Popover>
    )
}

export default CustomPropover