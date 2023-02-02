import React from 'react';
import { Box } from '@mui/system';
import Header from '../../includes/Header';
import PieChart from '../../includes/PieChart';

const Laboratory = () => {
    return (
        <Box m="20px">
            <Header title="LABORATORY" subtitle="Laboratory results and information" />
            <Box height="75vh">
                <PieChart />
            </Box>
        </Box>
    )
}

export default Laboratory