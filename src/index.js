import React from "react";
import ReactDom from "react-dom/client";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './auth/context/AuthProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import "./index.css";

import App from "./App";

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <Router>
            <AuthProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Routes >
                        <Route path="/*" element={<App />} />
                    </Routes>
                </LocalizationProvider>
            </AuthProvider>
        </Router>
    </React.StrictMode>
)