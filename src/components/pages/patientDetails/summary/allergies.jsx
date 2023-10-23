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
	Select,
	FormLabel,
	FormGroup,
	FormControlLabel,
	Checkbox,
	MenuItem,
	Stack, Alert, AlertTitle,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import { tokens } from "../../../../theme";
import { Chart, registerables } from "chart.js";
import { ArrowCircleRightOutlined } from "@mui/icons-material";
import useAuth from "../../../../auth/useAuth/useAuth";
import { useLocation, Navigate } from "react-router-dom";
import { globalVariables } from "../../../../utils/GlobalVariables";
import { postDataToken, postDataTokens } from "../../../../utils/ApiCalls";
import { useCallback } from "react";

Chart.register(...registerables);

// const data = {
// 	labels: ["2023-07-26", "2023-07-26", "2023-07-26"],
// 	datasets: [
// 		{
// 		label: "Allergen Category",
// 		data: [
// 			"Drug",
// 			"Food",
// 			"Environmental",
// 		],
// 		fill: false,
// 		borderColor: "rgba(75,192,192,1)",
// 		},
// 		{
// 		label: "Allergen",
// 		data: ["Penecillins", "Diary food", "Dust"],
// 		fill: false,
// 		borderColor: "rgba(255,99,132,1)",
// 		},
// 		{
// 		label: "Reaction",
// 		data: ["Diarrhea", "Rash", "Cough"],
// 		fill: false,
// 		borderColor: "rgba(255,99,132,1)",
// 		},
// 		{
// 		label: "Severity",
// 		data: ["Mild", "Moderate", "Severe"],
// 		fill: false,
// 		borderColor: "rgba(255,99,132,1)",
// 		},
// 		{
// 		label: "Comments",
// 		data: ["Test", "Trial", "Flu"],
// 		fill: false,
// 		borderColor: "rgba(255,99,132,1)",
// 		},
// 	],
// };

const Allergies = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const [drug, setDrug] = useState("");
	const [food, setFood] = useState("");
	const [environment, setEnvironment] = useState("");
	const [date, setDate] = useState("");
	const [reaction, setReaction] = useState("");
	const [comments, setComments] = useState("");
	const [severity, setSeverity] = useState("");
	const [value, setValue] = useState("1");
	const [state, setState] = useState({right: false,});
	const [checkedItems, setCheckedItems] = useState({});
	const [checkedFoodItems, setCheckedFoodItems] = useState({});
	const [checkedEnvironmentalItems, setCheckedEnvironmentalItems] = useState({});
	const [checkedReactionsItems, setCheckedReactionsItems] = useState({});
	const [allergies, setAllergies] = useState([]);
    
    const { setAuth, setAuthed } = useAuth();
    const location = useLocation();
    const [errorMsg, setErrorMsg] = useState([]);
    const [successMsg, setSuccessMsg] = useState([]);

	const patientID = localStorage.getItem("patientID");

	const severityList = ["Mild", "Moderate", "Severe"];

	const drugs = [
		{ id: "ACE inhibitors", label: "ACE inhibitors" },
		{
			id: "ARBs (angiotensin II receptor blockers)",
			label: "ARBs (angiotensin II receptor blockers)",
		},
		{ id: "Cephalosporins", label: "Cephalosporins" },
		{ id: "Morphine", label: "Morphine" },
		{ id: "Penicillins", label: "Penicillins" },
		{ id: "Heparins", label: "Heparins" },
		{ id: "7", label: "Other" },
	];

	const foods = [
		{ id: "Beef", label: "Beef" },
		{ id: "Milk", label: "Milk" },
		{ id: "Eggs", label: "Eggs" },
		{ id: "Chocolate", label: "Chocolate" },
		{ id: "Diary products", label: "Diary food" },
		{ id: "Soy", label: "Soy" },
		{ id: "7", label: "Other" },
	];

	const environmental = [
		{ id: "Bee stings", label: "Bee stings" },
		{ id: "Dust", label: "Dust" },
		{ id: "Latex", label: "Latex" },
		{ id: "Mold", label: "Mold" },
		{ id: "Pollen", label: "Pollen" },
		{ id: "Ragweed", label: "Ragweed" },
		{ id: "Adhesive tape", label: "Adhesive tape" },
		{ id: "7", label: "Other" },
	];

	const reactions = [
		{ id: "Fever", label: "Fever" },
		{ id: "Cough", label: "Cough" },
		{ id: "Diarrhea", label: "Diarrhea" },
		{ id: "Itching", label: "Itching" },
		{ id: "Rash", label: "Rash" },
		{ id: "Headache", label: "Headache" },
		{ id: "Adhesive tape", label: "Hypertension" },
		{ id: "7", label: "Other" },
	];

	const selectedValues = Object.entries(checkedItems)
		.filter(([key, value]) => value === true)
		.map(([key]) => key);

	const selectedFoodValues = Object.entries(checkedFoodItems)
		.filter(([key, value]) => value === true)
		.map(([key]) => key);

	const selectedEnvironmentalValues = Object.entries(checkedEnvironmentalItems)
		.filter(([key, value]) => value === true)
		.map(([key]) => key);

	const selectedReactionsValues = Object.entries(checkedReactionsItems)
		.filter(([key, value]) => value === true)
		.map(([key]) => key);


	const getAllergies = useCallback(() => {

		const api_endpoint = globalVariables.END_POINT_ALLERGIES;
		const body = {
			action: "get_allergy",
			patient_id: patientID
		}

		postDataToken(api_endpoint, body)
		.then((data) => {		
			if (data?.length > 0) {
				setAllergies(data);
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
			}, 10000);
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
		getAllergies();
	}, [ getAllergies ]);

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		setState({ ...state, [anchor]: open });
	};

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleFoodCheckboxChange = (event) => {
		setCheckedFoodItems({
			...checkedFoodItems,
			[event.target.name]: event.target.checked,
		});
	};

	const handleCheckboxChange = (event) => {
		setCheckedItems({
		...checkedItems,
		[event.target.name]: event.target.checked,
		});
	};

	const handleEnvironmentalCheckboxChange = (event) => {
		setCheckedEnvironmentalItems({
		...checkedEnvironmentalItems,
		[event.target.name]: event.target.checked,
		});
	};

	const handleReactionsCheckboxChange = (event) => {
		setCheckedReactionsItems({
		...checkedReactionsItems,
		[event.target.name]: event.target.checked,
		});
	};


	const handleSubmit = (e) => {
		e.preventDefault();

		const api_endpoint = globalVariables.END_POINT_ALLERGIES;

		const body = {
			allergen: null,
			category: null,
			reaction: null,
			severity: severity,
			comment: comments,
			patient: patientID,
			date_of_onset: date
		}
		
		if (selectedValues.length > 0) {
			body.allergen = selectedValues;
			body.category = "Drug";
		}
		
		if (selectedFoodValues.length > 0) {
			// const selectedFoods = Object.entries(checkedFoodItems).map((item) => {
			// 	return item[0];
			// })
			// body.allergen = selectedFoods;
			body.allergen = selectedFoodValues;
			body.category = "Food";
		}
		
		if (selectedEnvironmentalValues.length > 0) {
			body.allergen = selectedEnvironmentalValues;
			body.category = "Environmental";
		}
		
		if (selectedReactionsValues.length > 0) {
			body.reaction = selectedReactionsValues;
		}

		postDataTokens(api_endpoint, body)
		.then((data) => {
			if (data.data) {
				const response = data.data;
				if (response?.message) {
					setErrorMsg(response.message);
				}
				else {
					getAllergies();
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
			setTimeout(() => {
				setErrorMsg([]);
				setSuccessMsg([]);
			}, 10000);
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

				<Paper elevation={3} sx={{ marginTop: "5%", marginX: "15%" }}>
					<Box sx={{ padding: 5 }}>
						<Typography
							variant="h3"
							fontWeight={"bold"}
							gutterBottom
							sx={{ paddingBottom: 5 }}
						>
							Add Allergies
						</Typography>
						<form onSubmit={handleSubmit}>
							<Grid container>
								<Grid container></Grid>
								<Grid item xs={12}>
									<FormLabel component="legend">Select the allergens</FormLabel>
									<Box sx={{ width: "100%", typography: "body1" }}>
										<TabContext value={value}>
											<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
												<TabList
													onChange={handleChange}
													aria-label="lab API tabs example"
												>
													<Tab label="Drug" value="1" />
													<Tab label="Food" value="2" />
													<Tab label="Environmental" value="3" />
												</TabList>
											</Box>
											<TabPanel value="1">
												<FormGroup>
													{drugs.map((option) => (
														<FormControlLabel
															key={option.id}
															control={
																<Checkbox
																	checked={checkedItems[option.id] || false}
																	onChange={handleCheckboxChange}
																	name={option.id}
																/>
															}
															label={option.label}
														/>
													))}
												</FormGroup>
												{checkedItems[7] === true && (
													<TextField
														required
														name="Drug name"
														label="Drug name"
														fullWidth
														variant="outlined"
														margin="normal"
														value={drug}
														onChange={(e) => setDrug(e.target.value)}
													/>
												)}
											</TabPanel>
											<TabPanel value="2">
												<FormGroup>
													{foods.map((option) => (
														<FormControlLabel
															key={option.id}
															control={
																<Checkbox
																	checked={checkedFoodItems[option.id] || false}
																	onChange={handleFoodCheckboxChange}
																	name={option.id}
																/>
															}
															label={option.label}
														/>
													))}
												</FormGroup>
												{checkedFoodItems[7] === true && (
													<TextField
														required
														name="Food name"
														label="Food"
														fullWidth
														variant="outlined"
														margin="normal"
														value={food}
														onChange={(e) => setFood(e.target.value)}
													/>
												)}
											</TabPanel>
											<TabPanel value="3">
												<FormGroup>
													{environmental.map((option) => (
														<FormControlLabel
															key={option.id}
															control={
																<Checkbox
																	checked={
																		checkedEnvironmentalItems[option.id] ||
																		false
																	}
																	onChange={handleEnvironmentalCheckboxChange}
																	name={option.id}
																/>
															}
															label={option.label}
														/>
													))}
												</FormGroup>
												{checkedEnvironmentalItems[7] === true && (
													<TextField
														required
														name="Environmental condition"
														label="Environmental condition"
														fullWidth
														variant="outlined"
														margin="normal"
														value={environment}
														onChange={(e) => setEnvironment(e.target.value)}
													/>
												)}
											</TabPanel>
										</TabContext>
									</Box>

									<FormGroup>
										<FormLabel component="legend">
											Select the reaction
										</FormLabel>
										{reactions.map((option) => (
											<FormControlLabel
												key={option.id}
												control={
													<Checkbox
														checked={checkedReactionsItems[option.id] || false}
														onChange={handleReactionsCheckboxChange}
														name={option.id}
													/>
												}
												label={option.label}
											/>
										))}
										{checkedReactionsItems[7] === true && (
											<TextField
												required
												name="Reaction"
												label="Reaction"
												fullWidth
												variant="outlined"
												margin="normal"
												value={reaction}
												onChange={(e) => setReaction(e.target.value)}
											/>
										)}
									</FormGroup>
								</Grid>
							</Grid>
							<Grid>
								<Grid item xs={12}>
									<FormLabel component="legend">Onset Date</FormLabel>
									<TextField
										fullWidth
										value={date}
										onChange={(e) => setDate(e.target.value)}
										margin="normal"
										type="date"
										required
									/>
								</Grid>
								<Grid item xs={12}>
									<FormControl fullWidth required margin="normal">
										<InputLabel id="demo-simple-select-helper-label">
											Priority
										</InputLabel>
										<Select
											label="Select Lab"
											fullWidth
											id="demo-simple-select-helper"
											value={severity}
											onChange={(e) => setSeverity(e.target.value)}
										>
											{severityList.map((option, index) => (
												<MenuItem key={index} value={option}>
													{option}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={12}>
									<Box sx={{ margin: " 2% 0" }}>
										<TextField
											id="outlined-multiline-static"
											label="Additional Comments"
											multiline
											fullWidth
											margin="normal"
											rows={4}
											value={comments}
											onChange={(e) => setComments(e.target.value)}
										/>
									</Box>
								</Grid>
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
						<h3>Allergies</h3>
					</Box>
					<Box></Box>
					<Box>
						<div>
							<React.Fragment key={"right"}>
								<Button
									variant="contained"
									onClick={toggleDrawer("right", true)}
								>
									Add Allergies
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
					{allergies.length > 0 || Object.keys(allergies).length ?
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Date of Onset</TableCell>
									<TableCell>Category</TableCell>
									<TableCell>Allergen</TableCell>
									<TableCell>Reaction</TableCell>
									<TableCell>Severity</TableCell>
									<TableCell>Comments</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
									{allergies.map((allergy, index) => (
										<TableRow key={index}>
											<TableCell>{allergy.date}</TableCell>
											<TableCell>{allergy.category}</TableCell>
											<TableCell>{allergy.allergen}</TableCell>
											<TableCell>{allergy.reaction}</TableCell>
											<TableCell>{allergy.severity}</TableCell>
											<TableCell>{allergy.comment}</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
						:null}
					</TableContainer>
				</Box>
			</Container>
		</Box>
	);
};

export default Allergies;
