import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Swal from "sweetalert2";
import { useState } from "react";
import axios from "axios";

export default function UpdateRazonSocial({ open, email, id, handleCloseModal }) {
  const [newEmail, setNewEmail] = useState("");

  const showAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Correo actualizado correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleClick = async () => {
    await axios.put(`http://localhost:5000/updateEmail/${id}`, {
        EMAIL: newEmail
    });
    handleCloseModal();
    showAlert();
  };
  return (
    <div>
      <Dialog open={open} maxWidth="xs">
        <DialogTitle>ACTUALIZAR CORREO ELECTRONICO</DialogTitle>
        <DialogContent>
          <div className="mt-5">
            <TextField
              label="EMAIL ACTUAL"
              variant="outlined"
              fullWidth
              sx={{ marginY: "8px" }}
              InputProps={{
                readOnly: true,
              }}
              color="primary"
              focused
              value={email}
            />
            <TextField
              label="EMAIL NUEVO"
              variant="outlined"
              fullWidth
              sx={{ marginY: "8px" }}
              color="primary"
              focused
              value={newEmail}
              onChange={(e) => {
                setNewEmail(e.target.value);
              }}
            />
          </div>
          <Button
            variant="contained"
            sx={{ marginTop: "2%" }}
            color="success"
            fullWidth
            onClick={handleClick}
          >
            Actualizar
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
