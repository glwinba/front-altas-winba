import { Button } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import UpdateEmail from "../components/users/UpdateEmail";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import UpdateRazonSocial from "../components/users/UpdateRazonSocial";
import AddEmpresaUsuario from "../components/users/AddEmpresaUsuario";

function Updateuser() {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [empresas, setEmpresas] = useState([]);
  const [empresaModal, setEmpresaModal] = useState(false);

  function getUser() {
    axios.get(`http://127.0.0.1:5000/getUser/${id}`).then((res) => {
      setUser(res.data);
    });
  }

  function getUserEmpresa() {
    axios.get(`http://127.0.0.1:5000/getuserempresa/${id}`).then((res) => {
      setEmpresas(res.data);
    });
  }

  useEffect(() => {
    getUser();
    getUserEmpresa();
  }, []);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleAddEmpresaModal = () => {
    setEmpresaModal(true);
  };

  const handleCloseAddEmpresaModal = () => {
    setEmpresaModal(false);
  };

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {user.NOMBRE}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{user.EMAIL}</p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-6">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                height: "100%",
              }}
            >
              RAZON SOCIAL
            </div>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <div className="flex flex-1 items-center justify-between">
                {user.NOMBRE}

                <div className="flex w-full justify-end">
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginX: "2px" }}
                  >
                    Editar
                  </Button>
                </div>
              </div>
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">USUARIO</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {user.NOMBREUSUARIO}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                CORREO ELECTRONICO
              </div>
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <div className="flex flex-1 items-center justify-between">
                {user.EMAIL}
                <div className="flex w-full justify-end">
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginX: "2px" }}
                    onClick={handleOpenModal}
                  >
                    Editar
                  </Button>
                </div>
              </div>
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                CONTRASEÑA
              </div>
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <div className="flex flex-1 items-center justify-between">
                **********
                <div className="flex w-full justify-end">
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginX: "2px" }}
                  >
                    Editar
                  </Button>
                </div>
              </div>
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              EMPRESAS CONTRATANTES
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <div className="flex flex-1 items-center justify-between">
                <div className="flex w-full justify-end">
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<AddBusinessIcon />}
                    sx={{ marginX: "2px", marginBottom: "2%" }}
                    onClick={handleAddEmpresaModal}
                  >
                    Agregar Empresa
                  </Button>
                </div>
              </div>
              <ul
                role="list"
                className="divide-y divide-gray-200 rounded-md border border-gray-200"
              >
                {empresas.map((empresa) => (
                  <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                    <div className="flex w-0 flex-1 items-center">
                      <ApartmentIcon />
                      <span className="ml-2 w-0 flex-1 truncate">
                        {empresa.Empresa.nombre}
                      </span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginX: "2px" }}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "red", marginX: "2px" }}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
      <UpdateEmail
        open={openModal}
        email={user.EMAIL}
        id={id}
        getUser={getUser}
        handleCloseModal={handleCloseModal}
      />
      <UpdateRazonSocial />
      <AddEmpresaUsuario 
      open={empresaModal}
      user={user}
      handleCloseModal={handleCloseAddEmpresaModal}
      getUserEmpresa={getUserEmpresa}
      />
    </div>
  );
}

export default Updateuser;
