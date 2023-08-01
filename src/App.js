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
import SignOut from "./components/pages/auth/SignOut";
import OTPVerification from "./components/pages/auth/OTPVerification";
import useAuth from "./auth/useAuth/useAuth";
import EmailVerification from "./components/pages/auth/EmailVerification";
import AddAdmin from "./components/pages/admin/AddAdmin";
import Calendar from "./components/pages/calendar";
import Schedules from "./components/pages/schedules";
import Homepage from "./components/pages/patientDetails/summary";
import Vitals from "./components/pages/patientDetails/summary/vitals";
import Biometrics from "./components/pages/patientDetails/summary/biometrics";
import Conditions from "./components/pages/patientDetails/summary/conditions";
import Notes from "./components/pages/patientDetails/summary/notes";
import Visits from "./components/pages/patientDetails/summary/visits";
import VisitsPage from "./components/pages/patientDetails/summary/visitsPage";
import Allergies from "./components/pages/patientDetails/summary/allergies";
import Medical from "./components/pages/patientDetails/summary/medical";

const ROUTES = [
    "/", "/sign_in", "/sign_up", "/sign_out", "/otp", "/verify_email",
];

const PATIENTROUTES = [
    "/medical","/appointment","/visits_page","/add_test", "/vitals", "/biometrics",
    "/conditions","/allergies", "/notes", "/verify_email", "/patient", "/patient_documents",
];

const A = process.env.REACT_APP_ROLE_A;
const R = process.env.REACT_APP_ROLE_R;
const D = process.env.REACT_APP_ROLE_D;
const P = process.env.REACT_APP_ROLE_P;
const HA = process.env.REACT_APP_ROLE_HA;
const N = process.env.REACT_APP_ROLE_N;
const LA = process.env.REACT_APP_ROLE_LA;
const PR = process.env.REACT_APP_ROLE_PR;
const SA = process.env.REACT_APP_ROLE_SA;

function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const [landing, setLanding] = useState(true);
    const { authed } = useAuth();
    const location = useLocation();

    const pathname = location.pathname;
    let userRole = 'admin';

    if (PATIENTROUTES.includes(pathname) || pathname.includes('/details/')) {
        userRole = 'patient';
    }

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
                        <Route path="/sign_out" element={<SignOut />} />
                        <Route path="/otp" element={<OTPVerification />} />
                        <Route path="/verify_email" element={<EmailVerification />} />
                    </Route>
                </Routes>
            :
                <ColorModeContext.Provider value={ colorMode }>
                    <ThemeProvider theme={ theme }>
                        <CssBaseline />
                        <div className="app">
                            <Sidebar isSidebar={isSidebar} role={userRole} />
                            <main className="content">
                                <Topbar setIsSidebar={setIsSidebar} />
                                <Routes>
                                    <Route element={<RequireAuth roles={[ A, SA, HA, D, N, PR, R ]} />}>
                                        <Route path="/dashboard" element={<Dashboard />} />
                                        <Route path="/admin" element={<Team />} />
                                        <Route path="/doctor" element={<Doctor />} />
                                        <Route path="/user_profile" element={<UserProfile />} />
                                        <Route path="/details/:id" element={<Homepage />} />
                                        <Route path="/risk_factor" element={<RiskFactor />} />
                                        <Route path="/infection" element={<Infection />} />
                                        <Route path="/district" element={<District />} />
                                        <Route path="/hospital" element={<Hospital />} />
                                        <Route path="/appointment" element={<Calendar />} />
                                        <Route path="/schedule" element={<Schedules />} />
                                    </Route>
                                    <Route element={<RequireAuth roles={[ A, SA, HA, D, N, LA, PR ]} />}>
                                        <Route path="/test" element={<Tests />} />
                                        <Route path="/lab" element={<Laboratory />} />
                                    </Route>
                                    <Route element={<RequireAuth roles={[ A, SA, HA, D, N, PR, P, R, LA ]} />}>
                                        <Route path="/patient" element={<Patient />} />
                                        <Route path="/patient_documents" element={<PatientDocuments />} />
                                        <Route path="/vitals" element={<Vitals/>}/>
                                        <Route path="/biometrics" element={<Biometrics/>}/>
                                        <Route path="/conditions" element={<Conditions/>}/>
                                        <Route path="/notes" element={<Notes/>}/>
                                        <Route path="/visits" element={<Visits/>}/>
                                        <Route path="/allergies" element={<Allergies/>}/>
                                        <Route path="/visits_page" element={<VisitsPage/>}/>
                                        <Route path="/medical" element={<Medical/>}/>
                                    </Route>
                                    <Route element={<RequireAuth roles={[ SA ]} />}>
                                        <Route path="/add_hospital" element={<AddHospital />} />
                                        <Route path="/add_district" element={<AddDistrict />} />
                                        <Route path="/add_admin" element={<AddAdmin />} />
                                    </Route>
                                    <Route element={<RequireAuth roles={[ A, HA, SA ]} />}>
                                        <Route path="/add_doctor" element={<AddDoctor />} />
                                    </Route>
                                    <Route element={<RequireAuth roles={[ HA, D, N, SA ]} />}>
                                        <Route path="/add_patient" element={<AddPatient />} />
                                        <Route path="/add_patient2" element={<AddPatient2 />} />
                                        <Route path="/upload_patient" element={<UploadPatient />} />
                                    </Route>
                                    <Route element={<RequireAuth roles={[ D, N, LA, SA ]} />}>
                                        <Route path="/add_lab" element={<AddLab />} />
                                        <Route path="/add_test" element={<AddTest />} />
                                    </Route>
                                    <Route element={<RequireAuth roles={[ D, N, SA ]} />}>
                                        <Route path="/add_infection" element={<AddInfection />} />
                                        <Route path="/add_riskfactor" element={<AddRiskfactor />} />
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