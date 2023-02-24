import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Swal from "sweetalert2";
import { useState } from "react";
import axios from "axios";

export default function UserDataModal({ open, userDataSelect }) {
    
  const showAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Correo actualizado correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  //   const handleClick = async () => {
  //     await axios.put(`http://localhost:5000/updateEmail/${id}`, {
  //         EMAIL: newEmail
  //     });
  //     handleCloseModal();
  //     getUser();
  //     showAlert();
  //   };

  return (
    <div>
      <Dialog open={open} maxWidth="xs">
        <DialogTitle>Actualizar Correo</DialogTitle>
        <DialogContent>
          <div className="mt-5">
            <TextField
              label="RFC"
              variant="outlined"
              fullWidth
              sx={{ marginY: "8px" }}
              InputProps={{
                readOnly: true,
              }}
              color="primary"
              focused
              value={userDataSelect.RFCPROVEEDOR}
            />
            <TextField
              label="CORREO"
              variant="outlined"
              fullWidth
              sx={{ marginY: "8px" }}
              color="primary"
              focused
              value={userDataSelect.EMAIL}

              //   value={newEmail}
              //   onChange={(e) => {
              //     setNewEmail(e.target.value);
              //   }}
            />
            <TextField
              label="RAZÓN SOCIAL"
              variant="outlined"
              fullWidth
              sx={{ marginY: "8px" }}
              color="primary"
              focused
              value={userDataSelect.RAZONSOCIALPROVEEDOR}

              //   value={newEmail}
              //   onChange={(e) => {
              //     setNewEmail(e.target.value);
              //   }}
            />
          </div>
          <Button
            variant="contained"
            sx={{ marginTop: "2%" }}
            color="success"
            fullWidth
            // onClick={handleClick}
          >
            Actualizar
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
