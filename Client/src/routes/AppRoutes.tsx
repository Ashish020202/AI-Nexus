import { Routes, Route } from 'react-router-dom';
import Landing from '../pages/Landing'
import TextGeneration from '../pages/ImageGeneration';
import Dashboard from '../pages/Dashboard';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='Dashboard' element={<Dashboard />} />
      <Route path='TextGeneation' element={<TextGeneration />} />
    </Routes>
  )
}

export default AppRoutes
