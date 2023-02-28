
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import IndividualCreateCompany from '../components/companies/IndividualCreateCompany';

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

function allyPropsCompany(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function CreateCompanies() {
  const [valueProveedor, setValueProveedor] = useState(0);

  const handleChangeProveedor = (event, newValue) => {
    setValueProveedor(newValue);
  };


  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 2, borderColor: 'rgb(229, 231, 235)', paddingBottom: '10px' }}>
      <div className="title-main">AÑADIR EMPRESAS</div>

      </Box>
        <Tabs value={valueProveedor} onChange={handleChangeProveedor} aria-label="basic tabs example">
          <Tab label="Individual" {...allyPropsCompany(0)} />
          <Tab label="Multiple" {...allyPropsCompany(1)} />
        </Tabs>
        <TabPanel value={valueProveedor} index={0}>
            <IndividualCreateCompany/>
        </TabPanel>
        <TabPanel value={valueProveedor} index={1}>
          Hola mundo
        </TabPanel>
    </Box>
  );
}