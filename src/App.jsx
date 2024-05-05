import './App.css'
import React from 'react';
import { Routes, Route } from "react-router-dom";
import { AppBar, Toolbar, Typography } from '@mui/material';
import TrainingList from './components/TrainingList';
import CustomerList from './components/CustomerList';
import Navbar from './Navbar';


function App() {
  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "pink" }}>
        <Toolbar>
          <Typography variant="h6"> Personal Training </Typography>
        </Toolbar>
        <Navbar />
        <Routes>
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/trainings" element={<TrainingList />} />
        </Routes>
      </AppBar>
    </>
  )
}

export default App
