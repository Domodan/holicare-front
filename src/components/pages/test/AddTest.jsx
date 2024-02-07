import React, { useState } from "react";
import {
	Box,
	Button,
	TextField,
	Paper,
	Typography,
	FormControl,
	FormGroup,
	FormControlLabel,
	Checkbox,
	Grid,
	FormLabel,
	Divider,
	Select,
	InputLabel,
	MenuItem,
	Stack, Alert, AlertTitle,
} from "@mui/material";
import { globalVariables } from "../../../utils/GlobalVariables";
import { postDataTokens } from "../../../utils/ApiCalls";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../../auth/useAuth/useAuth";

const AddTest = () => {
	const [blood, setBlood] = useState(false);
	const [sputum, setSputum] = useState(false);
	const [urine, setUrine] = useState(false);
	const [saliva, setSaliva] = useState(false);
	const [others, setOthers] = useState("");
	const [lab, setLab] = useState("");
	const [notes, setNotes] = useState("");
	const [priority, setPriority] = useState("");
    const [errorMsg, setErrorMsg] = useState([]);

    const { setAuth, setAuthed } = useAuth();

	const location = useLocation();
	const propsData = location.state?.data;
	console.log('propsData', propsData);

	const options = ["Lancet Laboratory", "MBN Clical Lab", "Crane Medical Lab"];
	const urgencyList = ["High", "Normal"];
	
	const clearFields = () => {
		setErrorMsg([]);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		clearFields();
		
		const api_endpoint = globalVariables.END_POINT_PROVISIONAL_DIAGNOSIS;
		const samples = [];

		if (blood)
			samples.push("Blood");
		
		if (urine)
			samples.push("Urine");
			
		if (saliva)
			samples.push("Saliva");
		
		if (sputum)
			samples.push("Sputum");
		
		const body = {
			patient_email: propsData.patient_email,
			exhibited_symptoms: propsData.exhibited_symptoms,
			tentative_diagnosis: propsData.tentative_diagnosis,
			recommend_lab: true,
			acknowledgement: propsData.acknowledgement,
			clinical_notes: notes,
			laboratory: lab,
			priority: priority,
			samples: samples,
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

	return (
		<Box m={3}>
			<form onSubmit={handleSubmit}>
				
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

				<Paper elevation={3} sx={{ margin: "normal" }}>
					<Box sx={{ padding: 5 }}>
						<Typography
							variant="h3"
							fontWeight={"bold"}
							gutterBottom
							sx={{ paddingBottom: 5 }}
						>
							Request Lab Test
						</Typography>
						<Grid container>
							<Grid item xs={12}>
								<FormControl
									sx={{ display: "flex" }}
									component="fieldset"
									variant="standard"
								>
									<FormLabel component="legend">Sample</FormLabel>
									<FormGroup>
										<FormControlLabel
										control={
											<Checkbox
											checked={blood}
											onChange={(e) => setBlood(e.target.checked)}
											name="blood"
											/>
										}
										label="Blood"
										/>
										<FormControlLabel
										control={
											<Checkbox
											checked={sputum}
											onChange={(e) => setSputum(e.target.checked)}
											name="sputum"
											/>
										}
										label="Sputum"
										/>
										<FormControlLabel
										control={
											<Checkbox
											checked={urine}
											onChange={(e) => setUrine(e.target.checked)}
											name="urine"
											/>
										}
										label="Urine"
										/>
										<FormControlLabel
										control={
											<Checkbox
											checked={saliva}
											onChange={(e) => setSaliva(e.target.checked)}
											name="saliva"
											/>
										}
										label="Saliva"
										/>
									</FormGroup>
								</FormControl>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									name="Others"
									label="Others Specify"
									fullWidth
									variant="outlined"
									margin="normal"
									value={others}
									onChange={(e) => setOthers(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12}>
								<Divider />
							</Grid>
							<Grid item xs={12}>
								<FormControl fullWidth required margin="normal">
									<InputLabel id="demo-simple-select-helper-label">
										Laboratory
									</InputLabel>
									<Select
										label="Select Lab"
										fullWidth
										id="demo-simple-select-helper"
										value={lab}
										onChange={(e) => setLab(e.target.value)}
									>
										{options.map((option, index) => (
											<MenuItem key={index} value={option}>
												{option}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12}>
								<Grid item xs={12}>
									<TextField
										id="outlined-multiline-static"
										label="Additional clinical information"
										multiline
										fullWidth
										margin="auto"
										rows={4}
										value={notes}
										onChange={(e) => setNotes(e.target.value)}
									/>
								</Grid>
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
										value={priority}
										onChange={(e) => setPriority(e.target.value)}
									>
										{urgencyList.map((option, index) => (
											<MenuItem key={index} value={option}>
												{option}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
						</Grid>
						<Grid>
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
					</Box>
				</Paper>
			</form>
		</Box>
	);
};

export default AddTest;
