import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Tooltip,
  IconButton,
  useTheme,
} from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  DashboardOutlined,
  Inventory2Outlined,
  ProductionQuantityLimitsOutlined,
  PeopleAltOutlined,
  StarBorderPurple500Outlined,
  SettingsOutlined,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { ChevronLeftIcon } from "lucide-react";

const navItems = [
  { path: "/admin", label: "Dashboard", icon: <DashboardOutlined /> },
  { path: "/admin/products", label: "Products", icon: <Inventory2Outlined /> },
  { path: "/admin/orders", label: "Orders", icon: <ProductionQuantityLimitsOutlined /> },
  { path: "/admin/customers", label: "Customers", icon: <PeopleAltOutlined /> },
  { path: "/admin/reviews", label: "Reviews", icon: <StarBorderPurple500Outlined /> },
  { path: "/admin/settings", label: "Settings", icon: <SettingsOutlined /> },
];

const Navbar = ({ collapsed, onCollapse }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2,
          py: 2,
          display: "flex",
          alignItems: "center",
           position: "relative",
          justifyContent: collapsed ? "center" : "space-between",
        }}
      >
        {/* {!collapsed && ( */}
          <Typography variant="h6" fontWeight={600}>
            Admin
          </Typography>
        {/* )} */}

        {onCollapse && (
          
            <IconButton 
              onClick={onCollapse} 
              sx={{
                position: "absolute",
                right: -16,          // ✅ half outside the sidebar border
                top: "50%",
                transform: "translateY(-30%)",
                zIndex: theme.zIndex.drawer + 1,
                width: 28,
                height: 28,
                backgroundColor: theme.palette.grey[50],
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: 2,
                "&:hover": {
                  backgroundColor: "background.paper",
                },
              }}
            >
              {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
        )}
      </Box>

      {/* <Divider /> */}

      {/* Scrollable Nav Items */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          overflowX: "hidden",
          px: 1,
          py: 2,
        }}
      >
        <List disablePadding>
          {navItems.map((item) => (
            <Tooltip
              key={item.path}
              title={collapsed ? item.label : ""}
              placement="right"
            >
              <ListItemButton
                component={NavLink}
                to={item.path}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  justifyContent: collapsed ? "center" : "flex-start",
                  "&.active": {
                    backgroundColor: theme.palette.action.selected,
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: collapsed ? 0 : 2,
                    justifyContent: "center",
                    color: "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                {!collapsed && (
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ variant: "body2" }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Navbar;