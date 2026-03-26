import React from "react";
import { Box, Divider, Tooltip, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { PATHS } from "routes/paths";
import Iconify from "components/base/Iconify";

const NAV_SECTIONS = [
  {
    label: "Main",
    items: [
      { path: PATHS.admin.root, label: "Dashboard", icon: "solar:widget-2-bold-duotone", badge: null },
      { path: PATHS.admin.products, label: "Products", icon: "solar:box-bold-duotone", badge: null },
      { path: PATHS.admin.orders, label: "Orders", icon: "solar:bag-bold-duotone", badge: 12   },
      { path: PATHS.admin.customers, label: "Customers", icon: "solar:users-group-rounded-bold-duotone", badge: null },
      { path: PATHS.admin.reviews, label: "Reviews", icon: "solar:star-bold-duotone", badge: null },
    ],
  },
  {
    label: "System",
    items: [
      { path: PATHS.admin.configuration, label: "Configuration", icon: "solar:settings-bold-duotone", badge: null },
    ],
  },
];

const Navbar = ({ collapsed, onCollapse, user }) => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        transition: "width 0.22s cubic-bezier(.4,0,.2,1)",
        flexShrink: 0,
      }}
    >
      <Box
        sx={{
          px: 1.5,
          py: 2.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, overflow: "hidden" }}>
          <Iconify icon="solar:layers-bold-duotone" width={28}/>
          <Typography
            variant="body1"
            fontWeight={600}
            noWrap
            sx={{
              opacity: collapsed ? 0 : 1,
              width: collapsed ? 0 : "auto",
              transition: "opacity 0.15s",
              letterSpacing: "-0.01em",
            }}
          >
            B-nexora
          </Typography>
        </Box>

        {/* Collapse toggle */}
        {onCollapse && (
          <Box
            onClick={onCollapse}
            sx={{
              p: '3px',
              borderRadius: "6px",
              border: "1px solid",
              borderColor: "divider",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            {collapsed
              ? <Iconify icon="solar:alt-arrow-right-bold-duotone" width={18} />
              : <Iconify icon="solar:alt-arrow-left-bold-duotone"  width={18} />
            }
          </Box>
        )}
      </Box>

      <Divider />

      <Box sx={{ flex: 1, overflowY: "auto", overflowX: "hidden", px: 1, py: 1 }}>
        {NAV_SECTIONS.map((section) => (
          <Box key={section.label} sx={{ mb: 1 }}>
            <Typography
              sx={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "text.disabled",
                px: 1, py: 0.5,
                opacity: collapsed ? 0 : 1,
                transition: "opacity 0.15s",
                whiteSpace: "nowrap",
              }}
            >
              {section.label}
            </Typography>

            {section.items.map((item) => (
              <Tooltip
                key={item.path}
                title={collapsed ? item.label : ""}
                placement="right"
                arrow
              >
                <Box
                  component={NavLink}
                  to={item.path}
                  end={item.path === PATHS.admin.root}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.25,
                    px: 1, py: 1,
                    borderRadius: "7px",
                    mb: "2px",
                    textDecoration: "none",
                    position: "relative",
                    color: "text.secondary",
                    "&:hover": { bgcolor: "action.hover" },
                    "&.active": {
                      bgcolor: "primary.lighter", // or cssVarRgba(primary.lightChannel, 0.08)
                      color: "primary.main",
                      "& .nav-icon-wrap": { bgcolor: "primary.soft" },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        left: 0, top: "50%",
                        transform: "translateY(-50%)",
                        width: 3, height: 18,
                        bgcolor: "primary.main",
                        borderRadius: "0 3px 3px 0",
                      },
                    },
                  }}
                >
                  <Iconify icon={item.icon} />

                  {/* Label */}
                  <Typography
                    variant="body2"
                    noWrap
                    sx={{
                      opacity: collapsed ? 0 : 1,
                      width: collapsed ? 0 : "auto",
                      transition: "opacity 0.15s",
                    }}
                  >
                    {item.label}
                  </Typography>

                  {/* Badge */}
                  {item.badge && !collapsed && (
                    <Box
                      sx={{
                        ml: "auto",
                        fontSize: 10, fontWeight: 600,
                        bgcolor: "error.main", color: "white",
                        borderRadius: "10px",
                        px: 0.75, py: "1px",
                        lineHeight: 1.6,
                        flexShrink: 0,
                      }}
                    >
                      {item.badge}
                    </Box>
                  )}
                </Box>
              </Tooltip>
            ))}
          </Box>
        ))}
      </Box>

      {/* ── User footer ── */}
      <Box sx={{ p: 1, borderTop: "1px solid", borderColor: "divider" }}>
        <Box
          sx={{
            display: "flex", alignItems: "center", gap: 1.25,
            px: 1, py: 0.75,
            borderRadius: "7px",
            cursor: "pointer",
            "&:hover": { bgcolor: "action.hover" },
          }}
        >
          <Box
            sx={{
              width: 28, height: 28, borderRadius: "50%",
              bgcolor: "primary.lighter",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 600, color: "primary.main",
              flexShrink: 0,
            }}
          >
            {user?.name?.slice(0, 2).toUpperCase() ?? "AD"}
          </Box>
          <Box
            sx={{
              overflow: "hidden",
              opacity: collapsed ? 0 : 1,
              width: collapsed ? 0 : "auto",
              transition: "opacity 0.15s",
            }}
          >
            <Typography variant="caption" fontWeight={500} noWrap display="block">
              {user?.name ?? "Admin"}
            </Typography>
            <Typography variant="caption" color="text.disabled" noWrap display="block">
              {user?.role ?? "Super Admin"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;