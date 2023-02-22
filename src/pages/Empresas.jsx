import { Button } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../actions";
import BusinessIcon from '@mui/icons-material/Business';

function Empresas() {
  const [empresas, setEmpresas] = useState([]);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);

  const columns = [
    { name: "id", options: { filter: false, display: false } },
    { name: "rfc", options: { filter: false } },
    { name: "nombre", options: { filter: false } },
    { name: "GrupoId", options: { filter: false } },
    {
      name: "ACCIONES",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <NavLink to={"/updateuser/" + tableMeta.rowData[0]}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginX: "2px" }}
                >
                  Editar
                </Button>
              </NavLink>
              
              <Button
                variant="contained"
                sx={{ backgroundColor: "red", marginX: "2px" }}
                onClick={() => {
                  console.log(tableMeta.rowData[0]);
                }}
              >
                Eliminar
              </Button>
            </>
          );
        },
      },
    },
  ];

  const options = {
    tableBodyMaxHeight: "auto",
    download: false,
    viewColumns: false,
    filter: false,
    print: false,
    selectableRows: "none",
  };

  const getEmpresa = () => {
    dispatch(setLoading(true));

    axios.get("http://127.0.0.1:5000/getEmpresas").then((res) => {
      setEmpresas(res.data);
      dispatch(setLoading(false));
    });
  };

  useEffect(() => {
    getEmpresa();
  }, []);

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Loading />
        </div>
      ) : (
        <>
          <div className="flex flex-1 items-center justify-between">
            <div className="flex w-full justify-end">
              <div className="mb-4">
                <NavLink to="/createusers">
                  <Button
                    color="success"
                    variant="contained"
                    endIcon={<BusinessIcon />}
                  >
                    Añadir Empresa
                  </Button>
                </NavLink>
              </div>
            </div>
          </div>

          <MUIDataTable
            title={"Lista de empresas"}
            data={empresas}
            columns={columns}
            options={options}
          />
        </>
      )}
    </>
  );
}

export default Empresas;
