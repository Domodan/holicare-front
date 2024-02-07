import React, { useState, useEffect } from "react";
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
	FormLabel,
	MenuItem,
	Stack, Alert, AlertTitle,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { ArrowCircleRightOutlined } from "@mui/icons-material";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { tokens } from "../../../../theme";
import { Chart, registerables } from "chart.js";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { globalVariables } from "../../../../utils/GlobalVariables";
import useAuth from "../../../../auth/useAuth/useAuth";
import { useLocation, Navigate } from "react-router-dom";
import { postDataToken, postDataTokens } from "../../../../utils/ApiCalls";
import { useCallback } from "react";

Chart.register(...registerables);

// const data = {
// 	labels: ["04-Jul-2023", "04-Jul-2023", "04-Jul-2023"],
// 	datasets: [
// 		{
// 		label: "Details",
// 		data: [
// 			"Pulmicort 90mcg — 90mcg, DOSE 2 ampule(s) — oral — once daily — indefinite duration",

// 			"DOSE 2 ampule(s) — oral — once daily — indefinite duration",

// 			"INDICATION Hypertension",
// 		],
// 		fill: false,
// 		borderColor: "rgba(75,192,192,1)",
// 		},
// 		{
// 		label: "Status",
// 		data: ["Active", "Inactive", "Active"],
// 		fill: false,
// 		borderColor: "rgba(255,99,132,1)",
// 		},
// 	],
// };

const Medical = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const dateToday = () => {
		const currentDate = new Date();

		// Extract date components
		const year = currentDate.getFullYear();
		const month = String(currentDate.getMonth() + 1).padStart(2, "0");
		const day = String(currentDate.getDate()).padStart(2, "0");

		// Extract time components
		const hours = String(currentDate.getHours()).padStart(2, "0");
		const minutes = String(currentDate.getMinutes()).padStart(2, "0");

		// Format the date and time
		const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;

		return formattedDate;
	};

	const [status, setStatus] = useState(false);
	const [dosage, setDosage] = useState("");
	const [drugName, setDrugName] = useState("");
	const [doseUnit, setDoseUnit] = useState("");
	const [doseRoute, setDoseRoute] = useState("");
	const [doseFrequency, setDoseFrequency] = useState("");
	const [instructions, setInstructions] = useState("");
	const [startTime, setStartTime] = useState(dayjs(dateToday()));
	const [endTime, setEndTime] = useState(dayjs(dateToday()));
	const [state, setState] = useState({right: false,});
	const [medications, setMedications] = useState([]);
    
    const { setAuth, setAuthed } = useAuth();
    const location = useLocation();
    const [errorMsg, setErrorMsg] = useState([]);
    const [successMsg, setSuccessMsg] = useState([]);

	const patientID = localStorage.getItem("patientID");

	const units = [
		{
			value: "Tablet",
			label: "Tablet",
		},
		{
			value: "mg",
			label: "mg",
		},
		{
			value: "Tablespoon",
			label: "Tablespoon",
		},
		{
			value: "Teaspoon",
			label: "Teaspoon",
		},
		{
			value: "ml",
			label: "ml",
		},
		{
			value: "Drop",
			label: "drop",
		},
		{
			value: "Unit",
			label: "unit",
		},
	];

	const route = [
		{
			value: "Oral",
			label: "Oral",
		},
		{
			value: "Inhalation",
			label: "Inhalation",
		},
		{
			value: "Vaginally",
			label: "Vaginally",
		},
		{
			value: "Intravenous",
			label: "Intravenous",
		},
		{
			value: "Intramuscular",
			label: "Intramuscular",
		},
		{
			value: "In ear",
			label: "In ear",
		},
		{
			value: "In eyes",
			label: "In eyes",
		},
	];

	const frequency = [
		{
			value: "Once daily",
			label: "Once daily",
		},
		{
			value: "Every two hours",
			label: "Every two hours",
		},
		{
			value: "Twice daily",
			label: "Twice daily",
		},
		{
			value: "Thrice daily",
			label: "Thrice daily",
		},
		{
			value: "Every six hours",
			label: "Every six hours",
		},
		{
			value: "Every four hours",
			label: "In ear",
		},
		{
			value: "Every twelve hours",
			label: "In eyes",
		},
	];


	const getMedications = useCallback(() => {
		
		const api_endpoint = globalVariables.END_POINT_MEDICATIONS;
		const body = {
			action: "get_medication",
			patient_id: patientID
		}

		postDataToken(api_endpoint, body)
		.then((data) => {		
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
			setTimeout(() => {
				setErrorMsg([]);
				setSuccessMsg([]);
			}, 20000);
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
	}, [ location, setAuth, setAuthed, patientID ]);


	useEffect(() => {
		getMedications();
	}, [ getMedications ]);


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

		const api_endpoint = globalVariables.END_POINT_MEDICATIONS;
		const body = {
			patient: patientID,
			drug_name: drugName,
			dosage: dosage,
			dose_unit: doseUnit,
			dose_route: doseRoute,
			dose_frequency: doseFrequency,
			instructions: instructions,
			start_time: startTime.format('YYYY-MM-DD HH:mm:ss'),
			end_time: endTime.format('YYYY-MM-DD HH:mm:ss'),
			status: status,
		}

		postDataTokens(api_endpoint, body)
		.then((data) => {
			console.log("Data:", data);
			if (data.data) {
				const response = data.data;
				console.log("response:", response);
				if (response?.message) {
					setErrorMsg(response.message);
				}
				else if (response.id) {
					setSuccessMsg("Medications data was added successfully");
					getMedications();
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

				<Paper elevation={3} sx={{ margin: "15%" }}>
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
							<Grid container>
								<FormLabel component="legend">Dosage Instructions</FormLabel>
								<Grid item xs={12}>
									<TextField
										required
										name="Dose"
										label="Dose"
										fullWidth
										variant="outlined"
										margin="normal"
										value={dosage}
										onChange={(e) => setDosage(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										select
										label="Dose Unit"
										fullWidth
										defaultValue="Tablet"
										margin="normal"
									>
										{units.map((option) => (
										<MenuItem
											key={option.value}
											value={option.value}
											onClick={() => setDoseUnit(option.label)}
										>
											{option.label}
										</MenuItem>
										))}
									</TextField>
								</Grid>
								<Grid item xs={12}>
									<TextField
										select
										label="Route"
										fullWidth
										defaultValue="Oral"
										margin="normal"
									>
										{route.map((option) => (
										<MenuItem
											key={option.value}
											value={option.value}
											onClick={() => setDoseRoute(option.label)}
										>
											{option.label}
										</MenuItem>
										))}
									</TextField>
								</Grid>
								<Grid item xs={12}>
									<TextField
										select
										label="Frequency"
										fullWidth
										defaultValue="Oral"
										margin="normal"
									>
										{frequency.map((option) => (
										<MenuItem
											key={option.value}
											value={option.value}
											onClick={() => setDoseFrequency(option.label)}
										>
											{option.label}
										</MenuItem>
										))}
									</TextField>
								</Grid>
								<Grid item xs={12}>
									<TextField
										id="outlined-multiline-static"
										label="Patient instructions"
										placeholder="e.g Take after eating"
										multiline
										fullWidth
										margin="normal"
										rows={4}
										value={instructions}
										onChange={(e) => setInstructions(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12}>
									<FormLabel component="legend">Drug</FormLabel>
									<TextField
										required
										name="Drug"
										label="Drug"
										fullWidth
										variant="outlined"
										margin="normal"
										value={drugName}
										onChange={(e) => setDrugName(e.target.value)}
									/>
								</Grid>
							</Grid>
							<Grid>
								<Grid item xs={12}>
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<FormLabel component="legend">
											Prescription duration
										</FormLabel>
										<DemoContainer
											components={[
												"MobileTimePicker",
												"MobileTimePicker",
												"TimePicker",
												"TimePicker",
											]}
										>
											<TimePicker
												label="From"
												value={startTime}
												onChange={(startTime) => setStartTime(startTime)}
												viewRenderers={{
												hours: renderTimeViewClock,
												minutes: renderTimeViewClock,
												seconds: renderTimeViewClock,
												}}
											/>
											<TimePicker
												label="To"
												value={endTime}
												onChange={(endTime) => setEndTime(endTime)}
												viewRenderers={{
												hours: renderTimeViewClock,
												minutes: renderTimeViewClock,
												seconds: renderTimeViewClock,
												}}
											/>
										</DemoContainer>
									</LocalizationProvider>
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
					<Box
						sx={{
						gridRow: "1",
						gridColumn: "span 2",
						textAlign: "left",
						fontSize: "18px",
						fontWeight: "800",
						color: "#5ab2da",
						}}
					>
						<h3>Medication</h3>
					</Box>
					<Box></Box>
					<Box>
						<div>
							<React.Fragment key={"right"}>
								{!patientID && (
									<Button
										variant="contained"
										onClick={toggleDrawer("right", true)}
									>
										Add Medication
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
									<TableCell>Drug</TableCell>
									<TableCell>Dosage</TableCell>
									<TableCell>Unit</TableCell>
									<TableCell>Route</TableCell>
									<TableCell>Frequency</TableCell>
									<TableCell>Start Time</TableCell>
									<TableCell>End Time</TableCell>
									<TableCell>Instructions</TableCell>
									<TableCell>Status</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{medications.length > 0 || Object.keys(medications).length ?
									medications.map((medication) => (
										<TableRow key={medication.id}>
											<TableCell>{medication.drug_name}</TableCell>
											<TableCell>{medication.dosage}</TableCell>
											<TableCell>{medication.dose_unit}</TableCell>
											<TableCell>{medication.dose_route}</TableCell>
											<TableCell>{medication.dose_frequency}</TableCell>
											<TableCell>{medication.start_time}</TableCell>
											<TableCell>{medication.end_time}</TableCell>
											<TableCell>{medication.instructions}</TableCell>
											{medication.status ?
												<TableCell>{"Active"}</TableCell>
											:
												<TableCell>{"Inactive"}</TableCell>
											}
										</TableRow>
									))
								:null}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</Container>
		</Box>
	);
};

export default Medical;
