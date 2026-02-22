import { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import GenderCard from "./cards/GenderCard";
import BrandCard from "./cards/BrandCard";
import CategoryCard from "./cards/CategoryCard";
import ColorCard from "./cards/ColorCard";
import StockStatusCard from "./cards/OrderStatusCard";
import SizeCard from "./cards/SizeCard";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMaster } from '../../../redux/admin/settings/masterSlice';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CategoryView from './category/Category-view';

const SettingTable = () => {
  const dispatch = useDispatch()
 
  const loading = useSelector((state) => state.master.loading);
  const master = useSelector((state) => state.master.data);

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
      dispatch(fetchMaster());
  },[dispatch])

  if(loading && !master){
    return <Box>Loading...</Box>
  }

  return (
    <Box sx={{}}>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange}>
              <Tab label="Category" value="1" />
              <Tab label="Sub-category" value="2" />
              <Tab label="Brand" value="3" />
              <Tab label="Color" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{px: 0}}>
            <CategoryView />
          </TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </Box>
      {/* <Divider /> */}

      {/* <Grid container spacing={1.5} sx={{ px: 2, my: 2 }}>

        <GenderCard />
        <BrandCard />
        <CategoryCard />
        <ColorCard />
        <StockStatusCard />
        <SizeCard />
      </Grid> */}
    </Box>
  );
};

export default SettingTable;
