import React from "react";
import ReactDom from "react-dom/client";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './auth/context/AuthProvider';

import "./index.css";

import App from "./App";

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <Router>
            <AuthProvider>
                <Routes >
                    <Route path="/*" element={<App />} />
                </Routes>
            </AuthProvider>
        </Router>
    </React.StrictMode>
)