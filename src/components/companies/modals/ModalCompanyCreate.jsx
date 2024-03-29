import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function ModalCompanyCreate({ open }) {
  const navigate = useNavigate();

  const showAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Empresa(s) Agregada(s) correctamente.",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleClick = () => {
    navigate("/empresas");
    showAlert();
  };
  return (
    <div>
      <Dialog open={open} maxWidth="xs">
        <DialogTitle>
          <Alert severity="success">
            La(s) <b>Empresa(s)</b> fue creada correctamente.
          </Alert>
        </DialogTitle>
        <DialogContent>
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
