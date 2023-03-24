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
import PatientDocuments from "./components/pages/patient/PatientDocuments";
import Home from "./components/pages/home";
import Team from "./components/pages/admin";
import Doctor from "./components/pages/doctor";
import AddDoctor from "./components/pages/doctor/AddDoctor";
import Hospital from "./components/pages/hospital";
import AddHospital from "./components/pages/hospital/AddHospital";
import District from "./components/pages/district";
import AddDistrict from "./components/pages/district/AddDistrict";
import Laboratory from "./components/pages/laboratory";
import AddLab from "./components/pages/laboratory/AddLab";
import Infection from "./components/pages/infection";
import AddInfection from "./components/pages/infection/AddInfection";
import RiskFactor from "./components/pages/riskfactors";
import AddRiskfactor from "./components/pages/riskfactors/AddRiskfactor";
import Tests from "./components/pages/test";
import AddTest from "./components/pages/test/AddTest";
import UserProfile from "./components/pages/userprofile";
import UploadPatient from "./components/pages/patient/UploadPatient";
import Layout from "./components/pages/layout/Layout";
import RequireAuth from "./auth/requireAuth/RequireAuth";
import SignIn from "./components/pages/auth/SignIn";
import SignUp from "./components/pages/auth/SignUp";
import OTPVerification from "./components/pages/auth/OTPVerification";
import useAuth from "./auth/useAuth/useAuth";
import EmailVerification from "./components/pages/auth/EmailVerification";

const ROUTES = [ "/", "/sign_in", "/sign_up", "/otp", "/verify_email"];
const ROLES = [
    process.env.REACT_APP_ROLE_ADMIN,
    process.env.REACT_APP_ROLE_RESEARCHER,
    process.env.REACT_APP_ROLE_DOCTOR,
    process.env.REACT_APP_ROLE_PATIENT,
    process.env.REACT_APP_ROLE_HOSPITAL_ADMIN,
    process.env.REACT_APP_ROLE_NURSE,
    process.env.REACT_APP_ROLE_LAB_ATTENDANT,
    process.env.REACT_APP_ROLE_PARTNER,
    process.env.REACT_APP_ROLE_SUPER_ADMIN,
]

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
        <>{(landing && ROUTES.includes(pathname))
            ?
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/sign_in" element={<SignIn />} />
                        <Route path="/sign_up" element={<SignUp />} />
                        <Route path="/otp" element={<OTPVerification />} />
                        <Route path="/verify_email" element={<EmailVerification />} />
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
                                        <Route element={<RequireAuth roles={ ROLES } />}>
                                            <Route path="/dashboard" element={<Dashboard />} />
                                            <Route path="/admin" element={<Team />} />
                                            <Route path="/doctor" element={<Doctor />} />
                                            <Route path="/add_doctor" element={<AddDoctor />} />
                                            <Route path="/patient" element={<Patient />} />
                                            <Route path="/add_patient" element={<AddPatient />} />
                                            <Route path="/add_patient2" element={<AddPatient2 />} />
                                            <Route path="/upload_patient" element={<UploadPatient />} />
                                            <Route path="/patient_documents" element={<PatientDocuments />} />
                                            <Route path="/hospital" element={<Hospital />} />
                                            <Route path="/add_hospital" element={<AddHospital />} />
                                            <Route path="/district" element={<District />} />
                                            <Route path="/add_district" element={<AddDistrict />} />
                                            <Route path="/lab" element={<Laboratory />} />
                                            <Route path="/add_lab" element={<AddLab />} />
                                            <Route path="/infection" element={<Infection />} />
                                            <Route path="/add_infection" element={<AddInfection />} />
                                            <Route path="/risk_factor" element={<RiskFactor />} />
                                            <Route path="/add_riskfactor" element={<AddRiskfactor />} />
                                            <Route path="/test" element={<Tests />} />
                                            <Route path="/add_test" element={<AddTest />} />
                                            <Route path="/user_profile" element={<UserProfile />} />
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