import './App.css';
import AuthenticationPage from './pages/AuthenticationPages/AuthenticationPage/AuthenticationPage';
import { useContext, createContext, useState } from 'react';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProvider from './utils/contexts/userContext';
import CustomerDashboard from './pages/CustomerPages/CustomerDashboard/CustomerDashboard';
import AdminDashboard from './pages/AdminPages/AdminDashboard/AdminDashboard';
import SignUpPage from './pages/AuthenticationPages/SignUpPage/SignUpPage';
import LogInPage from './pages/AuthenticationPages/LogInPage/LogInPage';
import CustomerFoldersPage from './pages/CustomerPages/CustomerFoldersPage/CustomerFoldersPage';
import CustomerFilesPage from './pages/CustomerPages/CustomerFilesPage/CustomerFilesPage';
import CustomerHomePage from './pages/CustomerPages/CustomerHomePage/CustomerHomePage';
import AdminHomePage from './pages/AdminPages/AdminHomePage/AdminHomePage';
import AdminCustomersPage from './pages/AdminPages/AdminCustomersPage/AdminCustomersPage';
import AdminCustomerFoldersPage from './pages/AdminPages/AdminCustomerFoldersPage/AdminCustomerFoldersPage';
import AdminCustomerFilesPage from './pages/AdminPages/AdminCustomerFilesPage/AdminCustomerFilesPage';
import CustomerProfilePage from './pages/CustomerPages/CustomerProfilePage/CustomerProfilePage';
import CustomerPaymentPage from './pages/CustomerPages/CustomerPaymentPage/CustomerPaymentPage';

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
                <Route path="/customerDashboard/" element={<CustomerDashboard />} >   
                  <Route path="home" element={<CustomerHomePage />} />   
                  <Route path="folders" element={<CustomerFoldersPage />} />   
                  <Route path="files" element={<CustomerFilesPage />} />   
                  <Route path="profile" element={<CustomerProfilePage />} />   
                  <Route path="payment" element={<CustomerPaymentPage />} />   
                </Route>          
                <Route path="/adminDashboard/" element={<AdminDashboard />} >
                  <Route path="customers" element={<AdminCustomersPage />} />            
                  <Route path="home" element={<AdminHomePage />} />  
                  <Route path="profile" element={<CustomerProfilePage />} />   
                  <Route path="customerFolders" element={<AdminCustomerFoldersPage />} />           
                  <Route path="customerFiles" element={<AdminCustomerFilesPage />} />  
                </Route>          
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </div>
  );
}

export default App;
