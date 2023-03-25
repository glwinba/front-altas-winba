import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutMain from "./layouts/LayoutMain";
import Users from "./pages/Users";
import Login from "./pages/Login";
import CreateUsers from "./pages/CreateUsers";
import Empresas from "./pages/Empresas";
import Updateuser from "./pages/Updateuser";
import Grupos from "./pages/Grupos";
import CreateGroups from "./pages/CreateGroups";
import CreateCompanies from "./pages/CreateCompany";
import BlackLists69SAT from "./pages/ListasNegras/69SAT/BlackList69SAT";
import CreateSupposed from "./pages/ListasNegras/69SAT/CreateSupposeds";
import DashBoard from "./pages/DashBoard";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/sign_in" element={<Login />} />
          <Route path="/" element={<DashBoard />} />
          <Route path="/" element={<LayoutMain />}>
            
            <Route path="/users" element={<Users />} />
            <Route path="/createusers" element={<CreateUsers />}/>
            <Route path="/creategroups" element={<CreateGroups />}/>
            <Route path="/createcompanies" element={<CreateCompanies />}/>
            <Route path="/empresas" element={<Empresas />} />
            <Route path="/grupos" element={<Grupos />} />
            <Route path="/updateuser/:id" element={<Updateuser />} />
            <Route path="/listasnegras69sat" element={<BlackLists69SAT />} />
            <Route path="/crear-supuesto" element={<CreateSupposed />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
