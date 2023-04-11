import React, { useState, useEffect, useRef } from 'react';
import { AddOutlined } from '@mui/icons-material';
import {
    Box,
    Button,
    useTheme,
    Avatar
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { tokens } from '../../../theme';
import Header from '../../includes/Header';
import useAuth from '../../../auth/useAuth/useAuth';
import { getData } from '../../../utils/ApiCalls';
import { globalVariables } from '../../../utils/GlobalVariables';

const D = process.env.REACT_APP_ROLE_D;
const N = process.env.REACT_APP_ROLE_N;
const SA = process.env.REACT_APP_ROLE_SA;

const role = [ D, N, SA ];


const Patient = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { auth } = useAuth();
    const [patients, setPatients] = useState([]);
    const mounted = useRef();

    useEffect(() => {
        mounted.current = true;
        const endpoint = globalVariables.END_POINT_PATIENT;
        getData(endpoint)
        .then((data) => {
            if (mounted && data?.length > 0) {
                setPatients(data);
            }
            return () => mounted.current = false;
        })
        .catch((error) => console.log("Error:", error))
    }, [mounted])
    
    const column = [
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
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "occupation",
            headerName: "Occupation",
            flex: 0.7,
        },
        {
            field: "age",
            headerName: "Age",
            type: "number",
            headerAlign: "left",
            align: "left",
            flex: 0.4
        },
        {
            field: "phone",
            headerName: "Phone Number",
            flex: 0.8,
        },
        {
            field: "location",
            headerName: "Location",
            flex: 0.8,
        },
        {
            field: "hospital",
            headerName: "Hospital",
            flex: 1,
        },
    ];

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="PATIENTS" subtitle="Manage Patients " />
                {role.includes(auth.role) ?
                    <Box>
                        <Link to={'/add_patient'}>
                            <Button variant="contained" component="label">
                                <AddOutlined sx={{ mr: "10px" }} />
                                Add Patient
                            </Button>
                        </Link>&nbsp;&nbsp;&nbsp;

                        <Button variant="contained" component="label">
                            Upload data
                            <input hidden accept="image/*" multiple type="file" />
                        </Button>
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
                <DataGrid rows={patients} columns={column} />
            </Box>
        </Box>
    )
}

export default Patient