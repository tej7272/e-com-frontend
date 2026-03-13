import {
    Toolbar,
    ToolbarButton,
    ColumnsPanelTrigger,
    FilterPanelTrigger,
    ExportCsv,
} from '@mui/x-data-grid';

import {
    Box,
    Tooltip,
    Menu,
    MenuItem,
    Button,
    useTheme,
    useMediaQuery,
    IconButton
} from '@mui/material';

import { useState } from 'react';
import * as XLSX from 'xlsx';
import Iconify from 'components/base/Iconify';
import SearchBox from 'components/searchBox/SearchBox';

const CustomToolbar = ({
    searchValue,
    onSearch,
    exportData,
    exportFileName,
    title,
    handleOpen
}) => {

    const [exportAnchor, setExportAnchor] = useState(null);
    const [mobileSearch, setMobileSearch] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    const handleExcelExport = () => {
        const ws = XLSX.utils.json_to_sheet(exportData || []);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, `${exportFileName || 'export'}.xlsx`);
        setExportAnchor(null);
    };

    return (
        <Toolbar
            sx={{
                gap: 1,
                px: { xs: 1, sm: 2 },
                py: { xs: 1, sm: 1.5 },
                mb: 1,
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                height: 'auto',
                minHeight: 'unset'
            }}
        >

            {handleOpen && (
                isMobile ? (
                    <Tooltip title={title || 'Add'}>
                        <IconButton
                            onClick={handleOpen}
                            sx={{
                                bgcolor: 'primary.main',
                                color: 'white',
                                borderRadius: 1,
                                '&:hover': {
                                    bgcolor: 'primary.dark'
                                }
                            }}
                        >
                            <Iconify icon="solar:add-circle-bold" />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Button
                        type="button"
                        variant="contained"
                        onClick={handleOpen}
                        startIcon={<Iconify icon="solar:add-circle-bold" />}
                        size={isTablet ? 'small' : 'medium'}
                    >
                        {title}
                    </Button>
                )
            )}

            <Box sx={{ flex: 1 }} />

            {/* Desktop Search */}
            {!isMobile && onSearch && (
                <SearchBox
                    searchValue={searchValue}
                    onSearch={onSearch}
                />
            )}

            {/* Mobile Search Toggle */}
            {isMobile && onSearch && (
                <Tooltip title="Search">
                    <ToolbarButton onClick={() => setMobileSearch(!mobileSearch)}>
                        <Iconify icon="solar:magnifer-outline"/>
                    </ToolbarButton>
                </Tooltip>
            )}

            <ColumnsPanelTrigger
                render={
                    <Tooltip title="Columns">
                        <ToolbarButton>
                            <Iconify icon="solar:eye-bold" />
                        </ToolbarButton>
                    </Tooltip>
                }
            />

            {/* Filter */}
            <FilterPanelTrigger
                render={
                    <Tooltip title="Filter">
                        <ToolbarButton>
                            <Iconify icon="solar:filter-bold-duotone" />
                        </ToolbarButton>
                    </Tooltip>
                }
            />

            {/* Export */}
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
                <ExportCsv
                    render={
                        <MenuItem onClick={() => setExportAnchor(null)}>
                            <Iconify icon="solar:file-text-outline" sx={{ mr: 1 }} />
                            Export CSV
                        </MenuItem>
                    }
                />

                <MenuItem onClick={handleExcelExport}>
                    <Iconify icon="solar:file-outline" sx={{ mr: 1 }} />
                    Export Excel
                </MenuItem>
            </Menu>

            {/* Mobile Search Row */}
            {isMobile && mobileSearch && (
                <Box sx={{ width: '100%', mt: 1 }}>
                    <SearchBox
                        searchValue={searchValue}
                        onSearch={onSearch}
                    />
                </Box>
            )}

        </Toolbar>
    );
};

export default CustomToolbar;