import React from 'react';
import { Box } from '@mui/material';
import BarChart from '../../includes/BarChart';
import Header from '../../includes/Header';

const Infection = () => {
    return (
            <Box m="20px">
                <Header title="INFECTIONS" subtitle="Previous Infection History" />
                <Box height="75vh">
                    <BarChart />
                </Box>
            </Box>
    )
}

export default Infection