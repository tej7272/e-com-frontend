import { Box } from "@mui/material";
import React, { Suspense } from "react";
import Navbar from "../components/layouts/admin/Navbar";
import { useTheme } from "@mui/material/styles";

const AdminLayout = ({ children }) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', backgroundColor: theme.palette.background.default }}>
      
      <Box 
        sx={{ 
          width: 250, 
          flexShrink: 0,
          height: '95vh',
          overflow: 'auto',
          position: 'fixed',
          left: 12,
          top: 15,
          borderRadius: 3,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Navbar />
      </Box>

      <Box 
        component="main"
        sx={{ 
          flexGrow: 1,
          px: 3,
          marginLeft: '260px',
          height: '100vh',
          overflow: 'auto',
          backgroundColor: theme.palette.background.default
        }}
      >
        <Suspense fallback={<div>loading...</div>}>
          {children}
        </Suspense>
      </Box>
      
    </Box>
  );
};

export default AdminLayout;