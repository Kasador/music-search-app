import './App.css'
// Pages | Routes
import Home from './components/home/Home'
import Login from './components/login/Login'
// Protected Routes - https://www.youtube.com/watch?v=pyfwQUc5Ssk&ab_channel=Appwrite
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './utils/ProtectedRoutes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/login" />

        { /* if user is not AUTH, don't allow to view home page */}
        <Route element={<ProtectedRoutes />}>
           <Route element={<Home />} path="/" />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
