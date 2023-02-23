import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserData } from "../../actions";
import { Button } from "@mui/material";
import { useEffect } from "react";

export default function TableMultipleProveedor({ opciones, dataUsers }) {
  const dispatch = useDispatch();

  const deleteUser = (user) => {
    dispatch(deleteUserData(user));
  }

  useEffect(() => {
    
  }, [])
  

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Razón Social</TableCell>
            <TableCell align="right">RFC</TableCell>
            <TableCell align="right">Correo</TableCell>
            {opciones ? <TableCell align="right">Opciones</TableCell> : <></>}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataUsers.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.RAZONSOCIALPROVEEDOR}
              </TableCell>
              <TableCell align="right">{row.RFCPROVEEDOR}</TableCell>
              <TableCell align="right">{row.EMAIL}</TableCell>
              {opciones ? (
                <TableCell align="right">
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "red", marginX: "2px" }}
                    onClick={() => {
                      deleteUser(row.RFCPROVEEDOR)
                    }}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              ) : (
                <></>
               )} 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
