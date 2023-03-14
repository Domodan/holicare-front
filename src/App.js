import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Sidebar from "./components/pages/global/Sidebar";
import Topbar from "./components/pages/global/Topbar";
import Dashboard from "./components/pages/dashboard";
import Patient from "./components/pages/patient/Patient";
import AddPatient from "./components/pages/patient/AddPatient";
import AddPatient2 from "./components/pages/patient/AddPatient2";
import Home from "./components/pages/home";
import Team from "./components/pages/admin";
import Doctor from "./components/pages/doctor";
import Hospital from "./components/pages/hospital";
import AddHospital from "./components/pages/hospital/AddHospital";
import District from "./components/pages/district";
import AddDistrict from "./components/pages/district/AddDistrict";
import Laboratory from "./components/pages/laboratory";
import Infection from "./components/pages/infection";
import AddInfection from "./components/pages/infection/AddInfection";
import RiskFactor from "./components/pages/riskfactors";
import AddRiskfactor from "./components/pages/riskfactors/AddRiskfactor";
import Message from "./components/pages/message";
import Tests from "./components/pages/test";
import Analytic from "./components/pages/analytics";
import Calendar from "./components/pages/calendar";
import Setting from "./components/pages/setting";
import UserProfile from "./components/pages/userprofile";
import UploadPatient from "./components/pages/patient/UploadPatient";
import Layout from "./components/pages/layout/Layout";
import RequireAuth from "./auth/requireAuth/RequireAuth";
import SignIn from "./components/pages/auth/SignIn";
import SignUp from "./components/pages/auth/SignUp";
import OTPVerification from "./components/pages/auth/OTPVerification";
import useAuth from "./auth/useAuth/useAuth";

const routes = [ "/", "/sign_in", "/sign_up", "/otp" ];

function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const [landing, setLanding] = useState(true);
    const { authed } = useAuth();
    const location = useLocation();
    const pathname = location.pathname;

    useEffect(() => {
        if (authed) setLanding(false);
        else setLanding(true);
    }, [authed]);
    
    return (
        <>{(landing && routes.includes(pathname))
            ?
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/sign_in" element={<SignIn />} />
                        <Route path="/sign_up" element={<SignUp />} />
                        <Route path="/otp" element={<OTPVerification />} />
                    </Route>
                </Routes>
            :
                <ColorModeContext.Provider value={ colorMode }>
                    <ThemeProvider theme={ theme }>
                        <CssBaseline />
                        <div className="app">
                            <Sidebar isSidebar={isSidebar} />
                            <main className="content">
                                <Topbar setIsSidebar={setIsSidebar} />
                                <Routes>
                                        <Route element={<RequireAuth />}>
                                            <Route path="/dashboard" element={<Dashboard />} />
                                            <Route path="/admin" element={<Team />} />
                                            <Route path="/doctor" element={<Doctor />} />
                                            <Route path="/patient" element={<Patient />} />
                                            <Route path="/add-patient" element={<AddPatient />} />
                                            <Route path="/add-patient2" element={<AddPatient2 />} />
                                            <Route path="/upload-patient" element={<UploadPatient />} />
                                            <Route path="/hospital" element={<Hospital />} />
                                            <Route path="/add-hospital" element={<AddHospital />} />
                                            <Route path="/district" element={<District />} />
                                            <Route path="/add-district" element={<AddDistrict />} />
                                            <Route path="/lab" element={<Laboratory />} />
                                            <Route path="/infection" element={<Infection />} />
                                            <Route path="/add-infection" element={<AddInfection />} />
                                            <Route path="/risk-factor" element={<RiskFactor />} />
                                            <Route path="/add-riskfactor" element={<AddRiskfactor />} />
                                            <Route path="/message" element={<Message />} />
                                            <Route path="/test" element={<Tests />} />
                                            <Route path="/analytic" element={<Analytic />} />
                                            <Route path="/calendar" element={<Calendar />} />
                                            <Route path="/setting" element={<Setting />} />
                                            <Route path="/user-profile" element={<UserProfile />} />
                                        </Route>
                                </Routes>
                            </main>
                        </div>
                    </ThemeProvider>
                </ColorModeContext.Provider>
            }
        </>
    )
}

export default App;