import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function ClienteCreate({ open, nombre, password }) {
  const navigate = useNavigate();

  const showAlert = () => {
    Swal.fire({
      // position: "top-end",
      icon: "success",
      title: "Usuario Cliente agregado correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleClick = () => {
    navigate("/users");
    showAlert();
  };
  return (
    <div>
      <Dialog open={open} maxWidth="xs">
        <DialogTitle>
          <Alert severity="success">
            El Usuario <b>Cliente</b> fue creado correctamente.
          </Alert>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ textAlign: "center" }}>
            <b>Nota:</b> Los accesos del Usuario seran enviado hasta el contacto comercia autorice.
          </DialogContentText>
          <div className="mt-5">
            <TextField
              label="USUARIO"
              variant="outlined"
              fullWidth
              sx={{ marginY: "8px" }}
              InputProps={{
                readOnly: true,
              }}
              color="primary"
              focused
              value={nombre}
            />
            <TextField
              label="CONTRASEÑA"
              variant="outlined"
              fullWidth
              sx={{ marginY: "8px" }}
              InputProps={{
                readOnly: true,
              }}
              color="primary"
              focused
              value={password}
            />
          </div>
          <Button
            variant="contained"
            sx={{ marginTop: "2%" }}
            color="success"
            fullWidth
            onClick={handleClick}
          >
            Aceptar
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
