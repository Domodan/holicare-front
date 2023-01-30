import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Sidebar from "./components/pages/global/Sidebar";
import Topbar from "./components/pages/global/Topbar";
import Dashboard from "./components/pages/dashboard";
import Patient from "./components/pages/patient/Patient";
import AddPatient from "./components/pages/patient/AddPatient";


function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    
    return (
        <ColorModeContext.Provider value={ colorMode }>
            <ThemeProvider theme={ theme }>
                <CssBaseline />
                <div className="app">
                    <Sidebar isSidebar={isSidebar} />
                    <main className="content">
                        <Topbar setIsSidebar={setIsSidebar} />
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/patient" element={<Patient />} />
                            <Route path="/add-patient" element={<AddPatient />} />
                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default App;