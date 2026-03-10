import {
    Toolbar,
    ToolbarButton,
    ColumnsPanelTrigger,
    FilterPanelTrigger,
    ExportCsv,
} from '@mui/x-data-grid';

import { Box, Tooltip, Menu, MenuItem, Stack, Button } from '@mui/material';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import Iconify from 'components/base/Iconify';
import SearchBox from 'components/searchBox/SearchBox';

const CustomToolbar = ({
    searchValue,
    onSearch,
    searchName,
    exportData,
    exportFileName,
    title,
    handleOpen
}) => {
    const [exportAnchor, setExportAnchor] = useState(null);

    const handleExcelExport = () => {
        const ws = XLSX.utils.json_to_sheet(exportData || []);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, `${exportFileName || 'export'}.xlsx`);
        setExportAnchor(null);
    };

    return (
        <Toolbar sx={{ gap: 1, px: 2, py: 1, mb: 2 }}>

            

            <Stack direction="row" spacing={1} justifyContent="flex-end">

                {handleOpen && (
                    <Button type="button" variant="contained" onClick={handleOpen}>
                        {title}
                    </Button>
                )}

                {onSearch && (
                    <SearchBox
                        searchValue={searchValue}
                        onSearch={onSearch}
                        name={searchName}
                    />
                )}
                    
            </Stack>

            <Box sx={{ flex: 1 }} />

            <ColumnsPanelTrigger render={
                <Tooltip title="Columns">
                    <ToolbarButton>
                        <Iconify icon="solar:eye-bold" />
                    </ToolbarButton>
                </Tooltip>
            }/>

            <FilterPanelTrigger render={
                <Tooltip title="Filter">
                    <ToolbarButton>
                        <Iconify icon="solar:filter-bold-duotone" />
                    </ToolbarButton>
                </Tooltip>
            }/>

            <Tooltip title="Export">
                <ToolbarButton onClick={(e) => setExportAnchor(e.currentTarget)}>
                    <Iconify icon="solar:export-outline" />
                </ToolbarButton>
            </Tooltip>
            <Menu
                anchorEl={exportAnchor}
                open={Boolean(exportAnchor)}
                onClose={() => setExportAnchor(null)}
            >
                <ExportCsv render={
                    <MenuItem onClick={() => setExportAnchor(null)}>
                        <Iconify icon="solar:file-text-outline" sx={{ mr: 1 }} />
                        Export CSV
                    </MenuItem>
                }/>
                <MenuItem onClick={handleExcelExport}>
                    <Iconify icon="solar:file-outline" sx={{ mr: 1 }} />
                    Export Excel
                </MenuItem>
            </Menu>

            

            
        </Toolbar>
    );
};

export default CustomToolbar;