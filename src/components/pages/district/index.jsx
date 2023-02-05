import React from 'react';
import { Box, Button, useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import Header from '../../includes/Header';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { mockDataDistricts } from '../../../data/mockData';
import { Link } from 'react-router-dom';
import { AddOutlined } from '@mui/icons-material';

const District = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        {
            field: "district",
            headerName: "District",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "population",
            headerName: "Population Density",
            flex: 1,
        },
        {
            field: "physical_features",
            headerName: "Physical Features",
            flex: 1,
        },
        {
            field: "economic_activities",
            headerName: "Economic Activities",
            flex: 1,
        },
    ];

    return (
        <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
                title="DISTRICTS"
                subtitle="Different Districts within the study area"
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
                            New District
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
                    backgroundColor: colors.blueAccent[800],
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
                    rows={mockDataDistricts}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    )
}

export default District