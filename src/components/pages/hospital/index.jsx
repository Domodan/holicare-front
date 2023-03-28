import React, { useEffect, useState } from 'react';
import { Box, Button, useTheme } from '@mui/material';
import {Link} from "react-router-dom"
import {AddOutlined} from "@mui/icons-material";
import { tokens } from '../../../theme';
import Header from '../../includes/Header';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useRef } from 'react';
import { getData } from '../../../utils/ApiCalls';
import { globalVariables } from '../../../utils/GlobalVariables';
import useAuth from '../../../auth/useAuth/useAuth';

const SA = process.env.REACT_APP_ROLE_SA;

const Hospital = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [hospitals, setHospitals] = useState([]);
    const mounted = useRef();
    const { auth } = useAuth();

    useEffect(() => {
        mounted.current = true;
        const api_endpoint = globalVariables.END_POINT_HOSPITAL;
        getData(api_endpoint)
        .then((data) => {
            console.log("Data:", data)
            if (mounted) {
                if (data.length > 0) {
                    setHospitals(data);
                }
            }
        })
        .catch((error) => {
            console.log('====================================');
            console.log("Error:", error);
            console.log('====================================');
        });
        return () => mounted.current = false;
    }, []);
  
    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        {
            field: "hospital_name",
            headerName: "Name",
            flex: 2,
            cellClassName: "name-column--cell",
        },
        {
            field: "hospital_type",
            headerName: "Type",
            flex: 1,
        },
        {
            field: "ownership",
            headerName: "Ownership",
            flex: 1,
        },
        {
            field: "authority",
            headerName: "Authority",
            flex: 0.8,
        },
        {
            field: "region",
            headerName: "Region",
            flex: 0.8,
        },
        {
            field: "district",
            headerName: "District",
            flex: 1,
        },
        {
            field: "sub_county",
            headerName: "SubCounty",
            flex: 1,
        },
        {
            field: "longitude",
            headerName: "Longitude",
            flex: 1,
        },
        {
            field: "latitude",
            headerName: "Latitude",
            flex: 1,
        },

        
    ];
    
    
    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header
                    title="HOSPITALS"
                    subtitle="Hospitals in Districts within the study area"
                />
                {auth.role === SA ?
                    <Box>
                        <Link to={'/add_hospital'}>
                        <Button variant="contained" component="label">
                                <AddOutlined sx={{ mr: "10px" }} />
                                New Hospital
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
                <DataGrid
                    rows={ hospitals }
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    )
}

export default Hospital