import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import MasDetalles from "../../users/MasDetalles";
import { useDispatch, useSelector } from "react-redux";
import { setDataUsers, setLoading } from "../../../actions";
import Loading from "../../Loading";
import ConfirmCreateUser from "../modals/ConfirmCreateUser";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
} from "@mui/material";
import BackupIcon from "@mui/icons-material/Backup";

export default function Cliente() {
  const [empresas, setEmpresas] = useState([]);
  const [rfc, setRfc] = useState("");
  const [email, setEmail] = useState("");
  const [razonsocial, setRazonsocial] = useState("");
  const [empresacontratante, setEmpresacontratante] = useState(empresas[0]);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const dataUsers = useSelector((state) => state.data_users);
  const loading = useSelector((state) => state.loading);
  const [boolSendEmail, setBoolSendEmail] = useState(false);
  const [masive, setMasive] = useState(false);
  const [fileData, setFileData] = useState(null);

  const defaultOptions = {
    options: empresas.length > 0 ? empresas : [],
    getOptionLabel: (options) => options.nombre,
  };

  function getEmpresas() {
    axios.get("http://127.0.0.1:3000/empresasallselect").then((res) => {
      setEmpresas(res.data);
      dispatch(setLoading(false));
    });
  }

  const extractDataExcel = async () => {
    dispatch(setLoading(true));

    const dataExcel = await axios.post(
      "http://127.0.0.1:3000/extractdataexcel",
      {
        file: fileData,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch(setDataUsers(dataExcel.data));
    dispatch(setLoading(false));
  };

  function createUserCliente() {
    dispatch(setLoading(true));

    if (masive) {
      axios
        .post("http://127.0.0.1:3000/createusercustomer", {
          dataExcel: dataUsers,
          EmpresaId: empresacontratante,
          sendMail: boolSendEmail,
        })
        .then((res) => {
          dispatch(setLoading(false));
          setOpenModal(true);
        });
    } else {
      axios
        .post("http://127.0.0.1:3000/createusercustomer", {
          RFC: rfc,
          NOMBRE: razonsocial,
          EMAIL: email,
          EmpresaId: empresacontratante,
          sendMail: boolSendEmail,
        })
        .then((res) => {
          dispatch(setLoading(false));
          setOpenModal(true);
        });
    }
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
          <div>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={masive}
                    onChange={(e) => {
                      setMasive(e.target.checked);
                    }}
                  />
                }
                label="Inserción Masiva"
              />
            </FormGroup>
          </div>
          {masive ? (
            <>
              <div>
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
                <Button variant="contained" onClick={extractDataExcel}>
                  Cargar
                </Button>
              </div>
            </>
          ) : (
            <>
              <div>
                <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
                  <TextField
                    id="standard-basic"
                    sx={{ m: 1, width: "25ch" }}
                    label="RFC"
                    variant="standard"
                    focused
                    value={rfc}
                    onChange={(e) => {
                      setRfc(e.target.value);
                    }}
                    autoFocus
                  />

                  <TextField
                    id="standard-basic"
                    sx={{ m: 1, width: "25ch" }}
                    label="CORREO ELECTRONICO"
                    variant="standard"
                    focused
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />

                  <div className="col lg:col-span-2 md:col-span-1">
                    <TextField
                      sx={{ m: 1, width: "100%" }}
                      id="standard-basic"
                      label="RAZON SOCIAL"
                      variant="standard"
                      focused
                      value={razonsocial}
                      onChange={(e) => {
                        setRazonsocial(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="grid grid-cols-1">
            <Autocomplete
              disablePortal
              {...defaultOptions}
              value={empresacontratante}
              multiple={false}
              sx={{ m: 1, width: "100%" }}
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
          <div>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={boolSendEmail}
                    onChange={(e) => {
                      setBoolSendEmail(e.target.checked);
                    }}
                  />
                }
                label="Enviar Correo"
              />
            </FormGroup>
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
              <AccordionDetails>
                <MasDetalles />
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="w-full m-1">
            <Button
              onClick={createUserCliente}
              className="w-full"
              variant="contained"
              color="primary"
              endIcon={<SaveIcon />}
            >
              Guardar
            </Button>
          </div>

          <ConfirmCreateUser open={openModal} />
        </div>
      )}
    </>
  );
}
