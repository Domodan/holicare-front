 import React from 'react';
import {
    Box,
    Button,
    IconButton,
    Typography,
    useTheme
} from '@mui/material';
import { tokens } from '../../../theme';
import Header from '../../includes/Header';
import { DownloadOutlined } from '@mui/icons-material';
import StatBox from '../../includes/StatBox';
import LineChart from '../../includes/LineChart';
import { mockTransactions } from '../../../data/mockData';
import BarChart from '../../includes/BarChart';
import GeographyChart from '../../includes/GeographyChart';
import ProgressCircle from '../../includes/ProgressCircle';
import useAuth from '../../../auth/useAuth/useAuth';

const A = process.env.REACT_APP_ROLE_A;
const SA = process.env.REACT_APP_ROLE_SA;

const role = [ A, SA, ];

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { auth } = useAuth();

    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Welcome to Holicare" sx={{color: colors.blueAccent[800]}} />
                {role.includes(auth.role) ?
                    <Box>
                        <Button
                            sx={{
                            backgroundColor: colors.primary[500],
                            color: "#fff",
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                            }}
                        >
                            <DownloadOutlined sx={{ mr: "10px" }} />
                            Download Reports
                        </Button>
                    </Box>
                :null}
            </Box>
        
            {/* GRID & CHARTS */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                {/* ROW 1 */}
                
                {/* Total Patients */}
                <Box
                    gridColumn="span 3"
                    height="100px"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                
                <StatBox
                    title="32,441"
                    subtitle="Health Centers"
  
                />
                </Box>

                {/* Total staff */}
                <Box
                    gridColumn="span 3"
                    height="100px"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                <StatBox
                    title="1,325"
                    subtitle="Doctors"
                />
                </Box>

                {/* Total Infections */}
                <Box
                    gridColumn="span 3"
                    height="100px"
                    backgroundColor={colors.primary[400]}
                    color={colors.grey[100]} 
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                <StatBox
                    title="15"
                    subtitle="Patients"
                     
                />
                </Box>

                {/* Messages */}
                <Box
                    gridColumn="span 3"
                    height="100px"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                <StatBox
                    title="15"
                    subtitle="Laboratories"
                    
                />
                </Box>
              
                {/* ROW 2 */}
                <Box
                    gridColumn="span 8"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                >
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
                            Diagnosis Report Chart
                        </Typography>
                        
                        </Box>
                        <Box>
                            <IconButton>
                                <DownloadOutlined
                                    sx={{ fontSize: "26px", color: colors.blueAccent[500] }}
                                />
                            </IconButton>
                        </Box>
                        
                    </Box>
                    <Box height="250px" m="-20px 0 0 0">
                        <LineChart isDashboard={true} />
                    </Box>
                </Box>
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    overflow="auto"
                >
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom={`2px solid ${colors.primary[500]}`}
                        colors={colors.grey[100]}
                        p="15px"
                    >
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                            Special Cases
                        </Typography>
                    </Box>
                    {mockTransactions.map((transaction, i) => (
                        <Box
                            key={`${transaction.txId}-${i}`}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`2px  ${colors.primary[400]}`}
                            p="15px"
                        >
                            <Box>
                                <Typography
                                    color={colors.blueAccent[500]}
                                    variant="h5"
                                    fontWeight="600"
                                >
                                    {transaction.txId}
                                </Typography>
                                <Typography color={colors.grey[100]}>
                                    {transaction.user}
                                </Typography>
                            </Box>
                            <Box color={colors.grey[100]}>{transaction.date}</Box>
                            <Box
                                backgroundColor={colors.primary[600]}
                                color={colors.grey[900]}
                                p="5px 10px"
                                borderRadius="4px"
                            >
                                View
                            </Box>
                        </Box>
                    ))}
                </Box>
        
                {/* ROW 3 */}
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    p="30px"
                >
                    <Typography variant="h5" fontWeight="600">
                        Patients by Gender
                    </Typography>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mt="25px"
                    >
                        <ProgressCircle size="125" />
                        <Typography
                            variant="h5"
                            color={colors.blueAccent[400]}
                            sx={{ mt: "15px" }}
                        >
                            $48,352 revenue generated
                        </Typography>
                        <Typography>Includes extra misc expenditures and costs</Typography>
                    </Box>
                </Box>
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                >
                    <Typography
                        variant="h5"
                        fontWeight="600"
                        sx={{ padding: "30px 30px 0 30px" }}
                    >
                        Patients by group
                    </Typography>
                    <Box height="250px" mt="-20px">
                        <BarChart isDashboard={true} />
                    </Box>
                </Box>
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    padding="30px"
                >
                    <Typography
                        variant="h5"
                        fontWeight="600"
                        sx={{ marginBottom: "15px" }}
                    >
                        Diagnosis by Infection
                    </Typography>
                    <Box height="200px">
                        <GeographyChart isDashboard={true} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Dashboard