import React, { useState, useEffect } from "react";
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
import { tokens } from "../../../../theme";
import { Chart, registerables } from "chart.js";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { ArrowCircleRightOutlined } from "@mui/icons-material";
import useAuth from "../../../../auth/useAuth/useAuth";
import { useLocation, Navigate } from "react-router-dom";
import { globalVariables } from "../../../../utils/GlobalVariables";
import { postDataTokens } from "../../../../utils/ApiCalls";
import { useCallback } from "react";

Chart.register(...registerables);

// const data = {
// 	labels: ["January", "February", "March", "April", "May", "June"],
// 	datasets: [
// 		{
// 		label: "Weight(kgs)",
// 		data: [65, 59, 80, 81, 56, 55],
// 		fill: false,
// 		borderColor: "rgba(75,192,192,1)",
// 		},
// 		{
// 		label: "Height(cm)",
// 		data: [28, 48, 40, 19, 86, 27],
// 		fill: false,
// 		borderColor: "rgba(255,99,132,1)",
// 		},
// 		{
// 		label: "BMI(kg/m2)",
// 		data: [28, 8, 41, 18, 85, 29],
// 		fill: false,
// 		borderColor: "rgba(255,99,132,1)",
// 		},
// 	],
// };

const options = {
  	responsive: true,
};

const Biometrics = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const [currentView, setCurrentView] = useState("table");
	const [height, setHeight] = useState("");
	const [weight, setWeight] = useState("");
	const [bmi, setBmi] = useState("");
	const [date, setDate] = useState("");
	const [state, setState] = useState({right: false,});
	const [biometrics, setBiometrices] = useState([]);
    
    const { setAuth, setAuthed } = useAuth();
    const location = useLocation();
    const [errorMsg, setErrorMsg] = useState([]);
    const [successMsg, setSuccessMsg] = useState([]);

	const patientID = localStorage.getItem("patientID");


	const getBiometrics = useCallback(() => {
		const api_endpoint = globalVariables.END_POINT_ANTHROPOMETRIC;
		const body = {
			action: "get_anthropometrics",
			patient_id: patientID
		}

		postDataTokens(api_endpoint, body)
		.then((data) => {
			if (data.data) {
				const response = data.data;
				if (response?.message) {
					setErrorMsg(response.message);
				}
				else {
					setBiometrices(response);
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
	}, [ patientID, setAuth, setAuthed, location ]);

	useEffect(() => {
		clearFields();
		getBiometrics();
	}, [ getBiometrics ]);

	useEffect(() => {
		const intervalRef = setInterval(clearFields, 20000);
		return () => clearInterval(intervalRef);
	}, []);

	const clearFields = () => {
		setErrorMsg([]);
		setSuccessMsg([]);
	}

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

	const handleSubmit = (e) => {
		e.preventDefault();
		
		const api_endpoint = globalVariables.END_POINT_ANTHROPOMETRIC;
		const body = {
			height: height,
			weight: weight,
			bmi: bmi,
			patient: patientID,
			date_taken: date
		}

		postDataTokens(api_endpoint, body)
		.then((data) => {
			console.log("Data:", data);
			if (data.data) {
				const response = data.data;
				if (response?.message) {
					setErrorMsg(response.message);
				}
				else if (response?.id) {
					const message = "Anthropometrics with Weight: " + response.weight + " and Height: " + response.height
					setSuccessMsg(message + " was added Succcessfull");
					getBiometrics();
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
								return <Stack sx={{ width: '100%', alignItems: "center"}} key={ key }>
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
				
				{successMsg.length > 0 || Object.keys(successMsg).length ?
					<>
						{typeof successMsg === 'object' ?
							Object.entries(successMsg).map(([key, value]) => {
								return <Stack sx={{ width: '100%', alignItems: "center"}} key={ key }>
									<Alert severity="success">
										<AlertTitle>
											<Typography variant='h1' fontSize="30px">
												<strong>Success:</strong>
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
								<Alert severity="success">
									<AlertTitle>
										<Typography variant='h1' fontSize="30px">
											<strong>Success:</strong>
										</Typography>
									</AlertTitle>
									<Typography variant='h1' fontSize="20px">
										<strong>{ successMsg }</strong>
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
							Add Anthropometric Measurements
						</Typography>
						<form onSubmit={handleSubmit}>
							<Grid container >
								<Grid item xs={12}>
									<TextField
										required
										name="Height"
										label="Height"
										fullWidth
										variant="outlined"
										margin="normal"
										value={height}
										onChange={(e) => setHeight(e.target.value)}
										InputProps={{
											startAdornment: <InputAdornment position="start">cm</InputAdornment>,
										}}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										required
										name="Weight"
										label="Weight"
										fullWidth
										variant="outlined"
										margin="normal"
										value={weight}
										onChange={(e) => setWeight(e.target.value)}
										InputProps={{
											startAdornment: <InputAdornment position="start">kg</InputAdornment>,
										}}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										required
										name="BMI"
										label="BMI"
										fullWidth
										variant="outlined"
										margin="normal"
										value={bmi}
										onChange={(e) => setBmi(e.target.value)}
										InputProps={{
											startAdornment: <InputAdornment position="start">kg/m2</InputAdornment>,
										}}
									/>
								</Grid>
								<Grid>
									<Grid item xs={12}>
										<TextField
											label="Date"
											fullWidth
											value={date}
											onChange={(e) => setDate(e.target.value)}
											margin="normal"
											type="date"
											required
										/>
									</Grid>
								</Grid>
								<Grid item xs={12} sm={5} />
								<Grid item xs={12} sm={4}>
									<Button variant="contained" sx={{ color: "white" }} onClick={handleSubmit}>
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
	
	return (
		<Box  display={"block"}>
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
						<h3>Anthropometric </h3>
					</Box>
				
					<Box >
						<Button mr={1} variant="outlined" onClick={handleViewSwitch}>
							Switch View
						</Button>
					</Box>
					<Box>
						<div>
							<React.Fragment key={"right"}>
								{!patientID && (
									<Button onClick={toggleDrawer("right", true)} variant="contained">
										Add Biometrics
									</Button>)}
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
				
				{successMsg.length > 0 || Object.keys(successMsg).length ?
					<>
						{typeof successMsg === 'object' ?
							Object.entries(successMsg).map(([key, value]) => {
								return <Stack sx={{ width: '100%', alignItems: "center"}} key={ key }>
									<Alert severity="success">
										<AlertTitle>
											<Typography variant='h1' fontSize="30px">
												<strong>Success:</strong>
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
								<Alert severity="success">
									<AlertTitle>
										<Typography variant='h1' fontSize="30px">
											<strong>Success:</strong>
										</Typography>
									</AlertTitle>
									<Typography variant='h1' fontSize="20px">
										<strong>{ successMsg }</strong>
									</Typography>
								</Alert>
							</Stack>
						}
					</>
				:''}

				<Box>
				{currentView === "table" ? (
					<TableContainer component={Paper}
						height="75vh"
						sx={{
						"& .MuiTableHead-root": {
							backgroundColor: colors.grey[900],
							borderBottom: "none",
							color: colors.primary[200],
						},
					}}>
						<Table>
							<TableHead>
								<TableRow>
									{biometrics.length > 0 || Object.keys(biometrics).length ?
										<>
											<TableCell>Month</TableCell>
											{biometrics.datasets.map((dataset) => (
												<TableCell key={dataset.label}>{dataset.label}</TableCell>
											))}
										</>
									:null}
								</TableRow>
							</TableHead>
							<TableBody>
								{biometrics.length > 0 || Object.keys(biometrics).length ?
									biometrics.labels.map((label, index) => (
										<TableRow key={index}>
											<TableCell>{label}</TableCell>
											{biometrics.datasets.map((dataset, datasetIndex) => (
												<TableCell key={datasetIndex}>
													{dataset.data[index]}
												</TableCell>
											))}
										</TableRow>
									))
								:null}
							</TableBody>
						</Table>
					</TableContainer>
				) : (
					<Box height={"200px"}>
						<Line data={biometrics} options={options} />
					</Box>
				)}
				</Box>
			</Container>
		</Box>
	);
};

export default Biometrics;
