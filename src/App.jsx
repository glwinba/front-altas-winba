import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LayoutMain  from './layouts/LayoutMain';
import Users from './pages/Users';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutMain/>}>
            <Route path='/users' element={<Users/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
