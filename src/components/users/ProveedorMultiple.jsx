import IconButton from "@mui/material/IconButton";
import { FormLabel, TableContainer } from "@mui/material";
import BackupIcon from "@mui/icons-material/Backup";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TableMultipleProveedor from "./TableProveedorMultiple";
import { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect } from "react";


export default function ProveedorMultiple() {
  const [empresas, setEmpresas] = useState([]);
  const [empresacontratante, setEmpresacontratante] = useState(empresas[0]);
  const [fileData, setFileData] = useState(null);

  const defaultOptions = {
    options: empresas.length > 0 ? empresas : [],
    getOptionLabel: (options) => options.nombre,
  };

  function getEmpresas() {
    axios.get("http://127.0.0.1:5000/empresasallselect").then((res) => {
      setEmpresas(res.data);
    });
  }

  function createUserMasive(e) {

    e.preventDefault();


    axios
      .post("http://127.0.0.1:5000/createusermasive", {
        file: fileData,
        EmpresaId: empresacontratante
      }, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then((res) => {
        console.log(res);
      });
  }

  useEffect(() => {
    getEmpresas();
  }, []);
  return (
    <div>
      <form>
      <FormLabel>Ingres tu archivo excel: </FormLabel>

        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <input hidden type="file" name="file" onChange={(e) => {setFileData(e.target.files[0])}}/>
          <BackupIcon />
        </IconButton>
        {/* <div className="my-10">
        <TableMultipleProveedor/>
      </div> */}
        <div className="grid">
          <div className="col">
            <Autocomplete
              disablePortal
              {...defaultOptions}
              value={empresacontratante}
              multiple={false}
              sx={{ m: 1, width: "100%", paddingRight: "30px" }}
              onChange={(e, newValue) => {
                setEmpresacontratante(parseInt(newValue.id));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="EMPRESA CONTRATANTE"
                  variant="standard"
                  focused
                />
              )}
            />
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
        <div className="w-full m-1">
          <Button
            onClick={createUserMasive}
            className="w-full"
            variant="contained"
            color="primary"
            endIcon={<SaveIcon />}
            type="submit"
          >
            Guardar
          </Button>
        </div>
      </form>
    </div>
  );
}
