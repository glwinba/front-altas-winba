import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Proveedor from "../components/users/Proveedor";
import { useState } from "react";
import Admin from "../components/serv_esp/admin/Admin";
import Cliente from "../components/serv_esp/customers/Cliente";

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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function CreateUsers() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 2, borderColor: "rgb(229, 231, 235)" }}>
        <div className="title-main">INSERTAR USUARIOS</div>

        <Tabs
          sx={{ paddingLeft: "5%" }}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="Proveedor"
            sx={{ fontSize: "smaller", textTransform: "capitalize" }}
            {...a11yProps(0)}
          />
          <Tab
            label="Cliente"
            sx={{ fontSize: "small", textTransform: "capitalize" }}
            {...a11yProps(1)}
          />
          <Tab
            label="Administrador"
            sx={{ fontSize: "small", textTransform: "capitalize" }}
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Proveedor />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Cliente />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Admin />
      </TabPanel>
    </Box>
  );
}
