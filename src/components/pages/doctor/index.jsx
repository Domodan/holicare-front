import React from 'react';
import { Box, Button, useTheme, Avatar } from '@mui/material';
import {Link} from "react-router-dom"
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from "../../../theme";
import Header from '../../includes/Header';
import { AddOutlined } from '@mui/icons-material';
import useAuth from '../../../auth/useAuth/useAuth';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { globalVariables } from '../../../utils/GlobalVariables';
import { getData } from '../../../utils/ApiCalls';

const HA = process.env.REACT_APP_ROLE_HA;
const SA = process.env.REACT_APP_ROLE_SA;

const role = [ HA, SA, ];

const Doctor = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { auth } = useAuth();
    const [doctors, setDoctors] = useState([])
    const mounted = useRef();

    useEffect(() => {
        mounted.current = true;

        const endpoint = globalVariables.END_POINT_CLINICIAN;
        getData(endpoint)
        .then((data) => {
            if (mounted) {
                setDoctors(data);
            }
            return () => mounted.current = false;
        })
        .catch((error) => console.log("Error:", error))
    }, [mounted])

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
                <DataGrid  rows={doctors} columns={columns} />
            </Box>
        </Box>
    )
}

export default Doctor