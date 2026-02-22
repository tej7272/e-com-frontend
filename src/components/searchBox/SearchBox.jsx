import { Box, ClickAwayListener, IconButton, InputAdornment, TextField } from "@mui/material";
import { Search, X } from 'lucide-react';
// import CustomIcon from "../Icons/Icon";



const SearchBox = ({name, searchValue, onSearch}) => {
    return (
        <Box sx={{}}>
            <ClickAwayListener onClickAway={() => {}}>
            <TextField
                value={searchValue}
                onChange={(e) => onSearch(e.target.value)}
                placeholder= {name}
                size="small"
                fullWidth
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        {/* <CustomIcon icon={Search}/> */}
                    </InputAdornment>
                ),
                endAdornment: searchValue && (
                    <InputAdornment position="end">
                        <IconButton size="small" onClick={() => onSearch('')}>
                            {/* <CustomIcon icon={X}/> */}
                        </IconButton>
                    </InputAdornment>
                ),
                }}
            />
            </ClickAwayListener>
        </Box>
    )
}

export default SearchBox;