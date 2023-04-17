import React, { useState, useEffect, useRef } from 'react';
import {
    AdminPanelSettingsOutlined,
    SecurityOutlined
} from '@mui/icons-material';
import {
    Box, Button, Typography, useTheme, Avatar, Stack, Alert,
    AlertTitle
} from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import { tokens } from "../../../theme";
import { DataGrid } from '@mui/x-data-grid';
import Header from '../../includes/Header';
import { getDataTokens } from '../../../utils/ApiCalls';
import { globalVariables } from '../../../utils/GlobalVariables';
import { Link, Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../../auth/useAuth/useAuth';

const SA = process.env.REACT_APP_ROLE_SA;

const role = [ SA, ];

const Team = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [admins, setAdmins] = useState([]);
    const [errorMsg, setErrorMsg] = useState([]);
    const mounted = useRef();
    const { auth, setAuth, setAuthed } = useAuth();
    const location = useLocation();

    useEffect(() => {
        mounted.current = true;
        const endpoint = globalVariables.END_POINT_ADMIN;
        getDataTokens(endpoint)
        .then((data) => {
            if (mounted) {
                if (data?.length > 0) {
                    setAdmins(data);
                }
                else if (data.code === "token_not_valid") {
                    setErrorMsg(data.messages[0].message);
                    setAuthed(false);
                    setAuth("");
                    localStorage.clear();
                    <Navigate to={"/sign_in"} state={{ from: location.pathname }} replace />
                }
                else {
                    setErrorMsg(data)
                }
            }
            return () => mounted.current = false;
        })
        .catch((error) => console.log("Error:", error))
    }, [mounted, location, setAuth, setAuthed])

    const columns = [
        {
            field: "avatar",
            headerName: "Avatar",
            renderCell: (params) =>
                <Avatar
                    src={params.value}
                    sx={{ width: 40, height: 40 }}
                    alt={params.row.name}
                />,
            flex: 0.5,
        },
        {
            field: "name",
            headerName: "Full Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "phone",
            headerName: "Phone Number",
            flex: 0.8,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "hospital",
            headerName: "Hospital",
            flex: 1,
        },
        {
            field: "role",
            headerName: "Access Level",
            flex: 1,
            renderCell: ({ row: { role } }) => {
                return (
                    <Box
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                            role === "ADMIN"
                            ? colors.blueAccent[600]
                            : role === "HOSPITAL_ADMIN"
                            ? colors.blueAccent[700]
                            : colors.blueAccent[700]
                        }
                        borderRadius="4px"
                    >
                        {role === "ADMIN" && <AdminPanelSettingsOutlined />}
                        {role === "HOSPITAL_ADMIN" && <SecurityOutlined />}
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            {role}
                        </Typography>
                    </Box>
                );
            },
        },
    ];

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="ADMIN" subtitle="Managing Administrators" />
                {role.includes(auth.role) ?
                    <Box>
                        <Link to={'/add_admin'}>
                            <Button variant="contained" component="label">
                                <AddOutlined sx={{ mr: "10px" }} />
                                New Admin
                            </Button>
                        </Link>
                    </Box>
                :null}
            </Box>
            
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                "& .MuiDataGrid-root": {
                    border: "none",
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                },
                "& .name-column--cell": {
                    color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.grey[900],
                    borderBottom: "none",
                    color: colors.primary[200],
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.grey[900],
                },
                "& .MuiCheckbox-root": {
                    color: `${colors.primary[200]} !important`,
                },
                }}
            >
                {errorMsg.length > 0 || Object.keys(errorMsg).length ?
                    <>
                        {typeof errorMsg === 'object' ?
                            Object.entries(errorMsg).map(([key, value]) => {
                                return <Stack sx={{ width: '100%' }} key={ key }>
                                    <Alert severity="error"  sx={{ mt: 1}}>
                                        <AlertTitle>Error</AlertTitle>
                                        <strong>{ value }</strong>
                                    </Alert>
                                </Stack>
                            })
                        :
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert severity="error"  sx={{ mt: 1}}>
                                    <AlertTitle>Error</AlertTitle>
                                    <strong>{ errorMsg }</strong>
                                </Alert>
                            </Stack>
                        }
                    </>
                :
                    <DataGrid rows={admins} columns={columns} />
                }
            </Box>
        </Box>
    )
}

export default Team