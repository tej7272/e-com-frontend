import React, { Suspense, useEffect, useState } from "react";
import {
  Box,
  Drawer,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Navbar from "components/layouts/admin/Navbar";
import HeaderBar from "components/common/HeaderBar";
import { Outlet } from "react-router-dom";
import PageLoader from "components/loading/PageLoader";
import { useDispatch } from "react-redux";
import { getFormConfig } from "store/slices/admin/formConfigSlice";

const DRAWER_WIDTH = 240;
const COLLAPSED_WIDTH = 80;

const AdminLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [scrollTarget, setScrollTarget] = useState(null);

  const scrollRef = React.useCallback((node) => {
    if (node !== null) {
      setScrollTarget(node);
    }
  }, []);

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleCollapsed = () => setCollapsed(!collapsed);

  const sidebarWidth = collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFormConfig())
  },[dispatch])

  return (
    <>
      {/* ✅ Desktop Sidebar — in flow, no position fixed */}
      {!isMobile && (
        <Box
          sx={{
            width: sidebarWidth,
            flexShrink: 0,
            height: "100vh",
            borderRight: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.default,
            transition: theme.transitions.create("width", { duration: 200 }),
            overflow: "visible",
          }}
        >
          <Navbar collapsed={collapsed} onCollapse={handleCollapsed} />
        </Box>
      )}

    
      {isMobile && (
        <>
          <IconButton
            onClick={() => setMobileOpen(true)}
            sx={{ position: "absolute", top: 10, left: 10, zIndex: 1300 }}
          >
            <MenuIcon />
          </IconButton>

          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              "& .MuiDrawer-paper": {
                width: DRAWER_WIDTH,
                boxSizing: "border-box",
              },
            }}
          >
            <Navbar collapsed={false} onCollapse={() => {}} />
          </Drawer>
        </>
      )}


      <Box
        ref={scrollRef}
        sx={{
          flex: "1 1 auto",
          height: "100vh",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          transition: theme.transitions.create("flex", { duration: 200 }),
        }}
      >
        <HeaderBar isMobile={isMobile} scrollTarget={scrollTarget} />

        <Box sx={{ flexGrow: 1, px: 3, pt: 2, pb: 8 }}>
          <Suspense fallback={<PageLoader />}>
            <Outlet />   
          </Suspense>
        </Box>
      </Box>
    </>
  );
};

export default AdminLayout;