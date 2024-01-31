import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  useTheme,
  Stack,
  Alert,
  AlertTitle,
  Avatar,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
} from "@mui/lab";
import { Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../includes/Header";
import { mockAppointmentRequests } from "../../../data/mockData";
import useAuth from "../../../auth/useAuth/useAuth";
import logo from "../../../assets/img/user.png";
import { getDataTokens } from "../../../utils/ApiCalls";
import { globalVariables } from "../../../utils/GlobalVariables";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import StatBox from "../../includes/StatBox";

const A = process.env.REACT_APP_ROLE_A;
const SA = process.env.REACT_APP_ROLE_SA;
const D = process.env.REACT_APP_ROLE_D;
const N = process.env.REACT_APP_ROLE_N;

const role = [A, SA, D, N];
console.log("the role is", role);

const DoctorDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const mounted = useRef();
  const [patients, setPatients] = useState([]);
  const [errorMsg, setErrorMsg] = useState([]);
  const { auth, setAuth, setAuthed } = useAuth();
  const location = useLocation();
  const history = useNavigate();
  console.log("Current auth is", auth);

  useEffect(() => {
    mounted.current = true;
    const endpoint = globalVariables.END_POINT_PATIENT;
    getDataTokens(endpoint)
      .then((data) => {
        if (mounted) {
          if (data?.length > 0) {
            setPatients(data);
          } else if (data.code === "token_not_valid") {
            setErrorMsg(data.messages[0].message);
            setAuthed(false);
            setAuth("");
            localStorage.clear();
            <Navigate
              to={"/sign_in"}
              state={{ from: location.pathname }}
              replace
            />;
          } else {
            setErrorMsg(data);
          }
        }
        return () => (mounted.current = false);
      })
      .catch((error) => console.log("Error:", error));
  }, [mounted, location, setAuth, setAuthed]);

  const column = [
    {
      field: "avatar",
      headerName: "Avatar",
      renderCell: (params) => (
        <Avatar
          src={params.value}
          sx={{ width: 40, height: 40 }}
          alt={params.row.name}
        />
      ),
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 0.7,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.4,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 0.8,
    },
    {
      field: "location",
      headerName: "Location",
      flex: 0.8,
    },
    {
      field: "hospital",
      headerName: "Hospital",
      flex: 1,
    },
  ];

  const handleRowClick = (params) => {
    // Handle row click event here
    console.log("Clicked row:", params.row);
    const { id } = params.row;
    //   navigate("/dashboard", { replace: true })
    history(`/details/${id}`);
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="DOCTORS'/ NURSE DASHBOARD"
          sx={{ color: colors.blueAccent[800] }}
        />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}

        {/* ROW 2 */}
        <Box
          gridColumn="span 6"
          gridRow="span 3"
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
              Appointment Requests
            </Typography>
          </Box>
          {mockAppointmentRequests.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`2px  ${colors.primary[400]}`}
              p="15px"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                gap="10px"
                alignContent="center"
              >
                <Box>
                  <img
                    alt="holicare-logo"
                    width="30px"
                    height="30px"
                    src={logo}
                    style={{ cursor: "pointer", my: 2 }}
                  />
                </Box>
                <Box>
                  <Typography alignItems="center" color={colors.grey[100]}>
                    {transaction.user}
                  </Typography>
                </Box>
              </Box>
              <Box color={colors.grey[100]}>
                {transaction.date} <Typography>{transaction.time}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" gap="10px">
                <Box
                  backgroundColor="green"
                  color={colors.grey[900]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  Accept
                </Box>
                <Box
                  backgroundColor="red"
                  color={colors.grey[900]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  Reject
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
        <Box
          gridColumn="span 3"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            mt="25px"
            p="0 30px"
            color={colors.grey[100]}
          >
            Today's Appointments
          </Typography>
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="center"
            alignItems="center"
          >
            <Box
              paddingBottom={3}
              sx={{
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              {mockAppointmentRequests.map((appointment, i) => (
                <Container key={`${appointment.txId}-${i}`}>
                  <Timeline>
                    <TimelineItem>
                      <TimelineOppositeContent
                        sx={{ m: "auto 0" }}
                        align="right"
                        variant="body2"
                        color="text.secondary"
                      >
                        {appointment.time}
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineConnector />
                        <TimelineDot></TimelineDot>
                        {/* <TimelineConnector /> */}
                      </TimelineSeparator>
                      <TimelineContent sx={{ py: "12px", px: 2 }}>
                        <Typography variant="h6" component="span">
                          {appointment.user}
                        </Typography>
                        {/* <Typography>Flu</Typography> */}
                      </TimelineContent>
                    </TimelineItem>
                  </Timeline>
                </Container>
              ))}
            </Box>
          </Box>
        </Box>
        <Box
          gridColumn="span 3"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          // overflow="auto"
        >
          <Box>
            <img
              alt="doctors-img"
              width="200px"
              height="180px"
              src={logo}
              style={{
                cursor: "pointer",
                padding: 25,
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                width: "50%",
              }}
            />
          </Box>
          <Box
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              width: "50%",
              paddingLeft: 25,
              paddingRight: 25,
            }}
          >
            <Typography color={colors.grey[100]}>
              {auth.role} - {auth.username}
            </Typography>
          </Box>
          {/* Stats */}
          <br />
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="60px"
            gap="10px"
          >
            {/* ROW 1 */}

            {/* Total Patients */}
            <Box
              gridColumn="span 6"
              height="50px"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox title="32" subtitle="Total Patients" />
            </Box>

            {/* Total staff */}
            <Box
              gridColumn="span 6"
              height="50px"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox title="325" subtitle="Appointments" />
            </Box>

            {/* Total Infections */}
            <Box
              gridColumn="span 6"
              height="50px"
              backgroundColor={colors.primary[400]}
              color={colors.grey[100]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox title="15" subtitle="Consultations" />
            </Box>

            {/* Messages */}
            <Box
              gridColumn="span 6"
              height="50px"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox title="15" subtitle="Return patients" />
            </Box>
          </Box>
        </Box>
        {/* ROW 3 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          // overflow="auto"
        >
          <Box
            m="20px 0 0 0"
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
            {errorMsg.length > 0 || Object.keys(errorMsg).length ? (
              <>
                {typeof errorMsg === "object" ? (
                  Object.entries(errorMsg).map(([key, value]) => {
                    return (
                      <Stack sx={{ width: "100%" }} key={key}>
                        <Alert severity="error" sx={{ mt: 1 }}>
                          <AlertTitle>Error</AlertTitle>
                          <strong>{value}</strong>
                        </Alert>
                      </Stack>
                    );
                  })
                ) : (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error" sx={{ mt: 1 }}>
                      <AlertTitle>Error</AlertTitle>
                      <strong>{errorMsg}</strong>
                    </Alert>
                  </Stack>
                )}
              </>
            ) : (
              <div>
                <Box
                  m="0px 0 0 0"
                  height="25vh"
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
                  <Box
                    p="0 30px"
                    display="flex "
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box paddingBottom={3}>
                      <Typography
                        variant="h5"
                        fontWeight="600"
                        color={colors.grey[100]}
                      >
                        Recent Patients
                      </Typography>
                    </Box>
                  </Box>
                  <DataGrid
                    rows={patients}
                    columns={column}
                    onRowClick={handleRowClick}
                    pageSize={10}
                    // components={{ Toolbar: GridToolbar }}
                  />
                </Box>
              </div>
            )}
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
          overflow="auto"
        >
          <Typography variant="h5" fontWeight="600">
            Next Patient details
          </Typography>
          <Box
            display="flex"
            flexDirection="row"
            // gap="3"
            alignItems="center"
            mt="25px"
          >
            <img
              alt="doctors-img"
              width="90px"
              height="90px"
              src={logo}
              style={{
                cursor: "pointer",
                // padding: 2,
              }}
            />
            <StatBox subtitle="Kiwanuka Fred" title="Patient" />
            <StatBox subtitle="Medical checkup" title="Reason" />
            <StatBox subtitle="0002200045" title="Patient ID" />
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            gap="5"
            alignItems="center"
            mt="25px"
          >
            <StatBox subtitle="12/11/2000" title="D.O.B" />
            <StatBox subtitle="Male" title="Sex" />
            <StatBox subtitle="30kgs" title="Weight" />
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            gap="5"
            alignItems="center"
            mt="25px"
          >
            <StatBox subtitle="12/11/2000 " title="Last appointment" />
            <StatBox subtitle="60cm" title="Height" />
            <StatBox subtitle="Patient ID" title="002006002" />
          </Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.blueAccent[400] }}
            margin={5}
          >
            Patient History
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            gap="2px"
            // px="30px"
          >
            <Box
              backgroundColor="green"
              color={colors.grey[900]}
              p="5px 10px"
              width="100%"
              borderRadius="4px"
            >
              Anemia
            </Box>
            <Box
              backgroundColor="red"
              color={colors.grey[900]}
              width="100%"
              p="5px 10px"
              borderRadius="4px"
            >
              Asthma
            </Box>
            <Box
              backgroundColor="yellow"
              color="black"
              p="5px 10px"
              width="100%"
              borderRadius="4px"
            >
              Fever
            </Box>
          </Box>
        </Box>
        {/* ROW 4 */}
      </Box>
    </Box>
  );
};

export default DoctorDashboard;
