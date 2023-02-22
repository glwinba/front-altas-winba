import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutMain from "./layouts/LayoutMain";
import Users from "./pages/Users";
import Login from "./pages/Login";
import CreateUsers from "./pages/CreateUsers";
import Empresas from "./pages/Empresas";
import Updateuser from "./pages/Updateuser";
import Grupos from "./pages/Grupos";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<LayoutMain />}>
            <Route path="/users" element={<Users />} />
            <Route path="/createusers" element={<CreateUsers />}/>
            <Route path="/empresas" element={<Empresas />} />
            <Route path="/grupos" element={<Grupos />} />
            <Route path="/updateuser/:id" element={<Updateuser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
