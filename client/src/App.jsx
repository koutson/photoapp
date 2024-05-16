import './App.css';

import React from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter, Route,Routes, Navigate,Outlet,useLocation } from 'react-router-dom';
import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LoginPage from './components/Login';
import { useCookies } from 'react-cookie';
import { jwtDecode } from "jwt-decode";
import HomePage from './components/Home';
import PhotosPage from './components/photosPage';
import { CookiesProvider } from 'react-cookie';
import Cookies from 'js-cookie';
import UserDetailPage from './components/UserDetailPage';

function RequireAuth() {
  const [cookies,setCookies,removeCookies,updateCookies] = useCookies(['token']);
  updateCookies()
  const location = useLocation()
  if (!cookies.token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return <Outlet />;
}

const App = (props) => {
  return (
    <CookiesProvider>
    <BrowserRouter>
      <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/photos/:user_id" element={<PhotosPage />} />
            <Route path="/user/:user_id" element={<UserDetailPage />} />
          </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
