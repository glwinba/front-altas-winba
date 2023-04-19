import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../actions";
import ModalCompanyCreate from "./modals/ModalCompanyCreate";
import { Checkbox, FormControlLabel } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { IconButton } from "@mui/material";
import { FormLabel } from "@mui/material";
import BackupIcon from "@mui/icons-material/Backup";
import Loading from "../Loading";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function IndividualCreateCompany() {
  const [grupos, setGrupos] = useState([]);
  const [rfc, setRfc] = useState("");
  const [dataCompanies, setDataCompanies] = useState([]);
  const [nombre, setNombre] = useState("");
  const [ciec, setCiec] = useState(null);
  const [comentarios, setComentarios] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [grupocontratante, setGrupoContratante] = useState(grupos[0]);
  const [openModal, setOpenModal] = useState(false);
  const [bajaCheck, setBajaCheck] = useState(false);
  const [masive, setMasive] = useState(false);
  const [details, setDetails] = useState(false);
  const [generateDocument, setGenerateDocument] = useState(false);
  const [categoryMateriality, setCategoryMaterialty] = useState([]);
  const [categoryMaterialitySelect, setCategoryMaterialtySelect] = useState([]);
  const [companieTypes, setCompanieTypes] = useState([]);
  const [companieTypesSelect, setCompanieTypesSelect] = useState([]);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  const defaultOptions = {
    options: grupos.length > 0 ? grupos : [],
    getOptionLabel: (options) => options.nombre,
  };

  const defaultOptionsTypeCompanie = {
    options: companieTypes.length > 0 ? companieTypes : [],
    getOptionLabel: (options) => options.type,
  };

  const defaultOptionsCategoryMateriality = {
    options: categoryMateriality.length > 0 ? categoryMateriality : [],
    getOptionLabel: (options) => options.Nombre,
  };

  const getGrupos = async () => {
    const res = await axios.get("http://127.0.0.1:5000/getGrupos");
    setGrupos(res.data);
  };

  const getCategoryMateriality = async () => {
    const res = await axios.get("http://127.0.0.1:5000/getCategoryMateriality");
    setCategoryMaterialty(res.data);
  };

  const getCompanieTypes = async () => {
    const res = await axios.get("http://127.0.0.1:5000/listTypeCompanies");
    setCompanieTypes(res.data);
  };

  // const download = async () => {
  //   const res = await axios.get("http://127.0.0.1:5000/generateExcel");
  // };

  const createCompany = async () => {
    dispatch(setLoading(true));
    if (masive) {
      await axios.post("http://127.0.0.1:5000/createcompanycompletemasive", {
        fileData: dataCompanies,
        GrupoId: grupocontratante,
        bajaCheck: bajaCheck,
        companieTypesSelect: companieTypesSelect,
        categoryMaterialitySelect: categoryMaterialitySelect,
        generateDocument: generateDocument
      });
    } else {
      await axios.post("http://127.0.0.1:5000/createcompany", {
        rfc: rfc,
        nombre: nombre,
        ciec: ciec,
        GrupoId: grupocontratante,
        comentarios: comentarios,
        bajaCheck: bajaCheck,
        companieTypesSelect: companieTypesSelect,
        categoryMaterialitySelect: categoryMaterialitySelect,
        generateDocument: generateDocument
      });
    }
    dispatch(setLoading(false));
    setOpenModal(true);
  };

  const extractDataExcel = async () => {
    dispatch(setLoading(true));

    const dataExcel = await axios.post(
      "http://127.0.0.1:5000/extractdataexcel",
      {
        file: fileData,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setDataCompanies(dataExcel.data);
    dispatch(setLoading(false));
  };

  useEffect(() => {
    dispatch(setLoading(true));
    getGrupos();
    getCategoryMateriality();
    getCompanieTypes();
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
          <div className="mb-6">
            <div className="grid grid-cols-4">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={masive}
                    sx={{ m: 1 }}
                    onChange={(e) => {
                      setMasive(e.target.checked);
                    }}
                  />
                }
                label="Inserción Masiva"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={details}
                    sx={{ m: 1 }}
                    onChange={(e) => {
                      setDetails(e.target.checked);
                    }}
                  />
                }
                label="Inserción Detallada"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={generateDocument}
                    sx={{ m: 1 }}
                    onChange={(e) => {
                      setGenerateDocument(e.target.checked);
                    }}
                  />
                }
                label="Generar Reporte"
              />
            </div>
            {masive ? (
              <>
                <div>
                  <FormLabel>Ingres tu archivo excel: </FormLabel>

                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                  >
                    <input
                      hidden
                      type="file"
                      name="file"
                      onChange={(e) => {
                        setFileData(e.target.files[0]);
                      }}
                    />
                    <BackupIcon />
                  </IconButton>
                  <Button variant="contained" disabled={fileData === null} onClick={extractDataExcel}>
                    Cargar
                  </Button>
                  {dataCompanies.length > 0 ? (
                    <button
                      class="ml-2 w-10 h-10 font-bold rounded-full text-blue-800 border border-blue-800"
                      type="button"
                    >
                      {dataCompanies.length}
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="grid grid-cols-1">
                  <Autocomplete
                    disablePortal
                    {...defaultOptions}
                    value={grupocontratante}
                    multiple={false}
                    sx={{ m: 1 }}
                    onChange={(e, newValue) => {
                      setGrupoContratante(parseInt(newValue.id));
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="GRUPO CONTRATANTE"
                        variant="standard"
                        focused
                      />
                    )}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2">
                  <TextField
                    id="standard-basic"
                    sx={{ m: 1 }}
                    label="RFC"
                    variant="standard"
                    focused
                    value={rfc}
                    onChange={(e) => {
                      setRfc(e.target.value);
                    }}
                    autoFocus
                  />

                  <TextField
                    id="standard-basic"
                    sx={{ m: 1 }}
                    label="NOMBRE"
                    variant="standard"
                    focused
                    value={nombre}
                    onChange={(e) => {
                      setNombre(e.target.value);
                    }}
                  />
                </div>
                {details ? (
                  <>
                    <div className="grid grid-cols-2">
                      <Autocomplete
                        disablePortal
                        {...defaultOptions}
                        value={grupocontratante}
                        multiple={false}
                        sx={{ m: 1 }}
                        onChange={(e, newValue) => {
                          setGrupoContratante(parseInt(newValue.id));
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="GRUPO CONTRATANTE"
                            variant="standard"
                            focused
                          />
                        )}
                      />
                      <TextField
                        id="standard-basic"
                        sx={{ m: 1 }}
                        label="CIEC"
                        variant="standard"
                        focused
                        value={ciec}
                        onChange={(e) => {
                          setCiec(e.target.value);
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-1">
                      <TextField
                        id="outlined-multiline-static"
                        label="COMENTARIOS"
                        multiline
                        sx={{ m: 1 }}
                        rows={4}
                        variant="standard"
                        focused
                        value={comentarios}
                        onChange={(e) => {
                          setComentarios(e.target.value);
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-1">
                      <Autocomplete
                        disablePortal
                        {...defaultOptions}
                        value={grupocontratante}
                        multiple={false}
                        sx={{ m: 1 }}
                        onChange={(e, newValue) => {
                          setGrupoContratante(parseInt(newValue.id));
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="GRUPO CONTRATANTE"
                            variant="standard"
                            focused
                          />
                        )}
                      />
                    </div>
                  </>
                )}
              </>
            )}
            {details ? (
              <>
                <div className="grid grid-cols-2">
                  <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    disableCloseOnSelect
                    sx={{ m: 1 }}
                    {...defaultOptionsTypeCompanie}
                    onChange={(e, newValue) => {
                      setCompanieTypesSelect(newValue);
                    }}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.type}
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="TIPO EMPRESA"
                        variant="standard"
                        focused
                      />
                    )}
                  />

                  <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    disableCloseOnSelect
                    sx={{ m: 1 }}
                    {...defaultOptionsCategoryMateriality}
                    onChange={(e, newValue) => {
                      setCategoryMaterialtySelect(newValue);
                    }}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.Nombre}
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="CATEGORIA MATERIALIDAD"
                        variant="standard"
                        focused
                      />
                    )}
                  />
                </div>
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={bajaCheck}
                        sx={{ m: 1 }}
                        onChange={(e) => {
                          setBajaCheck(e.target.checked);
                        }}
                      />
                    }
                    label="Empresa Baja"
                  />
                </div>
              </>
            ) : (
              <></>
            )}
          </div>

          <div className="w-full m-1">
            <Button
              onClick={createCompany}
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
