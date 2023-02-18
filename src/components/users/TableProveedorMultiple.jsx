import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useEffect } from "react";
function createData(name = "", calories = 0, fat = 0, carbs = 0, protein = 0) {
  return { name, calories, fat, carbs, protein };
}

export default function TableMultipleProveedor() {
  const [dataProveedorMultiple, setDataProveedorMultiple] = useState([]);

  useEffect(() => {
    setDataProveedorMultiple([
      createData(
        "CRISTOPH RODRIGUEZ PRADO",
        "ROPC031223D62",
        "cristoph.2312@gmail.com"
      ),
      createData(
        "PEDRO RODRIGUEZ PRADO",
        "ROPP080105MD3",
        "pedro.05@gmail.com"
      ),
      createData(
        "MARIBEL RODRIGUEZ PRADO",
        "ROPM110818D61",
        "mari.2312@gmail.com"
      ),
    ]);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Razón Social</TableCell>
            <TableCell align="right">RFC</TableCell>
            <TableCell align="right">Correo</TableCell>
            <TableCell align="right">Opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataProveedorMultiple.map((row, index) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">
                <IconButton
                  sx={{ color: "red" }}
                  aria-label="delete"
                  size="small"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
