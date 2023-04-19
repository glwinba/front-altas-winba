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
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
} from "@mui/material";
import BackupIcon from "@mui/icons-material/Backup";
import ConfirmCreateUser from "../modals/ConfirmCreateUser";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function Admin() {
  const [empresas, setEmpresas] = useState([]);
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [empresacontratante, setEmpresacontratante] = useState(empresas[0]);
  const dataUsers = useSelector((state) => state.data_users);
  const loading = useSelector((state) => state.loading);
  const [openModal, setOpenModal] = useState(false);
  const [boolSendEmail, setBoolSendEmail] = useState(true);
  const [masive, setMasive] = useState(false);
  const [fileData, setFileData] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [permissionsSelect, setPermissionsSelect] = useState([]);

  const dispatch = useDispatch();

  const defaultOptions = {
    options: empresas.length > 0 ? empresas : [],
    getOptionLabel: (options) => options.nombre,
  };

  const defaultOptionsPermission = {
    options: permissions.length > 0 ? permissions : [],
    getOptionLabel: (options) => options.Nombre,
  };

  const getEmpresas = async () => {
    const data = await axios.get("http://127.0.0.1:5000/empresasallselect");
    setEmpresas(data.data);
  };

  const getPermission = async () => {
    const res = await axios.get("http://127.0.0.1:5000/getpermission");
    setPermissions(res.data);
  };

  const extractDataExcel = async () => {
    dispatch(setLoading(true));

    const dataExcel = await axios.post(
      "http://127.0.0.1:5000/extractdataexcel",
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

  const createUserAdmin = async () => {
    dispatch(setLoading(true));
    if (masive) {
      await axios.post("http://127.0.0.1:5000/createuseradmin", {
        dataExcel: dataUsers,
        EmpresaId: empresacontratante,
        sendMail: boolSendEmail,
        permissions: permissionsSelect
      });
      dispatch(setLoading(false));
      setOpenModal(true);
    } else {
      await axios.post("http://127.0.0.1:5000/createuseradmin", {
        EMAIL: email,
        NOMBRE: nombre,
        EmpresaId: empresacontratante,
        sendMail: boolSendEmail,
        permissions: permissionsSelect
      });
      dispatch(setLoading(false));
      setOpenModal(true);
    }
  };

  useEffect(() => {
    dispatch(setLoading(true));
    getEmpresas();
    getPermission();
    dispatch(setLoading(false));
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
            <div className="grid md:grid-cols-1 lg:grid-cols-2">
              <TextField
                id="standard-basic"
                sx={{ m: 1 }}
                label="NOMBRE"
                variant="standard"
                focused
                value={nombre}
                onChange={(e) => {
                  setNombre(e.target.value);
                }}
                autoFocus
              />
              <TextField
                id="standard-basic"
                sx={{ m: 1 }}
                label="CORREO ELECTRONICO"
                variant="standard"
                focused
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          )}
          <div className="grid grid-cols-2">
            <Autocomplete
              disablePortal
              {...defaultOptions}
              value={empresacontratante}
              multiple={false}
              sx={{ m: 1 }}
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

            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              disableCloseOnSelect
              sx={{ m: 1 }}
              {...defaultOptionsPermission}
              onChange={(e, newValue) => {
                setPermissionsSelect(newValue);
              }}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.Nombre}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="PERMISOS"
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
              onClick={createUserAdmin}
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
