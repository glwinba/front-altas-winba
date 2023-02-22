import { Button } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../actions";
import ApartmentIcon from '@mui/icons-material/Apartment';

function Grupos() {
  const [grupos, setGrupos] = useState([]);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);

  const columns = [
    { name: "id", options: { filter: false, display: false } },
    { name: "nombre", options: { filter: false } },
    { name: "comentarios", options: { filter: false } },
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

  const getGrupos = () => {
    dispatch(setLoading(true));

    axios.get("http://127.0.0.1:5000/getGrupos").then((res) => {
      setGrupos(res.data);
      dispatch(setLoading(false));
    });
  };

  useEffect(() => {
    getGrupos();
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
                    endIcon={<ApartmentIcon />}
                  >
                    Añadir Grupo
                  </Button>
                </NavLink>
              </div>
            </div>
          </div>

          <MUIDataTable
            title={"Lista de grupos"}
            data={grupos}
            columns={columns}
            options={options}
          />
        </>
      )}
    </>
  );
}

export default Grupos;
