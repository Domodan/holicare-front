import React from 'react';
import { Box, Button, useTheme} from '@mui/material';
import { tokens } from '../../../theme';
import Header from '../../includes/Header';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { mockDataLaboratories } from '../../../data/mockData';
import {Link} from "react-router-dom";
import {AddOutlined} from "@mui/icons-material";

const Laboratory = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
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
                            New Lab
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
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${colors.grey[100]} !important`,
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