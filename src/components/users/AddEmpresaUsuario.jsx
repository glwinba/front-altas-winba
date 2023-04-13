import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Swal from "sweetalert2";
import { useState } from "react";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useEffect } from "react";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function AddEmpresaUsuario({ open, handleCloseModal, user, getUserEmpresa }) {
  const [empresas, setEmpresas] = useState([]);
  const [empresacontratante, setEmpresacontratante] = useState(empresas[0]);

  const defaultOptions = {
    options: empresas.length > 0 ? empresas : [],
    getOptionLabel: (options) => options.nombre,
  };
  
  const showAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Empresa agregada correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  function getEmpresas() {
    axios.get("http://127.0.0.1:5000/empresasallselect").then((res) => {
      setEmpresas(res.data);
    });
  }

  const handleClick = async () => {
    console.log(user)
    console.log(empresacontratante)
    await axios.post(`http://localhost:5000/createoperatobyuserproveedor`, {
      usuario: user,
      EmpresaId: empresacontratante
    });
    getUserEmpresa();
    handleCloseModal();
    showAlert();

  };

  useEffect(() => {
    getEmpresas();
  }, []);

  return (
    <div>
      <Dialog open={open} maxWidth="s">
        <DialogTitle>Añadir empresa contratante.</DialogTitle>
        <DialogContent>
          <div className="mt-5">
            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              disableCloseOnSelect
              {...defaultOptions}
              onChange={(e, newValue) => {
                setEmpresacontratante(newValue);
              }}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.nombre}
                </li>
              )}
              style={{ width: 500 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Empresas"
                  placeholder="Añadir empresas"
                />
              )}
            />
          </div>
          <Button
            variant="contained"
            sx={{ marginTop: "2%" }}
            color="success"
            fullWidth
            onClick={handleClick}
          >
            Agregar
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
