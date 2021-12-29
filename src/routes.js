import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomeView from './pages/Home';

function routes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<HomeView />} />
        <Route exact path='/home' element={<HomeView />} />
        <Route path='*' element={404} />
      </Routes>
    </BrowserRouter>
  );
}

export default routes;
