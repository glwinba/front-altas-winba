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
import ModalProveedorCreate from "./ModalProveedorCreate";
import MasDetalles from "./MasDetalles";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../actions";
import Loading from "../Loading";

export default function Proveedor() {
  const [password, setPassword] = useState("");
  const [empresas, setEmpresas] = useState([]);
  const [rfc, setRfc] = useState("");
  const [email, setEmail] = useState("");
  const [razonsocial, setRazonsocial] = useState("");
  const [empresacontratante, setEmpresacontratante] = useState(empresas[0]);
  const [openModal, setOpenModal] = useState(true);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);

  const defaultOptions = {
    options: empresas.length > 0 ? empresas : [],
    getOptionLabel: (options) => options.nombre,
  };

  function generatePassword() {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let pass = "";

    for (let i = 0; i < 10; i++) {
      pass += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }

    let concatenar = pass.replace(pass[Math.round(Math.random() * 9)], "@");
    return concatenar;
  }

  function getEmpresas() {
    axios.get("http://127.0.0.1:5000/empresasallselect").then((res) => {
      setEmpresas(res.data);
      dispatch(setLoading(false));
    });
  }

  function createUser() {
    axios
      .post("http://127.0.0.1:5000/createuser", {
        RFC: rfc,
        PASS: password,
        NOMBRE: razonsocial,
        EMAIL: email,
        EmpresaId: empresacontratante,
      })
      .then((res) => {
        setOpenModal(true);
        console.log(res);
      });
  }

  useEffect(() => {
    dispatch(setLoading(true));

    setPassword(generatePassword());
    getEmpresas();
  }, []);

  // Cerrar Modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
            <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-4">
              <div className="col">
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
              </div>

              <div className="col">
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
              </div>

              <div className="col col-span-2">
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
            <div className="grid grid-cols-4">
              <div className="col col-span-3">
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

              <div className="col">
                <TextField
                  sx={{ m: 1, width: "100%" }}
                  id="standard-basic"
                  label="CONTRASEÑA"
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
              <AccordionDetails>
                <MasDetalles />
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="w-full m-1">
            <Button
              onClick={createUser}
              className="w-full"
              variant="contained"
              color="primary"
              endIcon={<SaveIcon />}
            >
              Guardar
            </Button>
          </div>

          <ModalProveedorCreate
            open={openModal}
            rfc={`CCO-${rfc}`}
            password={password}
          />
        </div>
      )}
    </>
  );
}
