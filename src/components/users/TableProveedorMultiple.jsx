import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserData, editUserData } from "../../actions";
import { Button } from "@mui/material";
import { useEffect } from "react";
import UserDataModal from "./modals/UserDataModal";
import { useState } from "react";

export default function TableMultipleProveedor({ opciones, dataUsers }) {
  const [openModal, setOpenModal] = useState(false);
  const [userDataSelect, setUserDataSelect] = useState({});
  const dispatch = useDispatch();

  const deleteUser = (user) => {
    dispatch(deleteUserData(user));
  };

  const editUser = () => {
    dispatch(editUserData());
  };

  const openModalEditUserData = (user, index) => {
    console.log(index);
    setUserDataSelect(user);
    setOpenModal(true);
  };

  useEffect(() => {}, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Razón Social</TableCell>
              <TableCell align="right">RFC</TableCell>
              <TableCell align="right">Correo</TableCell>
              <TableCell align="right">Area Servicio</TableCell>
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
                <TableCell align="right">{row.MAILPROVEEDOR}</TableCell>
                <TableCell align="right">{row.AREASERVICIO}</TableCell>
                {opciones ? (
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "red", marginX: "2px" }}
                      onClick={() => {
                        deleteUser(row.RFCPROVEEDOR);
                      }}
                    >
                      Eliminar
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ marginX: "2px" }}
                      onClick={() => {
                        openModalEditUserData(row, index);
                      }}
                    >
                      Editar
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
      <UserDataModal open={openModal} userDataSelect={userDataSelect} />
    </>
  );
}
