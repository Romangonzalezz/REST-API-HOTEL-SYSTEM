import Navbar from "./components/Navbar";
import Main from "./components/Main";

import { useState } from 'react'; 

import { AuthProvider } from './context/AuthContext'

import { Routes, Route } from 'react-router-dom'

import DetallePage from './pages/DetallePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from "./pages/RegisterPage";

export function App() {
  const [search, setSearch] = useState("");

  const handleSearchChange = (value) => {
    setSearch(value);
  };

  return (
    <>  
      <AuthProvider> 
        <Routes> 
            <Route path="/" element={<MainContainer onSearchChange={handleSearchChange} search={search} />} />
            <Route path="/" element={<Main search={search}/>} />
            <Route path="detalle/:id" element={<DetallePage/>} />
            <Route path="login" element={<LoginPage/>} />
            <Route path="register" element={<RegisterPage/>} />
        </Routes>
      </AuthProvider>
    </>
  )
}


function MainContainer({ onSearchChange, search }) {
  return (
    <>
      <Navbar onSearchChange={onSearchChange} />
      <Main search={search} />
    </>
  );
}