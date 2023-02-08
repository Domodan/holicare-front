import { DownloadOutlined } from '@mui/icons-material'
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material'
import React from 'react'
import LineChart from '../../includes/LineChart'
import { mockDataTests } from '../../../data/mockData'
import { tokens } from '../../../theme'
import Header from '../../includes/Header'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {Link} from "react-router-dom";
import {AddOutlined} from "@mui/icons-material";

const Tests = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        {
            field: "test",
            headerName: "Test",
            flex: 1,
            cellClassName: "name-column--cell",
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
        
    ];

    return (
        
        <Box m="20px">
            <Header title={"TESTS"} subtitle={"Diagnosis tests reports"} />
            <Box backgroundColor={colors.primary[400]}>
                <Box
                    mt="25px"
                    p="0 30px"
                    display="flex "
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Box>
                        <Typography
                            variant="h5"
                            fontWeight="600"
                            color={colors.grey[100]}
                        >
                            Diagnosis Test Chart and Report
                        </Typography>
                    </Box>
                    <Box>
                        <IconButton>
                            <DownloadOutlined
                                sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                            />
                        </IconButton>
                    </Box>
                </Box>
                <Box height="250px" m="-20px 0 0 0">
                    <LineChart isDashboard={true} />
                </Box>
            </Box>


            <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
                    <Link to={'/add-patient'}>
                        <Button
                            sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                            marginTop: "40px",
                        }}>
                            <AddOutlined sx={{ mr: "10px" }} />
                            New Test
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
                    rows={mockDataTests}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
            
        </Box>
    )
}

export default Tests