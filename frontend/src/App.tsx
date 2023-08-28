import './App.css';
import AuthenticationPage from './pages/AuthenticationPage/AuthenticationPage';
import { useContext, createContext, useState } from 'react';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProvider from './utils/contexts/userContext';
import UserDashboard from './pages/UserDashboard/UserDashboard';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import LogInPage from './pages/LogInPage/LogInPage';

function App() {

  return (
      <div className="App">
        <UserProvider>
          <BrowserRouter>
            <Routes>
                <Route path="/" element={ <AuthenticationPage />} >
                  <Route path="" element={<LogInPage />} />
                  <Route path="signUp" element={<SignUpPage />} />
                </Route>
                <Route path="/userDashboard" element={<UserDashboard />} />          
                <Route path="/adminDashboard" element={<AdminDashboard />} />          
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </div>
  );
}

export default App;
