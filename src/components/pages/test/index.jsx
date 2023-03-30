import { Box, Button, useTheme } from '@mui/material'
import React from 'react'
import { mockDataTests } from '../../../data/mockData'
import { tokens } from '../../../theme'
import Header from '../../includes/Header'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {Link} from "react-router-dom";
import {AddOutlined} from "@mui/icons-material";
import useAuth from '../../../auth/useAuth/useAuth';

const D = process.env.REACT_APP_ROLE_D;
const N = process.env.REACT_APP_ROLE_N;
const LA = process.env.REACT_APP_ROLE_LA;
const SA = process.env.REACT_APP_ROLE_SA;

const role = [ D, N, LA, SA ];

const Tests = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { auth } = useAuth();
  
    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        {
            field: "test",
            headerName: "Test",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "patient_id",
            headerName: "Patient ID",
            flex: 1,
        },
        {
            field: "forwaded_by",
            headerName: "Forwaded by",
            flex: 1,
        },
        {
            field: "test_to_run",
            headerName: "Test to run",
            flex: 1,
        },
        {
            field: "sample",
            headerName: "Sample name",
            flex: 1,
        },

        {
            field: "parameters",
            headerName: "Parameters",
            flex: 1,
        },
        {
            field: "results",
            headerName: "Results",
            flex: 1,
        },
        {
            field: "action",
            headerName: "Action",
            flex: 1,
        },
        
    ];

    return (
        
        <Box m="20px">
         <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title={"TESTS"} subtitle={"Diagnosis tests reports"} />
            {role.includes(auth.role) ?
                <Box>
                    <Link to={'/add_test'}>
                        <Button variant="contained" component="label">
                            <AddOutlined sx={{ mr: "10px" }} />
                            New Test
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
                <DataGrid
                    rows={mockDataTests}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
            
        </Box>
    )
}

export default Tests