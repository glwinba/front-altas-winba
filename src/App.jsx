import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutMain from "./layouts/LayoutMain";
import Users from "./pages/Users";
import Updates from "./pages/Updates";
import Login from "./pages/Login";
import CreateUsers from "./pages/CreateUsers";
import Empresas from "./pages/Empresas";
import Updateuser from "./pages/Updateuser";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<LayoutMain />}>
            <Route path="/users" element={<Users />} />
            <Route path="/createusers" element={<CreateUsers />}/>
            <Route path="/updaterfc" element={<Updates />} />
            <Route path="/empresas" element={<Empresas />} />
            <Route path="/updateuser" element={<Updateuser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
