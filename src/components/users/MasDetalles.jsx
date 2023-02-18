import * as React from 'react';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import { useState } from 'react';

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
  


export default function MasDetalles() {
  const [valueSettings, setValueSettings] = useState(0);

  const handleChangeSettings = (event, newValue) => {
    setValueSettings(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    
    <div>
        <Tabs value={valueSettings} onChange={handleChangeSettings} aria-label="basic tabs example">
          <Tab label="Empresas" sx={{ fontSize: 'smaller', textTransform: 'capitalize' }} {...a11yProps(0)} />
          <Tab label="Periodos" sx={{ fontSize: 'smaller', textTransform: 'capitalize' }} {...a11yProps(1)} />
          <Tab label="Categorias" sx={{ fontSize: 'smaller', textTransform: 'capitalize' }} {...a11yProps(2)} />
          <Tab label="Documentos" sx={{ fontSize: 'smaller', textTransform: 'capitalize' }} {...a11yProps(3)} />
          <Tab label="Permisos" sx={{ fontSize: 'smaller', textTransform: 'capitalize' }} {...a11yProps(4)} />
        </Tabs>
        <TabPanel value={valueSettings} index={0}>
            <h1>Añadir empresas</h1>
        </TabPanel>
        <TabPanel value={valueSettings} index={1}>
            <h1>Añadir periodos</h1>
        </TabPanel>
        <TabPanel value={valueSettings} index={2}>
            <h1>Añadir categorias</h1>
        </TabPanel>
        <TabPanel value={valueSettings} index={3}>
            <h1>Añadir documentos</h1>
        </TabPanel>
        <TabPanel value={valueSettings} index={4}>
            <h1>Añadir permisos</h1>
        </TabPanel>
    </div>
      
  );
}