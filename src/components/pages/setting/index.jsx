import React from 'react'
import { Box } from '@mui/material'
import Header from '../../includes/Header'
import LineChart from '../../includes/LineChart'

const Setting = () => {
    return (
        <Box m="20px">
            <Header title="SETTINGS" subtitle="Related Page and Permissions settings" />
            <Box height="75vh">
                <LineChart />
            </Box>
        </Box>
    )
}

export default Setting