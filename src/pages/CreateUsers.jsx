
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Proveedor from '../components/users/Proveedor';
import { useState } from 'react';
import ProveedorMultiple from '../components/users/ProveedorMultiple';

function TabPanel(props) {
  const { children, value, index, valueProveedor, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function a11yPropsProv(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function CreateUsers() {
  const [value, setValue] = useState(0);
  const [valueProveedor, setValueProveedor] = useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeProveedor = (event, newValue) => {
    setValueProveedor(newValue);
  };


  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 2, borderColor: 'rgb(229, 231, 235)' }}>
      <div className="title-main">AÑADIR USUARIOS</div>

        <Tabs sx={{ paddingLeft: '5%' }} value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Proveedor" sx={{ fontSize: 'smaller', textTransform: 'capitalize' }} {...a11yProps(0)} />
          <Tab label="Cliente" sx={{ fontSize: 'small', textTransform: 'capitalize' }} {...a11yProps(1)} />
          <Tab label="Administrador" sx={{ fontSize: 'small', textTransform: 'capitalize' }} {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Tabs value={valueProveedor} onChange={handleChangeProveedor} aria-label="basic tabs example">
          <Tab label="Individual" {...a11yPropsProv(0)} />
          <Tab label="Multiple" {...a11yPropsProv(1)} />
        </Tabs>
        <TabPanel value={valueProveedor} index={0}>
            <Proveedor/>
        </TabPanel>
        <TabPanel value={valueProveedor} index={1}>
          <ProveedorMultiple/>
        </TabPanel>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}