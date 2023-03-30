import { Button } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../actions";
import BusinessIcon from "@mui/icons-material/Business";

function Empresas() {
  const [empresas, setEmpresas] = useState([]);
  const dispatch = useDispatch();

  const columns = [
    { name: "id", options: { filter: false, display: false } },
    { name: "rfc", options: { filter: false } },
    { name: "nombre", options: { filter: false } },
    {
      name: "Grupo",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <>{value.nombre}</>;
        },
      },
    },
    {
      name: "ACCIONES",
      options: {
        filter: false,
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
                  console.log(value);
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
      <div className="flex flex-1 items-center justify-between">
        <div className="flex w-full justify-end">
          <div className="mb-4">
            <NavLink to="/createcompanies">
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
  );
}

export default Empresas;
