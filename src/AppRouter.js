import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import LayoutDefault from './components/layout/default';
import Dataset from './pages/dataset';
import Labeling from './pages/labeling';
import Trailing from './pages/training';
import Model from './pages/model';
import Account from './pages/account';
import Dashboard from './pages/dashboard';
import Login from './pages/login';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LayoutDefault> <Dashboard /> </LayoutDefault> } />
        <Route path="/dataset" element={<LayoutDefault> <Dataset /> </LayoutDefault> } />
        <Route path="/labeling" element={<LayoutDefault> <Labeling /> </LayoutDefault> } />
        <Route path="/training" element={<LayoutDefault> <Trailing /> </LayoutDefault> } />
        <Route path="/model" element={<LayoutDefault> <Model /> </LayoutDefault> }/>
        <Route path="/account" element={<LayoutDefault> <Account /> </LayoutDefault> } />
      </Routes>
  </Router>
     
  )
}

export default AppRouter;