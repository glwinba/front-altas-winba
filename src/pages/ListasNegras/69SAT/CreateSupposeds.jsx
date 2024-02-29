import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import { Box } from "@mui/material";
import ConfirmCreateSupposed from "../../../components/blacklists/69SAT/modals/ConfirmCreateSupposed";

export default function CreateSupposeds() {
  const [nombreSupuesto, setNombreSupuesto] = useState("");
  const [url, setUrl] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const createSupposed = () => {
    axios
      .post("http://127.0.0.1:3000/api/createSupposed", {
        nombreSupuesto: nombreSupuesto,
        url: url
      })
      .then((res) => {
        setOpenModal(true);
      });
  };

  return (
    <>
      <Box
        sx={{
          borderBottom: 2,
          borderColor: "rgb(229, 231, 235)",
          paddingBottom: "10px",
          marginBottom: 2,
        }}
      >
        <div className="title-main">CREAR SUPUESTO</div>
      </Box>
      <div>
        <div className="mb-6">
          <div className="grid grid-cols-1">
            <TextField
              id="standard-basic"
              sx={{ m: 1 }}
              label="NOMBRE SUPUESTO"
              variant="standard"
              focused
              value={nombreSupuesto}
              onChange={(e) => {
                setNombreSupuesto(e.target.value);
              }}
              autoFocus
            />

            <TextField
              id="standard-basic"
              sx={{ m: 1 }}
              label="URL"
              variant="standard"
              focused
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
              autoFocus
            />
          </div>
        </div>

        <div className="w-full m-1">
          <Button
            onClick={createSupposed}
            className="w-full"
            variant="contained"
            color="primary"
            endIcon={<SaveIcon />}
          >
            Guardar
          </Button>
        </div>
      </div>
      <ConfirmCreateSupposed
        open={openModal}
        nombre={nombreSupuesto}
      />
    </>
  );
}
