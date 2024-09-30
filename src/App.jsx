import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Feed from './pages/Feed';
import Login from './pages/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
