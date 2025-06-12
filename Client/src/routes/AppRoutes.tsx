import { Routes, Route } from 'react-router-dom';
import Landing from '../pages/Landing'
import Dashboard from '../pages/Dashboard';
import MusicGenerationUI from '../pages/MusicGeneration';
import ImageGenerationUI from '../pages/ImageGeneration';
import TextGeneration from '../pages/TextGeneration';
import VideoGeneration from '../pages/VideoGeneration';
import CodeGeneration from '../pages/CodeGeneration';
import Auth from '../pages/Auth';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='Dashboard' element={ <Dashboard />} />
      
      <Route path='ImageGeneration' element={
        <ProtectedRoute>
          <ImageGenerationUI />
        </ProtectedRoute>
      } />
      <Route path='MusicGeneration' element={
        <ProtectedRoute>
          <MusicGenerationUI />
        </ProtectedRoute>
      } />
      <Route path='TextGeneration' element={
        <ProtectedRoute>
          <TextGeneration />
        </ProtectedRoute>
      } />
      <Route path='VideoGeneration' element={
        <ProtectedRoute>
          <VideoGeneration />
        </ProtectedRoute>
      } />
      <Route path='CodeGeneration' element={
        <ProtectedRoute>
          <CodeGeneration />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default AppRoutes
