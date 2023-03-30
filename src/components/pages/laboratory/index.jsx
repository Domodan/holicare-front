import React from 'react';
import { Box, Button, useTheme} from '@mui/material';
import { tokens } from '../../../theme';
import Header from '../../includes/Header';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { mockDataLaboratories } from '../../../data/mockData';
import {Link} from "react-router-dom";
import {AddOutlined} from "@mui/icons-material";
import useAuth from '../../../auth/useAuth/useAuth';

const D = process.env.REACT_APP_ROLE_D;
const N = process.env.REACT_APP_ROLE_N;
const LA = process.env.REACT_APP_ROLE_LA;
const SA = process.env.REACT_APP_ROLE_SA;

const role = [ D, N, LA, SA ];

const Laboratory = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { auth } = useAuth();
  
    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        {
            field: "lab",
            headerName: "Laboratory",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "hospital",
            headerName: "Hospital",
            flex: 1,
        },
        {
            field: "lab_attendant",
            headerName: "Lab Attendant",
            flex: 1,
        },
        {
            field: "specialty",
            headerName: "Specialty",
            flex: 1,
        },
        
    ];

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header
                    title="LABORATORIES"
                    subtitle="Different Labs within partnering hospitals"
                />
                {role.includes(auth.role) ?
                    <Box>
                        <Link to={'/add_lab'}>
                            <Button variant="contained" component="label">
                                <AddOutlined sx={{ mr: "10px" }} />
                                New Lab
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
                    rows={mockDataLaboratories}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    )
}

export default Laboratory