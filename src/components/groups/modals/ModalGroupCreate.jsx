import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function ModalGroupCreate({ open, grupo }) {
  const navigate = useNavigate();

  const showAlert = () => {
    Swal.fire({
      // position: "top-end",
      icon: "success",
      title: "Grupo Agregado correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleClick = () => {
    navigate("/grupos");
    showAlert();
  };
  return (
    <div>
      <Dialog open={open} maxWidth="xs">
        <DialogTitle>
          <Alert severity="success">
            El <b>Grupo</b> fue creado correctamente.
          </Alert>
        </DialogTitle>
        <DialogContent>
          <div className="mt-5">
            <TextField
              label="NOMBRE"
              variant="outlined"
              fullWidth
              sx={{ marginY: "8px" }}
              InputProps={{
                readOnly: true,
              }}
              color="primary"
              focused
              value={grupo}
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
