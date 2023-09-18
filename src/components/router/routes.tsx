import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from '@/pages/home';
import ListagemUsuarios from '@/pages/usuarios';
import CadastroUsuario from '@/pages/cadastro-usuario';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/usuarios" element={<ListagemUsuarios />} />
        <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
      </Routes>
    </Router>
  );
}
