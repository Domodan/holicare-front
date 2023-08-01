import React, { useState, useEffect, useRef } from "react";
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
	FormControl,
	FormGroup,
	FormControlLabel,
	Checkbox,
	Stack, Alert, AlertTitle,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { tokens } from "../../../../theme";
import { Chart, registerables } from "chart.js";
import { ArrowCircleRightOutlined } from "@mui/icons-material";
import { useLocation, Navigate } from "react-router-dom";
import { globalVariables } from "../../../../utils/GlobalVariables";
import { getDataTokens, postDataTokens } from "../../../../utils/ApiCalls";
import useAuth from "../../../../auth/useAuth/useAuth";

Chart.register(...registerables);

const data = {
	labels: ["January", "February", "March"],
	datasets: [
		{
		label: "Condition",
		data: [
			"Hymenoptera Allergy",
			"Helicobacter Pylori Gastrointestinal Tract Infection",
			"HIV resulting in other conditions",
		],
		fill: false,
		borderColor: "rgba(75,192,192,1)",
		},
		{
		label: "Status",
		data: ["Active", "Inactive", "Active"],
		fill: false,
		borderColor: "rgba(255,99,132,1)",
		},
	],
};

const Medical = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const [status, setStatus] = useState(false);
	const [condition, setCondition] = useState("");
	const [date, setDate] = useState("");
	const [state, setState] = useState({right: false});
	const [medications, setMedications] = useState([]);
    
    const { setAuth, setAuthed } = useAuth();
    const location = useLocation();
    const [errorMsg, setErrorMsg] = useState([]);

	const mounted = useRef();

	useEffect(() => {
		clearFields();
		mounted.current = true;

		const api_endpoint = globalVariables.END_POINT_MEDICATIONS;

		getDataTokens(api_endpoint)
		.then((data) => {
			console.log('====================================');
			console.log("Medication Response:", data);
			console.log('====================================');			
			if (mounted) {
				if (data?.length > 0) {
					setMedications(data);
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

	}, [ mounted, location, setAuth, setAuthed, ]);


	const clearFields = () => {
		setErrorMsg([]);
	}

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
		console.log("Form submitted!");
		console.log("Condition:", condition);
		console.log("Date:", date);
		console.log("Status:", status);
		
		const api_endpoint = globalVariables.END_POINT_MEDICATIONS;
		const body = {
			condition: condition,
			status: status,
			date_of_medication: date
		}

		postDataTokens(api_endpoint, body)
		.then((data) => {
			console.log("Data:", data);
			if (data.data) {
				const response = data.data;
				if (response?.message) {
					setErrorMsg(response.message);
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
							Add Medication
						</Typography>
						<form onSubmit={handleSubmit}>
							<Grid container >
								<Grid item xs={12}>
									<TextField
										required
										name="Drug"
										label="Drug"
										fullWidth
										variant="outlined"
										margin="normal"
										value={condition}
										onChange={(e) => setCondition(e.target.value)}
									/>
								</Grid>
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
								<Grid item xs={12} sm={2}>
									<FormControl fullWidth margin="normal">
										<FormGroup>
											<FormControlLabel
												control={
													<Checkbox
														checked={status}
														onChange={(e) => setStatus(e.target.checked)}
														color="primary"
													/>
												}
												label="Is active?"
											/>
										</FormGroup>
									</FormControl>
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
					<Box sx={{ gridRow: "1", gridColumn: "span 2" ,
						textAlign: "left",
						fontSize: "18px",
						fontWeight: "800",
						color: "#5ab2da",
						}}>
						<h3>Conditions</h3>
					</Box>
					<Box></Box>
					<Box>
						<div>
							<React.Fragment key={"right"}>
								<Button variant="contained" onClick={toggleDrawer("right", true)}>
									Add Condition
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
					<TableContainer
						component={Paper}
						m="40px 0 0 0"
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
									{data.datasets.map((dataset) => (
										<TableCell key={dataset.label}>{dataset.label}</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{data.labels.map((label, index) => (
									<TableRow key={index}>
										<TableCell>{label}</TableCell>
										{data.datasets.map((dataset, datasetIndex) => (
											<TableCell key={datasetIndex}>
												{dataset.data[index]}
											</TableCell>
										))}
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</Container>
		</Box>
	);
};

export default Medical;
