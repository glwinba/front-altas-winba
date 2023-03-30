import { Button } from "@mui/material";
import MUIDataTable from "mui-datatables";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../actions";

function Users() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const columns = [
    { name: "UUID", options: { filter: false, display: false } },
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

  const getUsers = () => {
    dispatch(setLoading(true));

    axios.get("http://127.0.0.1:5000/getUsers").then((res) => {
      setUsers(res.data);
      dispatch(setLoading(false));
    });
  };

  useEffect(() => {
    dispatch(setLoading(true));

    getUsers();

    dispatch(setLoading(false));
  }, []);

  return (
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
  );
}

export default Users;
