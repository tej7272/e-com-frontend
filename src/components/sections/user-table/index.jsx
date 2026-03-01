import { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import { useGridApiRef } from '@mui/x-data-grid';
import Iconify from 'components/base/Iconify';
import StyledTextField from 'components/styled/StyledTextField';
import UsersTable from './UsersTable';
import FilterSection from './filters/FilterSection';
import AddProductModal from './AddProduct';

const UserListContainer = () => {
  const [filterButtonEl, setFilterButtonEl] = useState(null);
  const [open, setOpen] = useState(false);
  const apiRef = useGridApiRef();

  const handleSearch = useCallback(
    (e) => {
      apiRef.current?.setQuickFilterValues([e.target.value]);
    },
    [apiRef],
  );

  const handleToggleFilterPanel = (e) => {
    const clickedEl = e.currentTarget;

    if (filterButtonEl && filterButtonEl === clickedEl) {
      setFilterButtonEl(null);
      apiRef.current?.hideFilterPanel();

      return;
    }

    setFilterButtonEl(clickedEl);
    apiRef.current?.showFilterPanel();
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Grid container spacing={4}>
      <AddProductModal  onClose={()=>setOpen(false)} open={open} selectedData={null}/>
      <Grid size={12}>
        <Stack
          sx={{
            columnGap: 1,
            rowGap: 2,
            justifyContent: 'space-between',
            alignItems: { xl: 'center' },
            flexWrap: { xs: 'wrap', md: 'nowrap' },
          }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<Iconify icon="material-symbols:add-rounded" />}
            sx={{ flexShrink: 0 }}
            onClick={handleOpen}
          >
            Add User
          </Button>

          <StyledTextField
            id="search-box"
            type="search"
            size="medium"
            placeholder="Search user"
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify
                      icon="material-symbols:search-rounded"
                      sx={{
                        fontSize: 20,
                        color: 'text.secondary',
                      }}
                    />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              maxWidth: { sm: 250 },
              minWidth: { sm: 200 },
              order: { xs: 1, sm: 0 },
              flexGrow: 1,
              mr: { md: 'auto' },
              flexBasis: { xs: 'calc(100% - 88px)', sm: 'auto' },
            }}
            onChange={handleSearch}
          />

          <Box sx={{ order: 1, flexShrink: 0, width: { xs: 1, md: 'auto' } }}>
            <FilterSection apiRef={apiRef} handleToggleFilterPanel={handleToggleFilterPanel} />
          </Box>
        </Stack>
      </Grid>

      <Grid size={12}>
        <UsersTable apiRef={apiRef} filterButtonEl={filterButtonEl} />
      </Grid>
    </Grid>
  );
};

export default UserListContainer;
