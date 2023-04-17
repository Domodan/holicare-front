import React, { useState, useRef, useEffect } from 'react';
import {
    Box, Button, useTheme, Avatar, Stack, Alert,
    AlertTitle
} from '@mui/material';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from "../../../theme";
import Header from '../../includes/Header';
import { AddOutlined } from '@mui/icons-material';
import useAuth from '../../../auth/useAuth/useAuth';
import { globalVariables } from '../../../utils/GlobalVariables';
import { getDataTokens } from '../../../utils/ApiCalls';

const HA = process.env.REACT_APP_ROLE_HA;
const SA = process.env.REACT_APP_ROLE_SA;

const role = [ HA, SA, ];

const Doctor = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [doctors, setDoctors] = useState([]);
    const [errorMsg, setErrorMsg] = useState([]);
    const mounted = useRef();
    const { auth, setAuth, setAuthed } = useAuth();
    const location = useLocation();

    useEffect(() => {
        mounted.current = true;
        const endpoint = globalVariables.END_POINT_CLINICIAN;
        getDataTokens(endpoint)
        .then((data) => {
            if (mounted) {
                if (data?.length > 0) {
                    setDoctors(data);
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
            // <img src={params.value} alt="Doctor's Avatar" width={60} height={60}/>,
            flex: 0.5,
        },
        {
            field: "name",
            headerName: "Full Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "hospital",
            headerName: "Hospital",
            flex: 1,
        },
        {
            field: "specialty",
            headerName: "Specialty",
            flex: 0.7,
        },
        {
            field: "role",
            headerName: "Role",
            flex: 0.5,
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
       
        
    ];

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DOCTOR" subtitle="Subscribed Doctors Available" />
                {role.includes(auth.role) ?
                    <Box>
                        <Link to={'/add_doctor'}>
                            <Button variant="contained" component="label">
                                <AddOutlined sx={{ mr: "10px" }} />
                                New Doctor
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
                    <DataGrid  rows={doctors} columns={columns} />
                }
            </Box>
        </Box>
    )
}

export default Doctor