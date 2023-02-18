import React from "react";
import "./styles/login.css";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
function Login() {
  return (
    <>
      <div className="loginStyle">
        <div class="md:flex bg-white rounded-xl p-8 md:p-0 w-1/5 h-3/5">
          <div class="pt-6 md:p-8 text-center space-y-4 w-full">
            <div className="avatarLogin w-full">
              <Avatar sx={{ bgcolor: "#010101", width: 100, height: 100 }} src="../assets/Logo_Winba.png" />
            </div>
            <div className="inputsLogin">
              <div className="grid">
                <div className="col my-6">
                  <TextField
                    sx={{ m: 1, width: "100%" }}
                    id="standard-basic"
                    label="USUARIO"
                    variant="standard"
                    focused
                  />
                </div>
                <div className="col my-6">
                  <TextField
                    sx={{ m: 1, width: "100%" }}
                    id="standard-basic"
                    label="CONTRASEÑA"
                    variant="standard"
                    focused
                  />
                </div>
                <div className="col">
                  <Button variant="contained">
                    INICIAR SESION
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
