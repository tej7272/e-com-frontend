import React, { useState } from "react";
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

const DRAWER_WIDTH = 240;
const COLLAPSED_WIDTH = 80;

const AdminLayout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  // const scrollRef = useRef(null);
  const [scrollTarget, setScrollTarget] = useState(null);

// ✅ callback ref — fires when element mounts, no useEffect needed
  const scrollRef = React.useCallback((node) => {
    if (node !== null) {
      setScrollTarget(node);
    }
  }, []);

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleCollapsed = () => setCollapsed(!collapsed);

  const sidebarWidth = collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH;

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

      {/* ✅ Mobile Drawer */}
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

      {/* ✅ Main Area — flex column, scrolls internally */}
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
        {/* ✅ HeaderBar gets scrollRef to detect scroll */}
        <HeaderBar isMobile={isMobile} scrollTarget={scrollTarget} />

        {/* Page Content */}
        <Box sx={{ flexGrow: 1, px: 3, pt: 2, pb: 8 }}>
          {children}
        </Box>
      </Box>
    </>
  );
};

export default AdminLayout;