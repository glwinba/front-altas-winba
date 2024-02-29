import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import ModalGroupCreate from "./modals/ModalGroupCreate";

export default function IndividualCreateGroup() {
  const [nombre, setNombre] = useState("");
  const [comentarios, setComentarios] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const createGroup = () => {
    axios
      .post("http://127.0.0.1:3000/createGrupos", {
        nombre: nombre,
        comentarios: comentarios,
      })
      .then((res) => {
        setOpenModal(true);
        console.log(res);
      });
  };

  useEffect(() => {}, []);

  return (
    <>
      <div>
        <div className="mb-6">
          <div className="grid grid-cols-1">
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
            onClick={createGroup}
            className="w-full"
            variant="contained"
            color="primary"
            endIcon={<SaveIcon />}
          >
            Guardar
          </Button>
        </div>
      </div>
      <ModalGroupCreate
        open={openModal}
        grupo={nombre}
      />
    </>
  );
}
