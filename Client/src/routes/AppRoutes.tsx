import { Routes, Route } from 'react-router-dom';
import Landing from '../pages/Landing'
import Dashboard from '../pages/Dashboard';
import MusicGenerationUI from '../pages/MusicGeneration';
import ImageGenerationUI from '../pages/ImageGeneration';
import TextGeneration from '../pages/TextGeneration';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='Dashboard' element={<Dashboard />} />
      <Route path='ImageGeneation' element={<ImageGenerationUI />} />
      <Route path='MusicGeneration' element={<MusicGenerationUI />} />
      <Route path='TextGeneration' element={<TextGeneration />} />
    </Routes>
  )
}

export default AppRoutes
