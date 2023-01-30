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
    PersonOutlined,
    CalendarTodayOutlined
} from '@mui/icons-material';

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

const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");

    return (
        <Box
            sx={{
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
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    <img
                        alt='user-profile'
                        width={"70x"}
                        height={"50px"}
                        src={`../../assets/hlogo.png`}
                        style={{cursor: "pointer", borderRadius: "50%"}}
                    />
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
                                <Typography variant="h3" color={colors.grey[100]}>
                                    DOCTOR
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlined />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                            title="Dashboard"
                            to="/"
                            icon={<HomeOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                    {/* <Typography
                        variant="h6"
                        color={colors.grey[300]}
                        sx={{ m: "15px 0 5px 20px" }}
                    >
                        Data
                    </Typography> */}

                    <Item
                        title="Patients"
                        to="/patient"
                        icon={<PeopleOutlined />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Tests"
                        to="/contacts"
                        icon={<ContactsOutlined />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Analytics"
                        to="/invoices"
                        icon={<ReceiptOutlined />}
                        selected={selected}
                        setSelected={setSelected}
                    />


                    {/* <Typography
                        variant="h6"
                        color={colors.grey[300]}
                        sx={{ m: "15px 0 5px 20px" }}
                    >
                        Pages
                    </Typography> */}

                    <Item
                        title="Messages"
                        to="/form"
                        icon={<PersonOutlined />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="User Profile"
                        to="/calendar"
                        icon={<CalendarTodayOutlined />}
                        selected={selected}
                        setSelected={setSelected}
                    />

                    {/* <Item
                        title="FAQ Page"
                        to="/faq"
                        icon={<HelpOutlineOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    /> */}

                    {/* <Typography
                        variant="h6"
                        color={colors.grey[300]}
                        sx={{ m: "15px 0 5px 20px" }}
                    >
                        Charts
                    </Typography>
                    <Item
                        title="Bar Chart"
                        to="/bar"
                        icon={<BarChartOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Pie Chart"
                        to="/pie"
                        icon={<PieChartOutlineOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Line Chart"
                        to="/line"
                        icon={<TimelineOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Geography Chart"
                        to="/geography"
                        icon={<MapOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    /> */}
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    )
}

export default Sidebar