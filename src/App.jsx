import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Feed from './pages/feed/index.jsx';
import Login from './pages/Login/index.jsx';
import Protected from './components/protected/index.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Protected />}>
          <Route path="/feed" element={<Feed />} />
          <Route path="/profil" element={<h1>Profil Sayfası</h1>} />
          <Route path="/ayar" element={<h1>Ayar Sayfası</h1>} />
          <Route path="/arkadaş" element={<h1>Arkadaş Sayfası</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
