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


const Patient = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
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

                <Box>
                    <Link to={'/add-patient'}>
                        <Button
                            sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}>
                            <AddOutlined sx={{ mr: "10px" }} />
                            Add Patient
                        </Button>
                    </Link>
                    <Link to={'/upload-patient'}>
                        <Button
                            sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}>
                            <AddOutlined sx={{ mr: "10px" }} />
                            Upload Data
                        </Button>
                    </Link>
                </Box>
              
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
                    backgroundColor: colors.blueAccent[700],
                    borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                    color: `${colors.greenAccent[200]} !important`,
                    },
                }}
            >
                <DataGrid checkboxSelection rows={data} columns={patients} />
            </Box>
        </Box>
    )
}

export default Patient