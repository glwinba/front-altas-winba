import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../actions";
import ModalCompanyCreate from "./modals/ModalCompanyCreate";
import Loading from "../Loading";

export default function CreateCategoryCompanie() {
  const [companies, setCompanies] = useState([]);
  const [companieSelect, setCompanieSelect] = useState(companies[0]);
  const [openModal, setOpenModal] = useState(false);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  const defaultOptions = {
    options: companies.length > 0 ? companies : [],
    getOptionLabel: (options) => options.nombre,
  };

  const getCompanies = async () => {
    const res = await axios.get("http://127.0.0.1:3000/getEmpresas");
    setCompanies(res.data);
  };

  const createCompanyBaja = async () => {
    dispatch(setLoading(true));

    await axios.post("http://127.0.0.1:3000/createcompanybaja", {
      companieSelect: companieSelect,
    });
    dispatch(setLoading(false));
    setOpenModal(true);
  };
  useEffect(() => {
    dispatch(setLoading(true));
    getCompanies();
    dispatch(setLoading(false));
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
        <div>
          <div className="grid grid-cols-1">
            <Autocomplete
              disablePortal
              {...defaultOptions}
              value={companieSelect}
              multiple={false}
              sx={{ m: 1 }}
              onChange={(e, newValue) => {
                setCompanieSelect(parseInt(newValue.id));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="EMPRESA CONTRATANTE"
                  variant="standard"
                  focused
                />
              )}
            />
          </div>
          <div className="w-full m-1">
            <Button
              onClick={createCompanyBaja}
              className="w-full"
              variant="contained"
              color="primary"
              endIcon={<SaveIcon />}
            >
              Guardar
            </Button>
          </div>
          <ModalCompanyCreate open={openModal} />
        </div>
      )}
    </>
  );
}
