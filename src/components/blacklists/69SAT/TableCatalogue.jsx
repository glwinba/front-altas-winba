import { Button } from "@mui/material";
import MUIDataTable from "mui-datatables";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { setLoading } from "../actions";

function TableCatalogue() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const columns = [
    { name: "id", options: { filter: false, display: false } },
    { name: "nombreSupuesto", options: { filter: false } },
    { name: "url", options: { filter: false } },
    { name: "enable", options: { filter: false, display: false } },
    {
      name: "ACCIONES",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          if (tableMeta.rowData[3] === 1) {
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
                    console.log(tableMeta);
                  }}
                >
                  Eliminar
                </Button>
              </>
            );
          } else {
            return (
              <>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "green", marginX: "2px" }}
                  onClick={() => {
                    console.log(tableMeta);
                  }}
                >
                  Habilitar
                </Button>
              </>
            );
          }
            
          
          
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

  const getData = () => {
    // dispatch(setLoading(true));

    axios.get("http://localhost:3000/api/getcataloguelist69SAT").then((res) => {
        setData(res.data);
    //   dispatch(setLoading(false));
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <>
        <div className="flex flex-1 items-center justify-between">
          <div className="flex w-full justify-end">
            <div className="mb-4">
              <NavLink to="/crear-supuesto">
                <Button
                  color="success"
                  variant="contained"
                  endIcon={<PersonAddAltIcon />}
                >
                  Añadir Supuesto
                </Button>
              </NavLink>
            </div>
          </div>
        </div>

        <MUIDataTable
          title={"Catalogo Lista 69 SAT"}
          data={data}
          columns={columns}
          options={options}
        />
      </>
    </>
  );
}

export default TableCatalogue;
