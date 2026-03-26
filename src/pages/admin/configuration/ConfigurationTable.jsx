import { useState } from 'react';
import {
  Box,
  Card,
} from "@mui/material";
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

  const [value, setValue] = useState('category');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange}>
              <Tab label="Category" value="category" />
              <Tab label="Size-group" value="size-group" />
              <Tab label="Sub-category" value="sub-category" />
              <Tab label="Brand" value="brand" />
              <Tab label="Color" value="color" />
            </TabList>
          </Box>
          <TabPanel value="category">
            <CategoryView />
          </TabPanel>
          <TabPanel value="size-group">
            <SizeGroupView />
          </TabPanel>
          <TabPanel value="sub-category">
            <SubCategoryView />
          </TabPanel>
          <TabPanel value="brand">
            <BrandView />
          </TabPanel>
          <TabPanel value="color">
            <ColorView />
          </TabPanel>
        </TabContext>
      </Box>
    </Card>
  );
};

export default SettingTable;
