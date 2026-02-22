

import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';
import { FormControlLabel, Switch } from '@mui/material';

export default function TablePaginationCustom(props){

    const {rowsPerPage, rowsPerPageOptions, page, rows, onPageChange, onRowsPerPageChange, dense, handleChangeDense} = props;
    return (
        <Box>
            <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
            />
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense"
                sx={{px: 2}}
            />
        </Box>
    )
}