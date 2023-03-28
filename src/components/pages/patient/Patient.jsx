import React from 'react';
import { AddOutlined } from '@mui/icons-material';
import {
    Box,
    Button,
    useTheme
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { mockDataPatient as data } from '../../../data/mockData';
import { tokens } from '../../../theme';
import Header from '../../includes/Header';
import useAuth from '../../../auth/useAuth/useAuth';

const D = process.env.REACT_APP_ROLE_D;
const N = process.env.REACT_APP_ROLE_N;
const SA = process.env.REACT_APP_ROLE_SA;

const role = [ D, N, SA ];


const Patient = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { auth } = useAuth();
    
    const patients = [
        { field: "id", headerName: "ID" },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "age",
            headerName: "Age",
            type: "number",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "type",
            headerName: "Type",
            flex: 1,
        },
        {
            field: "location",
            headerName: "Location",
            flex: 1,
        },
        {
            field: "date",
            headerName: "Date",
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
                    backgroundColor: colors.primary[200],
                    borderBottom: "none",
                    color: colors.grey[900],
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
                <DataGrid checkboxSelection rows={data} columns={patients} />
            </Box>
        </Box>
    )
}

export default Patient