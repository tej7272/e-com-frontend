import { useTheme } from '@emotion/react';
import { Box, useMediaQuery } from '@mui/material';
import HeaderBar from 'components/common/HeaderBar';
import PageLoader from 'components/loading/PageLoader';
import React, { Suspense, useState } from 'react'
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [scrollTarget, setScrollTarget] = useState(null);

  const scrollRef = React.useCallback((node) => {
    if (node !== null) setScrollTarget(node);
  }, []);

  return (
    <Box
      ref={scrollRef}
      sx={{
        flex: "1 1 auto",
        height: "100vh",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        transition: theme.transitions.create("flex", { duration: 200 }),
        background: `
          radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.08) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 20%, rgba(168,85,247,0.06) 0%, transparent 60%),
          #f8f9ff
        `,
      }}
    >
      <HeaderBar isMobile={isMobile} scrollTarget={scrollTarget} />

      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 3,
          pb: 8,
          pt: 2,
        }}
      >
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </Box>
    </Box>
  );
};

export default AuthLayout;