import React, { useState } from "react";
import {
	TextField,
	Button,
	Box,
	Typography,
	Grid,
	FormControl,
	FormGroup,
	FormControlLabel,
	Checkbox,
	Stack, Alert, AlertTitle,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useLocation, useNavigate, Navigate} from 'react-router-dom';
import useAuth from "../../../../auth/useAuth/useAuth";
import { globalVariables } from "../../../../utils/GlobalVariables";
import { postDataTokens } from "../../../../utils/ApiCalls";

const DynamicForm = () => {
	const [values, setValues] = useState([]);
	const [diagnosis, setDiagnosis] = useState("");
	const [test, setTest] = useState(false);
	const [acknowledgement, setAcknowledgement] = useState(false);
	const [patientEmail, setPatientEmail] = useState("");
	const navigate = useNavigate();
    
    const { setAuth, setAuthed } = useAuth();
    const location = useLocation();
    const [errorMsg, setErrorMsg] = useState([]);

	const handleChange = (index, event) => {
		const newValues = [...values];
		newValues[index] = event.target.value;
		setValues(newValues);
	};
	
	const clearFields = () => {
		setErrorMsg([]);
	}

	const handleAddField = () => {
		setValues([...values, ""]);
	};

	const handleRemoveField = (index) => {
		const newValues = [...values];
		newValues.splice(index, 1);
		setValues(newValues);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		clearFields();

		const data = {
			patient_email: patientEmail,
			exhibited_symptoms: values,
			acknowledgement: acknowledgement,
			tentative_diagnosis: diagnosis,
			recommend_lab: test,
			clinical_notes: ""
		}

		if (test) {
			navigate('/add_test',
				{state: {
					data: data,
					from: location.pathname
				}}
			);
		}
		else {
			const api_endpoint = globalVariables.END_POINT_PROVISIONAL_DIAGNOSIS;

			postDataTokens(api_endpoint, data)
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
			
		}
	};

	return (
		<div>
			<Typography variant="h3" fontWeight={"bold"} m={3}>
				Signs and Symptoms
			</Typography>
				
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

			<Grid container>
				<Grid item xs={8}>
					{values.map((value, index) => (
						<Box
							key={index}
							display="flex"
							alignItems="center"
							sx={{ margin: "1% 3%" }}
						>
							<TextField
								value={value}
								onChange={(event) => handleChange(index, event)}
								label="Signs & Symptoms"
								variant="outlined"
								sx={{
								width: "80%",
								}}
							/>
							<Button
								variant="contained"
								color="error"
								onClick={() => handleRemoveField(index)}
								size="large"
								sx={{
								height: "55px",
								marginLeft: "1%",
								}}
							>
								Delete
							</Button>
						</Box>
					))}
					<Box sx={{ margin: "1% 3%" }}>
						<Button
							variant="contained"
							color="primary"
							onClick={handleAddField}
							sx={{
								height: "55px",
							}}
						>
							Add Signs & Symptoms
						</Button>
					</Box>
				</Grid>
				<Grid item xs={4}>
					<Box className="output">
						<Typography variant="h4" fontWeight={"bold"}>
							Added Signs
						</Typography>
						<List sx={{ bgcolor: "background.paper" }}>
							{values &&
								values.map((value, index) => (
									<ListItem key={value}>
										<ListItemText primary={`${index + 1} - ${value}`} />
									</ListItem>
								)
							)}
						</List>
					</Box>
				</Grid>
				<Grid item xs={12}>
					<Box sx={{ margin: "0 2%" }}>
						<TextField
							id="outlined-multiline-static"
							label="Tentative Diagnosis"
							multiline
							fullWidth
							margin="auto"
							rows={4}
							value={diagnosis}
							onChange={(e) => setDiagnosis(e.target.value)}
						/>
					</Box>
				</Grid>
				<Grid item xs={12}>
					<Box sx={{ margin: "0 2%" }}>
						<TextField
							required
							name="Patient's Email"
							label="Patient's Email"
							fullWidth
							variant="outlined"
							margin="normal"
							value={ patientEmail }
							onChange={(e) => setPatientEmail(e.target.value)}
						/>
					</Box>
				</Grid>
			</Grid>
			<Grid container>
				<Grid item xs={6}>
					<Box sx={{ margin: "0 3%" }}>
						<FormControl fullWidth margin="normal">
							<FormGroup>
								<FormControlLabel
									control={
										<Checkbox
											checked={acknowledgement}
											onChange={(e) => setAcknowledgement(e.target.checked)}
											color="primary"
										/>
									}
									label="I acknowledge that all symptoms have been captured"
								/>
							</FormGroup>
						</FormControl>
					</Box>
				</Grid>
				<Grid item xs={6}>
					<Box sx={{ margin: "0 2%" }}>
						<FormControl fullWidth margin="normal">
							<FormGroup>
								<FormControlLabel
									control={
										<Checkbox
											checked={test}
											onChange={(e) => setTest(e.target.checked)}
											color="primary"
										/>
									}
									label="Recommend LAB Test"
								/>
							</FormGroup>
						</FormControl>
					</Box>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Box m={3}>
					<Button
						variant="contained"
						size="large"
						color="primary"
						onClick={handleSubmit}
					>
						Submit
					</Button>
				</Box>
			</Grid>
		</div>
	);
};

export default DynamicForm;
