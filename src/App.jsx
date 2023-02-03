import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LayoutMain  from './layouts/LayoutMain';
import Users from './pages/Users';
import Updates from './pages/Updates';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutMain/>}>
            <Route path='/users' element={<Users/>}/>
            <Route path='/updaterfc' element={<Updates/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
