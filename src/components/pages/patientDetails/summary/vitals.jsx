import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  useTheme,
  Container,
  TextField,
  Stack, Alert, AlertTitle,
} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { tokens } from "../../../../theme";
import { Chart, registerables } from "chart.js";
import { ArrowCircleRightOutlined } from "@mui/icons-material";
import { globalVariables } from "../../../../utils/GlobalVariables";
import { postDataTokens } from "../../../../utils/ApiCalls";
import { useLocation, Navigate } from 'react-router-dom';
import useAuth from "../../../../auth/useAuth/useAuth";

Chart.register(...registerables);

// const data = {
// 	labels: ["January", "February", "March", "April", "May", "June"],
// 	datasets: [
// 		{
// 			label: "Temp (DEG C)",
// 			data: [65, 59, 80, 81, 56, 55],
// 			fill: false,
// 			borderColor: "rgba(75,192,192,1)",
// 		},
// 		{
// 			label: "BP(mmHg)",
// 			data: [55, 49, 70, 71, 46, 45],
// 			fill: false,
// 			borderColor: "rgba(255,99,132,1)",
// 		},
// 		{
// 			label: "Pulse(beats/min)",
// 			data: [45, 39, 60, 61, 36, 35],
// 			fill: false,
// 			borderColor: "#6610f2",
// 		},
// 		{
// 			label: "R.Rate(breaths/min)",
// 			data: [35, 35, 50, 50, 30, 30],
// 			fill: false,
// 			borderColor: "#198754",
// 		},
// 		{
// 			label: "SPO@(%)",
// 			data: [28, 48, 46, 99, 86, 27],
// 			fill: false,
// 			borderColor: "#fd7e14",
// 		},
// 		// Add more datasets as needed
// 	],
// };

const options = {
  	responsive: true,
};

const Vitals = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [date, setDate] = useState("");
	const [bp, setBp] = useState("");
	const [temperature, setTemperature] = useState("");
	const [pulse, setPulse] = useState("");
	const [rRate, setRRate] = useState("");
	const [spo, setSpo] = useState("");
	const [patientEmail, setPatientEmail] = useState("");
	const [currentView, setCurrentView] = useState("table");
	const [state, setState] = useState({ right: false, });
	const [vitals, setVitals] = useState(null);
    
    const { setAuth, setAuthed } = useAuth();
    const location = useLocation();
    const [errorMsg, setErrorMsg] = useState([]);

	const mounted = useRef();

	const patientID = localStorage.getItem("patientID");


	useEffect(() => {
		mounted.current = true;
		clearFields();
		const api_endpoint = globalVariables.END_POINT_VITALS;
		const body = {
			action: "get_vitals",
			patient_id: patientID
		}

		postDataTokens(api_endpoint, body)
		.then((data) => {
			if (mounted) {
				console.log("Data:", data);
				if (data.data) {
					const response = data.data;
					console.log('====================================');
					console.log("Response in Vitals:", response);
					console.log("Type of:", typeof 1)
					console.log('====================================');
					if (response?.message) {
						setErrorMsg(response.message);
					}
					else {
						setVitals(response);
					}
				}
				else if (data.errorData.error) {
					const status = data.errorData.status;
					const message = data.errorData.message;
					if (status === 401 && message === 'Unauthorized') {
						setErrorMsg(message);
						setAuthed(false);
						setAuth("");
						localStorage.clear();
						<Navigate to={"/sign_in"} state={{ from: location.pathname }} replace />
					}
					else if (status === 500) {
						setErrorMsg(message);
					}
					else if (status === 404) {
						if (message.includes("Not Found")) {
							const errorMessage = "Errror: Resource Not Found, Check the URL Usage";
							setErrorMsg(errorMessage)
						}
						else {
							setErrorMsg(message);
						}
					}
					else {
						setErrorMsg(message);
					}
				}
				else {
					setErrorMsg(data);
				}
			}
		})
		.catch((error) => {
            if (error?.message) {
                if (error.message.includes("Failed to fetch")) {
                    const errorMessage = "ERR_CONNECTION_REFUSED: Please try again or reload the page";
                    setErrorMsg(errorMessage);
                }
                else {
                    setErrorMsg(error.message);
                }
            }
		});
		
		return () => mounted.current = false;
	}, [ mounted, patientID, setAuth, setAuthed, location ]);


	const handleViewSwitch = () => {
		setCurrentView(currentView === "table" ? "chart" : "table");
	};

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const clearFields = () => {
		setErrorMsg([]);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		
		const api_endpoint = globalVariables.END_POINT_VITALS;
		const body = {
			temperature: temperature,
			blood_pressure: bp,
			heart_rate: pulse,
			spo: spo,
			respiratory_rate: rRate,
			patient: patientID,
			date_of_vital: date
		}

		postDataTokens(api_endpoint, body)
		.then((data) => {
			if (data.data) {
				const response = data.data;
				if (response?.message) {
					setErrorMsg(response.message);
				}
				setVitals(response);
			}
            else if (data.errorData.error) {
                const status = data.errorData.status;
                const message = data.errorData.message;
                if (status === 401 && message === 'Unauthorized') {
                    setErrorMsg(message);
                    setAuthed(false);
                    setAuth("");
                    localStorage.clear();
                    <Navigate to={"/sign_in"} state={{ from: location.pathname }} replace />
                }
                else if (status === 500) {
                    setErrorMsg(message);
                }
                else if (status === 404) {
                    if (message.includes("Not Found")) {
                        const errorMessage = "Errror: Resource Not Found, Check the URL Usage";
                        setErrorMsg(errorMessage)
                    }
                    else {
                        setErrorMsg(message);
                    }
                }
                else {
                    setErrorMsg(message);
                }
            }
			else {
				setErrorMsg(data);
			}
		})
		.catch((error) => {
            if (error?.message) {
                if (error.message.includes("Failed to fetch")) {
                    const errorMessage = "ERR_CONNECTION_REFUSED: Please try again or reload the page";
                    setErrorMsg(errorMessage);
                }
                else {
                    setErrorMsg(error.message);
                }
            }
		});
	};

	const list = (anchor) => (
		<Box
			sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 900 }}
			role="presentation"
		>
			<React.Fragment>
				<Button variant="contained" sx={{ color: "white" }}>
					<ArrowCircleRightOutlined
						onClick={toggleDrawer(anchor, false)}
						onKeyDown={toggleDrawer(anchor, false)}
					/>
				</Button>
				
				{errorMsg.length > 0 || Object.keys(errorMsg).length ?
					<>
						{typeof errorMsg === 'object' ?
							Object.entries(errorMsg).map(([key, value]) => {
								return <Stack sx={{ width: '100%', alignItems: "center" }} key={ key }>
									<Alert severity="error">
										<AlertTitle>
											<Typography variant='h1' fontSize="30px">
												<strong>Error:</strong>
											</Typography>
										</AlertTitle>
										<Typography variant='h1' fontSize="20px">
											<strong>{ value }</strong>
										</Typography>
									</Alert>
								</Stack>
							})
						:
							<Stack sx={{ width: '100%', alignItems: 'center'}} spacing={2}>
								<Alert severity="error">
									<AlertTitle>
										<Typography variant='h1' fontSize="30px">
											<strong>Error:</strong>
										</Typography>
									</AlertTitle>
									<Typography variant='h1' fontSize="20px">
										<strong>{ errorMsg }</strong>
									</Typography>
								</Alert>
							</Stack>
						}
					</>
				:''}

				<Paper elevation={3} sx={{ marginTop: "5%", marginX: "15%" }}>
					<Box sx={{ padding: 5 }}>
						<Typography
							variant="h3"
							fontWeight={"bold"}
							gutterBottom
							sx={{ paddingBottom: 5 }}
						>
							Add Vitals
						</Typography>
						<form onSubmit={handleSubmit}>
							<Grid container>
								<Grid item xs={12}>
									<TextField
										required
										name="Temperature"
										label="Temperature"
										fullWidth
										variant="outlined"
										margin="normal"
										value={temperature}
										onChange={(e) => setTemperature(e.target.value)}
										InputProps={{
											startAdornment: <InputAdornment position="start">DEG C</InputAdornment>,
										}}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
									required
									name="BP"
									label="BP"
									fullWidth
									variant="outlined"
									margin="normal"
									value={bp}
									onChange={(e) => setBp(e.target.value)}
									InputProps={{
										startAdornment: <InputAdornment position="start">mmHg</InputAdornment>,
									}}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
									required
									name="Pulse"
									label="Pulse"
									fullWidth
									variant="outlined"
									margin="normal"
									value={pulse}
									onChange={(e) => setPulse(e.target.value)}
									InputProps={{
										startAdornment: <InputAdornment position="start">beats/min</InputAdornment>,
									}}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
									required
									name="Respiratory Rate"
									label="Respiratory Rate"
									fullWidth
									variant="outlined"
									margin="normal"
									value={rRate}
									onChange={(e) => setRRate(e.target.value)}
									InputProps={{
										startAdornment: <InputAdornment position="start">breaths/min</InputAdornment>,
									}}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
									required
									name="SPO"
									label="SPO"
									fullWidth
									variant="outlined"
									margin="normal"
									value={spo}
									onChange={(e) => setSpo(e.target.value)}
									InputProps={{
										startAdornment: <InputAdornment position="start">%</InputAdornment>,
									}}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
									required
									name="Patient's Name"
									label="Patient's Name"
									fullWidth
									variant="outlined"
									margin="normal"
									value={patientEmail}
									onChange={(e) => setPatientEmail(e.target.value)}
									InputProps={{
										startAdornment: <InputAdornment position="start">Email</InputAdornment>,
									}}
									/>
								</Grid>
							</Grid>
							<Grid>
								<Grid item xs={12}>
								<TextField
								// label="Date"
								fullWidth
								value={date}
								onChange={(e) => setDate(e.target.value)}
								margin="normal"
								type="date"
								required
								/>
							</Grid>
							<Grid item xs={12} sm={5} />
							<Grid item xs={12} sm={4}>
								<Button
								variant="contained"
								sx={{ color: "white" }}
								onClick={handleSubmit}
								>
								Submit
								</Button>
							</Grid>
							<Grid item xs={12} sm={5} />
							</Grid>
						</form>
					</Box>
				</Paper>
			</React.Fragment>
		</Box>
	);
	
	if (vitals === null) {
		return <div>Loading....</div>
	}

	return (
		<Box>
			<Container>
				<Box
					m={2}
					p={1}
					sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					}}
				>
					<Box sx={{ gridRow: "1", gridColumn: "span 2", 
						textAlign: "left",
						fontSize: "18px",
						fontWeight: "800",
						color: "#5ab2da",
					}}>
						<h3>Vitals </h3>
					</Box>
					
					<Box>
						<Button mr={1} variant="outlined" onClick={handleViewSwitch}>
							Switch View
						</Button>
					</Box>
					<Box>
						<div>
							<React.Fragment key={"right"}>
							<Button onClick={toggleDrawer("right", true)} variant="contained">
								Add Vitals
							</Button>
							<Drawer
								anchor={"right"}
								open={state["right"]}
								onClose={toggleDrawer("right", false)}
							>
								{list("right")}
							</Drawer>
							</React.Fragment>
						</div>
					</Box>
				</Box>
				
				{errorMsg.length > 0 || Object.keys(errorMsg).length ?
					<>
						{typeof errorMsg === 'object' ?
							Object.entries(errorMsg).map(([key, value]) => {
								return <Stack sx={{ width: '100%', mb: 2, alignItems: "center" }} key={ key }>
									<Alert severity="error"  sx={{ mt: 1}}>
										<AlertTitle>
											<Typography variant='h1' fontSize="30px">
												<strong>Error:</strong>
											</Typography>
										</AlertTitle>
										<Typography variant='h1' fontSize="20px">
											<strong>{ value }</strong>
										</Typography>
									</Alert>
								</Stack>
							})
						:
							<Stack sx={{ width: '100%', mb: 2, alignItems: 'center'}} spacing={2}>
								<Alert severity="error"  sx={{ mt: 1}}>
									<AlertTitle>
										<Typography variant='h1' fontSize="30px">
											<strong>Error:</strong>
										</Typography>
									</AlertTitle>
									<Typography variant='h1' fontSize="20px">
										<strong>{ errorMsg }</strong>
									</Typography>
								</Alert>
							</Stack>
						}
					</>
				:''}

				<Box>
					{currentView === "table" ? (
					<TableContainer
						height="75vh"
						sx={{
						"& .MuiTableHead-root": {
							backgroundColor: colors.grey[900],
							borderBottom: "none",
							color: colors.primary[200],
						},
						}}
					>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Date</TableCell>
										{vitals.datasets.map((dataset) => (
											<TableCell key={dataset.label}>{dataset.label}</TableCell>
										))}
								</TableRow>
							</TableHead>
							<TableBody>
								{vitals.labels.map((label, index) => (
									<TableRow key={index}>
										<TableCell>{label}</TableCell>
										{vitals.datasets.map((dataset, datasetIndex) => (
											<TableCell key={datasetIndex}>
												{dataset.data[index]}
											</TableCell>
										))}
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					) : (
					<Box>
						<Line data={vitals} options={options} />
					</Box>
					)}
				</Box>
			</Container>
		</Box>
	);
};

export default Vitals;
