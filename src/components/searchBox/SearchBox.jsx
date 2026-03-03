import { Box, ClickAwayListener, IconButton, InputAdornment, TextField } from "@mui/material";
import Iconify from "components/base/Iconify";



const SearchBox = ({name, searchValue, onSearch}) => {
    return (
        <Box sx={{}}>
            <ClickAwayListener onClickAway={() => {}}>
                <TextField
                    value={searchValue}
                    onChange={(e) => onSearch(e.target.value)}
                    placeholder={name}
                    fullWidth
                    sx={{
                        width: { xs: 1, md: 250 },
                    }}
                    slotProps={{
                        input: {
                            sx: {
                                "& input": {
                                    py: "13px",
                                },
                            },
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Iconify icon="eva:search-fill" />
                                </InputAdornment>
                            ),
                            endAdornment: searchValue && (
                                <InputAdornment position="end">
                                    <IconButton size="small" onClick={() => onSearch("")}>
                                        <Iconify icon="solar:close-circle-broken" />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </ClickAwayListener>
        </Box>
    )
}

export default SearchBox;