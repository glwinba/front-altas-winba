import IconButton from "@mui/material/IconButton";
import { FormLabel } from "@mui/material";
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
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import { setDataUsers, setLoading } from "../../actions";
import ModalProveedorCreateMultiple from "./ModalProveedorCreateMultiple";

export default function ProveedorMultiple() {
  const [empresas, setEmpresas] = useState([]);
  const [empresacontratante, setEmpresacontratante] = useState(empresas[0]);
  const [openModal, setOpenModal] = useState(false);
  const [fileData, setFileData] = useState(null);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const dataUsers = useSelector((state) => state.data_users);


  const defaultOptions = {
    options: empresas.length > 0 ? empresas : [],
    getOptionLabel: (options) => options.nombre,
  };

  function getEmpresas() {
    axios.get("http://127.0.0.1:5000/empresasallselect").then((res) => {
      setEmpresas(res.data);
      dispatch(setLoading(false));
    });
  }

  function createUserMasive(e) {
    e.preventDefault();

    axios
      .post(
        "http://127.0.0.1:5000/createusermasive",
        {
          dataExcel: dataUsers,
          EmpresaId: empresacontratante,
        }
      )
      .then((res) => {
        console.log(res);
        setOpenModal(true);
      });
  }

  async function readExcel(){
    dispatch(setLoading(true));

    const dataExcel = await axios
      .post(
        "http://127.0.0.1:5000/readExcel",
        {
          file: fileData
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(setDataUsers(dataExcel.data))
    dispatch(setLoading(false));

    
  }

  

  useEffect(() => {
    dispatch(setLoading(true));
    getEmpresas();
  }, []);

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Loading />
        </div>
      ) : (
        <div>
          <form>
            <FormLabel>Ingres tu archivo excel: </FormLabel>

            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                type="file"
                name="file"
                onChange={(e) => {
                  setFileData(e.target.files[0]);
                }}
              />
              <BackupIcon />
            </IconButton>
            <Button variant="contained" onClick={readExcel}>Cargar</Button>
            <div className="my-10">
              <TableMultipleProveedor opciones={true} dataUsers={dataUsers}/>

            </div>
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
      )}
      <ModalProveedorCreateMultiple open={openModal}/>
    </>
  );
}
