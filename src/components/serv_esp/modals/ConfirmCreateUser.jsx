import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function ConfirmCreateUser({ open }) {
  const navigate = useNavigate();

  const showAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Usuario Proveedor Agregado correctamente",
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
            El Usuario <b>Proveedor</b> fue creado correctamente.
          </Alert>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ textAlign: "center" }}>
            <b>Nota:</b> Los accesos del Usuario fueron enviados al correo
            electrónico proporcionado.
          </DialogContentText>
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
