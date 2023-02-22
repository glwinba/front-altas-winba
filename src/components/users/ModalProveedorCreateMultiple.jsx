import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import TableMultipleProveedor from "./TableProveedorMultiple";

export default function ModalProveedorCreateMultiple({ open }) {
  const navigate = useNavigate();

  const showAlert = () => {
    Swal.fire({
      // position: "top-end",
      icon: "success",
      title: "Usuarios Agregados correctamente",
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
      <Dialog open={open} maxWidth="s">
        <DialogTitle>
          <Alert severity="success">
            Los Usuarios <b>Proveedores</b> fueron creados correctamente.
          </Alert>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ textAlign: "center" }}>
            <b>Nota:</b> Los accesos de los Usuario fueron enviados a los correos
            electrónicos proporcionados.
          </DialogContentText>
          <div className="mt-5">
            <TableMultipleProveedor opciones={false}/>
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
