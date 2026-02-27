import * as React from 'react';
import { alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { useTheme } from "@mui/material";

export default function HeaderBar({ isMobile, scrollTarget }) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const triggered = useScrollTrigger({
    target: scrollTarget ?? undefined,
    disableHysteresis: true,
    threshold: 10,
  });

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const menuId = 'primary-search-account-menu';

  return (
    <AppBar
      position="sticky"
      elevation={triggered ? 4 : 0}
      sx={{
        top: 0,
        backdropFilter: triggered ? "blur(6px)" : "none",
        backgroundColor: triggered
          ? alpha(theme.palette.grey[50], 0.8)
          : "transparent",
        transition: theme.transitions.create(
          ["background-color", "backdrop-filter", "box-shadow"],
          { duration: theme.transitions.duration.shorter }
        ),
      }}
    >
      <Toolbar sx={{ height: { xs: 56, md: 70 } }}>
        <Box sx={{ flexGrow: 1 }} />

        <IconButton color="inherit">
          <SearchIcon />
        </IconButton>

        <IconButton color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>

        <IconButton color="inherit">
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <IconButton
          color="inherit"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
        >
          <AccountCircle />
        </IconButton>
      </Toolbar>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>
    </AppBar>
  );
}