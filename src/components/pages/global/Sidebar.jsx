import React, { useState } from 'react';
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { tokens } from '../../../theme';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import "react-pro-sidebar/dist/css/styles.css";
import {
    HomeOutlined,
    MenuOutlined,
    PeopleOutlined,
    ContactsOutlined,
    ReceiptOutlined,
    CalendarTodayOutlined,
    PeopleOutline,
    HelpOutlineOutlined,
    BarChartOutlined,
    PieChartOutlined
} from '@mui/icons-material';
import useAuth from '../../../auth/useAuth/useAuth';

import logo from '../../../assets/img/hc_logo.png';

const A = process.env.REACT_APP_ROLE_A;
const R = process.env.REACT_APP_ROLE_R;
const D = process.env.REACT_APP_ROLE_D;
const P = process.env.REACT_APP_ROLE_P;
const HA = process.env.REACT_APP_ROLE_HA;
const N = process.env.REACT_APP_ROLE_N;
const LA = process.env.REACT_APP_ROLE_LA;
const PR = process.env.REACT_APP_ROLE_PR;
const SA = process.env.REACT_APP_ROLE_SA;

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>
                {title}
            </Typography>
            <Link to={to} />
        </MenuItem>
    )
}

const cat = [ A, SA, HA, D, N, PR, R, LA ];
const cat1 = [ A, SA, HA, D, N, LA ];
const cat2 = [ A, SA, HA, D, N, PR, P, R, LA ];

const AdminSidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { auth } = useAuth();

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");

    return (
        <Box
            sx={{
                height: "100%",
                "& .pro-sidebar-inner": {
                  background: `${colors.primary[400]} !important`,
                },
                "& .pro-icon-wrapper": {
                  backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                  padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                  color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                  color: "#6870fa !important",
                  background: "rgba(0, 0, 0, .1)",
                  borderLeft: "6 !important"
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlined /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Box display="flex" justifyContent="center" alignItems="center">
                                    <img
                                        alt="holicare-logo"
                                        width="25px"
                                        height="25px"
                                        src={ logo }
                                        style={{ cursor: "pointer", borderRadius: "25%" }}
                                    />
                                </Box>
                                <Typography
                                    fontWeight="bold"
                                    variant="h3"
                                    color={colors.grey[100]}
                                >
                                    HoliCare
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlined />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        {cat.includes(auth.role) ?
                        <>
                            <Item
                                title="Dashboard"
                                to="/dashboard"
                                icon={<HomeOutlined />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Administrators"
                                to="/admin"
                                icon={<PeopleOutline />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Clinicians"
                                to="/doctor"
                                icon={<ReceiptOutlined />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Hospitals"
                                to="/hospital"
                                icon={<ContactsOutlined />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Districts"
                                to="/district"
                                icon={<PieChartOutlined />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Risk Factors"
                                to="/risk_factor"
                                icon={<CalendarTodayOutlined />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Infections"
                                to="/infection"
                                icon={<BarChartOutlined />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="User Profile"
                                to="/user_profile"
                                icon={<CalendarTodayOutlined />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Appointments"
                                to="/appointment"
                                icon={<CalendarTodayOutlined />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Schedules"
                                to="/schedule"
                                icon={<CalendarTodayOutlined />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        </> : null}
                        {cat1.includes(auth.role) ?
                        <>
                            <Item
                                title="Laboratory"
                                to="/lab"
                                icon={<HelpOutlineOutlined />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Tests"
                                to="/test"
                                icon={<ContactsOutlined />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        </>: null}
                        {cat2.includes(auth.role) ?
                        <>
                            <Item
                                title="Patients"
                                to="/patient"
                                icon={<PeopleOutlined />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Patient Documents"
                                to="/patient_documents"
                                icon={<PeopleOutlined />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        </>
                        : null}
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    )
}



const PatientSidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { auth } = useAuth();

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");

    return (
        <Box
            sx={{
                height: "100%",
                "& .pro-sidebar-inner": {
                  background: `${colors.primary[400]} !important`,
                },
                "& .pro-icon-wrapper": {
                  backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                  padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                  color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                  color: "#6870fa !important",
                  background: "rgba(0, 0, 0, .1)",
                  borderLeft: "6 !important"
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlined /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Box display="flex" justifyContent="center" alignItems="center">
                                    <img
                                        alt="holicare-logo"
                                        width="25px"
                                        height="25px"
                                        src={ logo }
                                        style={{ cursor: "pointer", borderRadius: "25%" }}
                                    />
                                </Box>
                                <Typography
                                    fontWeight="bold"
                                    variant="h3"
                                    color={colors.grey[100]}
                                >
                                    HoliCare
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlined />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        {cat.includes(auth.role) ?
                        <>
                            <Item
                                title="Patient Summary"
                                to="/details/:id"
                                icon={<HomeOutlined />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Vitals"
                                to="/vitals"
                                icon={<PeopleOutline />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Anthropometrics"
                                to="/biometrics"
                                icon={<PeopleOutline />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Conditions"
                                to="/conditions"
                                icon={<PeopleOutline />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Medications"
                                to="/medical"
                                icon={<ReceiptOutlined />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            {/* <Item
                                title="Test Results"
                                to="/patient_documents"
                                icon={<ContactsOutlined />}
                                selected={selected}
                                setSelected={setSelected}
                            /> */}
                            <Item
                                title="Visits"
                                to="/visits_page"
                                icon={<PieChartOutlined />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Allergies"
                                to="/allergies"
                                icon={<CalendarTodayOutlined />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Documents"
                                to="/patient_documents"
                                icon={<CalendarTodayOutlined />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Appointments"
                                to="/appointment"
                                icon={<CalendarTodayOutlined />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Provisional Diagnosis"
                                to="/notes"
                                icon={<CalendarTodayOutlined />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        </> : null}
                        
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    )
}

const Sidebar = ({ role }) => {
    // Render the appropriate sidebar component based on the role
    switch (role) {
      case 'admin':
        return <AdminSidebar />;
      case 'patient':
        return <PatientSidebar />;
      default:
        return null; // Render nothing if the role is not recognized
    }
  };
  
  export default Sidebar;