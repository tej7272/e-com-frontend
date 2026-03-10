import { useState } from 'react';
import {
  Box,
  Card,
} from "@mui/material";
// import GenderCard from "./cards/GenderCard";
// import BrandCard from "./cards/BrandCard";
// import CategoryCard from "./cards/CategoryCard";
// import ColorCard from "./cards/ColorCard";
// import StockStatusCard from "./cards/OrderStatusCard";
// import SizeCard from "./cards/SizeCard";
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchMaster } from '../../../redux/admin/configuration/masterSlice';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CategoryView from './category/Category-view';
import SizeGroupView from './size-group/Size-Group-view';
import BrandView from './brand/Brand-view';
import ColorView from './color/Color-view';
import SubCategoryView from './sub-category/Sub-category-view';

const SettingTable = () => {

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange}>
              <Tab label="Category" value="1" />
              <Tab label="Size-group" value="2" />
              <Tab label="Sub-category" value="3" />
              <Tab label="Brand" value="4" />
              <Tab label="Color" value="5" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <CategoryView />
          </TabPanel>
          <TabPanel value="2">
            <SizeGroupView />
          </TabPanel>
          <TabPanel value="3">
            <SubCategoryView />
          </TabPanel>
          <TabPanel value="4">
            <BrandView />
          </TabPanel>
          <TabPanel value="5">
            <ColorView />
          </TabPanel>
        </TabContext>
      </Box>
    </Card>
  );
};

export default SettingTable;
