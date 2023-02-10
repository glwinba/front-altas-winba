import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";

export default function ModalProveedorCreate({ open, rfc, password }) {
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
              value={rfc}
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
          >
            Aceptar
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
