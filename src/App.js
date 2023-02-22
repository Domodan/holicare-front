import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Sidebar from "./components/pages/global/Sidebar";
import Topbar from "./components/pages/global/Topbar";
import Dashboard from "./components/pages/dashboard";
import Patient from "./components/pages/patient/Patient";
import AddPatient from "./components/pages/patient/AddPatient";
import Home from "./components/pages/home";
import Team from "./components/pages/admin";
import Doctor from "./components/pages/doctor";
import Hospital from "./components/pages/hospital";
import AddHospital from "./components/pages/hospital/AddHospital";
import District from "./components/pages/district";
import AddDistrict from "./components/pages/district/AddDistrict";
import Laboratory from "./components/pages/laboratory";
import Infection from "./components/pages/infection";
import RiskFactor from "./components/pages/riskfactors";
import Message from "./components/pages/message";
import Tests from "./components/pages/test";
import Analytic from "./components/pages/analytics";
import Calendar from "./components/pages/calendar";
import Setting from "./components/pages/setting";
import UserProfile from "./components/pages/userprofile";
import  {Login} from "./components/pages/Login";
import {SignUp}  from "./components/pages/signUp";
import OtpForm from "./components/pages/otpForm";


function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const [landing, setLanding] = useState(true);
    const [login, setLogin] = useState(true);
    const location = useLocation();
    console.log("From:", location.state?.from?.pathname);


    useEffect(() => {
        const landingState = localStorage.getItem("landing");
        const loginState  = localStorage.getItem("login");
        if (landingState === "false") {
            setLanding(false);
        }
        else {
            setLanding(true);
        }
        if (loginState === "false") {
            setLogin(false);
        }
        else {
            setLogin(true);
        }
    }, []);
    
    return (
        <>
            {landing ?
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>:
            login?
            <Routes>
                <Route path="/Login" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/otpForm" element={<OtpForm/>}/>

            </Routes>:

        
            <ColorModeContext.Provider value={ colorMode }>
                <ThemeProvider theme={ theme }>
                    <CssBaseline />
                    <div className="app">
                        <Sidebar isSidebar={isSidebar} />
                        <main className="content">
                            <Topbar setIsSidebar={setIsSidebar} />
                            <Routes>
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/admin" element={<Team />} />
                                <Route path="/doctor" element={<Doctor />} />
                                <Route path="/patient" element={<Patient />} />
                                <Route path="/add-patient" element={<AddPatient />} />
                                <Route path="/hospital" element={<Hospital />} />
                                <Route path="/add-hospital" element={<AddHospital />} />
                                <Route path="/district" element={<District />} />
                                <Route path="/add-district" element={<AddDistrict />} />
                                <Route path="/lab" element={<Laboratory />} />
                                <Route path="/infection" element={<Infection />} />
                                <Route path="/risk-factor" element={<RiskFactor />} />
                                <Route path="/message" element={<Message />} />
                                <Route path="/test" element={<Tests />} />
                                <Route path="/analytic" element={<Analytic />} />
                                <Route path="/calendar" element={<Calendar />} />
                                <Route path="/setting" element={<Setting />} />
                                <Route path="/user-profile" element={<UserProfile />} />
                                <Route path="/Login" element={<Login/>}/>
                                <Route path="/signUp" element={<SignUp/>}/>
                                <Route path="/signUp" element={<SignUp/>}/>
                                <Route path="/otpForm" element={<OtpForm/>}/>

                               
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