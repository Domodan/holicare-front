import React, { useEffect ,useRef, useState } from 'react';
import { Box, Button, useTheme } from '@mui/material';
import {Link} from "react-router-dom";
import { tokens } from '../../../theme';
import { DataGrid } from '@mui/x-data-grid';
import Header from '../../includes/Header';
import {AddOutlined} from "@mui/icons-material";
import { getData } from '../../../utils/ApiCalls';
import { globalVariables } from '../../../utils/GlobalVariables';
import useAuth from '../../../auth/useAuth/useAuth';

const D = process.env.REACT_APP_ROLE_D;
const N = process.env.REACT_APP_ROLE_N;
const SA = process.env.REACT_APP_ROLE_SA;

const role = [ D, N, SA ];

const Infection = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [infections, setInfections] = useState([])
    const mounted = useRef();
    const { auth } = useAuth();

    useEffect(() => {
        mounted.current = true;
        const api_endpoint = globalVariables.END_POINT_INFECTION;
        getData(api_endpoint)
        .then((data) => {
            console.log("Infections:", data)
            if (mounted) {
                if (data.length > 0) {
                    setInfections(data);
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
        { field: "id", headerName: "ID" },
        {
            field: "name",
            headerName: "Infection",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "symptom",
            headerName: "Symptoms",
            flex: 1,
        },
        {
            field: "risk_factor",
            headerName: "Risk Factors",
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
                <Header title="INFECTIONS" subtitle="Known Infections" />
                {role.includes(auth.role) ?
                    <Box>
                        <Link to={'/add_infection'}>
                            <Button variant="contained" component="label">
                                <AddOutlined sx={{ mr: "10px" }} />
                                New Infection
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
                <DataGrid rows={ infections } columns={ columns } />
            </Box>
        </Box>
    )
}

export default Infection