import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, useTheme } from '@mui/material';
import {Link} from "react-router-dom"
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from "../../../theme";
import Header from '../../includes/Header';
import {AddOutlined} from "@mui/icons-material";
import { globalVariables } from '../../../utils/GlobalVariables';
import { getData } from '../../../utils/ApiCalls';

const RiskFactor = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [riskfactors, setRiskFactors] = useState([]);
    const mounted = useRef();

    useEffect(() => {
        mounted.current = true;
        const api_endpoint = globalVariables.END_POINT_RISK_FACTOR;
        getData(api_endpoint)
        .then((data) => {
            console.log("Risk Factors:", data)
            if (mounted) {
                if (data.length > 0) {
                    setRiskFactors(data);
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
            headerName: "Risk Factor",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "category",
            headerName: "Category",
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
                <Header title="RISK FACTORS" subtitle="Known Risk Factors" />
                <Box>
                    <Link to={'/add-riskfactor'}>
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
                            New Risk Factor
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
                <DataGrid checkboxSelection rows={ riskfactors } columns={ columns } />
            </Box>
        </Box>
    )
}

export default RiskFactor