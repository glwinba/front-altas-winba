import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";

export default function InputAdornments() {
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  function generatePassword(params) {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let pass = "";

    for (let i = 0; i < 10; i++) {
      pass += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }

    let concatenar = pass.replace(pass[Math.round(Math.random() * 9)], "@");
    return concatenar;
  }

  const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
  ];

  useEffect(() => {
    setPassword(generatePassword());
  }, []);

  return (
    <div>
      <div>
        <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-4">
          <div className="col">
            <TextField
              id="standard-basic"
              sx={{ m: 1, width: "25ch" }}
              label="RFC"
              variant="standard"
              color="secondary"
              focused
              autoFocus
            />
          </div>

          <div className="col">
            <TextField
              id="standard-basic"
              sx={{ m: 1, width: "25ch" }}
              label="CORREO ELECTRONICO"
              color="secondary"
              variant="standard"
              focused
            />
          </div>

          <div className="col col-span-2">
            <TextField
              sx={{ m: 1, width: "100%" }}
              id="standard-basic"
              label="RAZON SOCIAL"
              color="secondary"
              variant="standard"
              focused
            />
          </div>
        </div>
        <div className="grid grid-cols-4">
          <div className="col col-span-3">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={top100Films}
              sx={{ m: 1, width: "100%", paddingRight: '30px' }}
              renderInput={(params) => (
                <TextField {...params} label="EMPRESA CONTRATANTE" variant="standard" focused color="secondary"/>
              )}
            />
          </div>

          <div className="col">
            <TextField
              sx={{ m: 1, width: "100%" }}
              id="standard-basic"
              label="CONTRASEÑA"
              color="secondary"
              variant="standard"
              focused
              value={password}
              disabled
            />
          </div>
        </div>
      </div>
      <div>
        <Accordion sx={{ m: 1, width: "100%" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            Configuraciones Avanzadas
          </AccordionSummary>
          <AccordionDetails></AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}
