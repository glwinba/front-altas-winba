import { Button } from "@mui/material";
import MUIDataTable from "mui-datatables";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../actions";

function Users() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);

  const columns = [
    { name: "NOMBREUSUARIO", options: { filter: false } },
    { name: "NOMBRE", options: { filter: false } },
    { name: "EMAIL", options: { filter: false } },
    {
      name: "ACCIONES",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginX: "2px" }}
                onClick={() => {
                  alert("Hola mundos");
                }}
              >
                Editar
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: "red", marginX: "2px" }}
                onClick={() => {
                  alert("Hola mundos");
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

  const getUsers = () => {
    dispatch(setLoading(true));

    axios.get("http://127.0.0.1:5000/getUsers").then((res) => {
      setUsers(res.data);
      dispatch(setLoading(false));
    });
  };

  useEffect(() => {
    getUsers();
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
                    endIcon={<PersonAddAltIcon />}
                  >
                    Añadir Usuario
                  </Button>
                </NavLink>
              </div>
            </div>
          </div>

          <MUIDataTable
            title={"Lista de usuarios"}
            data={users}
            columns={columns}
            options={options}
          />
        </>
      )}
    </>
  );
}

export default Users;
