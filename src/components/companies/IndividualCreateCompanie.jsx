import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../actions";
import Loading from "../Loading";

export default function IndividualCreateCompanie() {
  const [grupos, setGrupos] = useState([]);
  const [rfc, setRfc] = useState("");
  const [nombre, setNombre] = useState("");
  const [ciec, setCiec] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [grupocontratante, setGrupoContratante] = useState(grupos[0]);
  const loading = useSelector((state) => state.loading);

  
  const dispatch = useDispatch();

  const defaultOptions = {
    options: grupos.length > 0 ? grupos : [],
    getOptionLabel: (options) => options.nombre,
  };

  function getGrupos() {
    axios.get("http://127.0.0.1:5000/getGrupos").then((res) => {
      setGrupos(res.data);
      dispatch(setLoading(false));
    });
  }

  function createUser() {
    axios
      .post("http://127.0.0.1:5000/createuser", {
        // RFC: rfc,
        // PASS: password,
        // NOMBRE: razonsocial,
        // EMAIL: email,
        // EmpresaId: empresacontratante,
        // correocontratante1: correocontratante1,
        // correocontratante2: correocontratante2,
      })
      .then((res) => {
        console.log(res);
      });
  }

  useEffect(() => {
    dispatch(setLoading(true));
    getGrupos();
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
          <div className="mb-6">
            <div className="grid grid-cols-2">
              <TextField
                id="standard-basic"
                sx={{ m: 1 }}
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
                sx={{ m: 1 }}
                label="NOMBRE"
                variant="standard"
                focused
                value={nombre}
                onChange={(e) => {
                  setNombre(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-2">
              <TextField
                id="standard-basic"
                sx={{ m: 1 }}
                label="CIEC"
                variant="standard"
                focused
                value={ciec}
                onChange={(e) => {
                  setCiec(e.target.value);
                }}
              />
              <Autocomplete
                disablePortal
                {...defaultOptions}
                value={grupocontratante}
                multiple={false}
                sx={{ m: 1, width: "100%", paddingRight: "30px" }}
                onChange={(e, newValue) => {
                  setGrupoContratante(parseInt(newValue.id));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="GRUPO CONTRATANTE"
                    variant="standard"
                    focused
                  />
                )}
              />
            </div>
            <div className="grid grid-cols-1">
              <TextField
                id="outlined-multiline-static"
                label="COMENTARIOS"
                multiline
                rows={4}
                variant="standard"
                focused
                value={comentarios}
                onChange={(e) => {
                  setComentarios(e.target.value);
                }}
              />
            </div>
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
        </div>
      )}
    </>
  );
}