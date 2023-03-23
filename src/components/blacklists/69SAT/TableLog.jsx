import { Button } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { setLoading } from "../actions";

function TableLog() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const columns = [
    { name: "id", options: { filter: false, display: false } },
    { name: "hash", options: { filter: false } },
    { name: "CatalogoLista69SAT", options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              {value.nombreSupuesto}
            </>
          );
        },
      }, },
    {
      name: "ACCIONES",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
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

  const getData = () => {
    // dispatch(setLoading(true));

    axios
      .get("http://localhost:5000/api/historyBlackLists69SAT")
      .then((res) => {
        setData(res.data);
        //   dispatch(setLoading(false));
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <MUIDataTable
        title={"Historial Lista 69 SAT"}
        data={data}
        columns={columns}
        options={options}
        
      />
    </>
  );
}

export default TableLog;
