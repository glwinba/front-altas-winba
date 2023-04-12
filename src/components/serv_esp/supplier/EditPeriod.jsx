import * as React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function EditPeriod() {
  const [checked, setChecked] = useState([true, false]);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked]);
  };

  const handleChange4 = (event) => {
    setChecked([checked[1], event.target.checked]);
  };


  const children = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      <FormControlLabel
        label="Octubre"
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="Noviembre"
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
      <FormControlLabel
        label="Diciembre"
        control={<Checkbox checked={checked[2]} onChange={handleChange4} />}
      />
    </Box>
  );
  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="2021" {...a11yProps(0)} />
        <Tab label="2022" {...a11yProps(1)} />
        <Tab label="2023" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <FormControlLabel
          label="2021"
          control={
            <Checkbox
              checked={checked[0] && checked[1] && checked[2]}
              indeterminate={checked[0] !== checked[2] || checked[0] !== checked[1]}
              onChange={handleChange1}
            />
          }
        />
        {children}
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
}

export default EditPeriod;
