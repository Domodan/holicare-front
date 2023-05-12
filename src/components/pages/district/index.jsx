import React, { useState, useEffect, useRef} from 'react';
import { Box, Button, useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import Header from '../../includes/Header';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { AddOutlined } from '@mui/icons-material';
import { globalVariables } from '../../../utils/GlobalVariables';
import { getData } from '../../../utils/ApiCalls';
import useAuth from '../../../auth/useAuth/useAuth';

const SA = process.env.REACT_APP_ROLE_SA;

const District = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [districts, setDistricts] = useState([]);
    const mounted = useRef();
    const { auth } = useAuth();

    useEffect(() => {
        mounted.current = true;
        const api_endpoint = globalVariables.END_POINT_DISTRICT;
        getData(api_endpoint)
        .then((data) => {
            console.log("Data:", data)
            if (mounted) {
                if (data.length > 0) {
                    setDistricts(data);
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
            field: "district",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "region",
            headerName: "Region",
            flex: 1,
        },
        {
            field: "population",
            headerName: "Population Density",
            flex: 1,
        },
        {
            field: "created_at",
            headerName: "Date Created",
            flex: 1,
        },
        {
            field: "updated_at",
            headerName: "Date Updated",
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
                {auth.role === SA ?
                    <Box>
                        <Link to={'/add_district'}>
                            <Button variant="contained" component="label">
                                <AddOutlined sx={{ mr: "10px" }} />
                                New District
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
                    rows={ districts }
                    columns={ columns }
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    )
}

export default District