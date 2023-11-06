import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Typography, useTheme,
	Stack,
	Alert,
    AlertTitle,
    Avatar} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../includes/Header";
import { DownloadOutlined } from "@mui/icons-material";
import { mockAppointmentRequests } from "../../../data/mockData";
import BarChart from "../../includes/BarChart";
import GeographyChart from "../../includes/GeographyChart";
import ProgressCircle from "../../includes/ProgressCircle";
import useAuth from "../../../auth/useAuth/useAuth";
import logo from "../../../assets/img/user.png";
import { getDataTokens } from "../../../utils/ApiCalls";
import { globalVariables } from "../../../utils/GlobalVariables";
import { Navigate, useLocation , useNavigate} from "react-router-dom";

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
  console.log("Current role is",auth.role);

	useEffect(() => {
		mounted.current = true;
		const endpoint = globalVariables.END_POINT_PATIENT;
		getDataTokens(endpoint)
		.then((data) => {
			if (mounted) {
				if (data?.length > 0) {
					setPatients(data);
				}
				else if (data.code === "token_not_valid") {
					setErrorMsg(data.messages[0].message);
					setAuthed(false);
					setAuth("");
					localStorage.clear();
					<Navigate
						to={"/sign_in"}
						state={{ from: location.pathname }}
						replace
					/>;
				}
				else {
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
		console.log('Clicked row:', params.row);
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
          subtitle="Welcome to Holicare"
          sx={{ color: colors.blueAccent[800] }}
        />
        {role.includes(auth.role) ? (
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
        ) : null}
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
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            mt="25px"
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
                Upcoming Appointments
              </Typography>
            </Box>
            
          </Box>
          <Box >
          {mockAppointmentRequests.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`2px  ${colors.primary[400]}`}
              p="15px"
            >
              <Box display="flex" justifyContent="space-between" gap="10px" alignContent="center">
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
              <Box display={"flex"} gap={3} >
                {transaction.date} <Typography>{transaction.time}</Typography>
              </Box>
            </Box>
          ))}
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
              <Box display="flex" justifyContent="space-between" gap="10px" alignContent="center">
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

        {/* ROW 3 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
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
				<DataGrid
					rows={patients}
					columns={column}
					onRowClick={handleRowClick}
					pageSize={10}
					rowsPerPageOptions={[10, 25, 50]}
				/>
				)}
			</Box>
        </Box>
        {/* ROW 4 */}
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
  );
};

export default DoctorDashboard;