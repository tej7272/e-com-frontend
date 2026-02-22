import { mainDrawerWidth } from 'lib/constants';

export const fontFamilies = ['Plus Jakarta Sans', 'Roboto', 'Inter', 'Poppins'];

export const initialConfig = {
  assetsDir: import.meta.env.VITE_ASSET_BASE_URL ?? '',
  sidenavCollapsed: false,
  openNavbarDrawer: false,
  drawerWidth: mainDrawerWidth.full,
  fontFamily: fontFamilies[0],
};


console.log("initiacacadli", initialConfig)

export const defaultAuthCredentials = {
  email: 'demo@aurora.com',
  password: 'password123',
};