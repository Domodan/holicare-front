import React, { useState, useEffect, useRef } from "react";
import {
	Tabs, Tab, Box, Paper, Grid, Typography,
	Stack, Alert, AlertTitle,
} from "@mui/material";
import useAuth from "../../../../auth/useAuth/useAuth";
import { useLocation, Navigate } from "react-router-dom";
import { globalVariables } from "../../../../utils/GlobalVariables";
import { getDataTokens } from "../../../../utils/ApiCalls";


const VisitsPage = () => {
	const [selectedTab, setSelectedTab] = useState(0);
    const [errorMsg, setErrorMsg] = useState([]);
	const [visits, setVisits] = useState([]);

    const { setAuth, setAuthed } = useAuth();
    const location = useLocation();

	const mounted = useRef();

	const tabsData = [
		[
			{
				id: 1,
				date: "10 Jul 2023",
				label: "Notes",
				diagnosis: "Flu",
				content: [{ Notes: "Prescribed antiviral medication and rest." }, { "Observed Signs": "Drink plenty of fluids and get plenty of rest." }],
			},
			{
				id: 2,
				label: "Prescriptions",
				date: "10 Jul 2023",
				diagnosis: "cough",
				content: [{ 1: "Paracetamol" }],
			},
			{
				id: 3,
				label: "Tests",
				diagnosis: "Allergy",
				date: "10 Jul 2023",
				content: [{ 1: "LFT" }],
			},
		],
		[
			{
				id: 1,
				label: "Notes",
				date: "10 Jul 2023",
				diagnosis: "Flu",
				content: [{ Notes: "Notes" }, { "Observed Signs": "Fever" }],
			},
			{
				id: 2,
				label: "Prescriptions",
				date: "10 Jul 2023",
				diagnosis: "cough",
				content: [{ 1: "Paracetamol" }],
			},
			{
				id: 3,
				label: "Tests",
				date: "10 Jul 2023",
				diagnosis: "Allergy",
				content: [{ 1: "LFT" }],
			},
		],
	];
	

	useEffect(() => {
		clearFields();
		mounted.current = true;

		const api_endpoint = globalVariables.END_POINT_VISITS;

		getDataTokens(api_endpoint)
		.then((data) => {
			console.log('====================================');
			console.log("Visits Response:", data);
			console.log('====================================');			
			if (mounted) {
				if (data?.length > 0) {
					setVisits(data);
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

	const handleTabChange = (event, newValue) => {
		setSelectedTab(newValue);
	};

	console.log("Visits:", visits);
	
	return (
		<Box display="flex" flexDirection={"column"} margin={5}>
			<div className="head">
				<Box
					sx={{
						fontSize: "18px",
						fontWeight: "800",
						color: "#5ab2da",
					}}
				>
					<h3>Visits</h3>
				</Box>
			</div>

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

			{tabsData.map((item, index) => (
				<Box margin= "1% 0">
					<Paper sx={{backgroundColor:"rgba(0, 0, 0, 0.07)",  margin: "0 2%"}} >
						<Grid item xs={12} >
							<Typography textAlign={"left"} m={1}>
								<strong>Day of the visit:</strong> {item[0].date}
							</Typography>
						</Grid>
						<Grid display={ "flex"} xs={12}>
							<Grid item xs={6}>
								<Typography textAlign={"left"} m={1}>
									<strong>Diagnosis:</strong>
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography textAlign={"left"} m={1}>
									{item[0].diagnosis}
								</Typography>
							</Grid>
						</Grid>
					</Paper>
					<Paper
						key={index}
						elevation={12}
						sx={{ display: "flex", margin: "0.5% 2%" }}
					>
						<Tabs
							orientation="vertical"
							variant="scrollable"
							value={selectedTab}
							onChange={handleTabChange}
							sx={{ borderRight: 3, borderColor: "divider" }}
						>
							{item.map((tab) => (
								<Tab key={tab.id} label={tab.label} />
							))}
						</Tabs>
						<Box sx={{ flexGrow: 1, p: 2 }}>
							{item.map((tab, index) => (
								<div
									key={tab.id}
									role="tabpanel"
									hidden={selectedTab !== index}
									id={`tabpanel-${index}`}
								>
								{selectedTab === index &&
									tab.content.map((contentItem, contentIndex) => (
										<div key={contentIndex} textAlign={"left !important"}>
											{Object.values(contentItem)[0]}
										</div>
									))}
								</div>
							))}
						</Box>
					</Paper>
				</Box>
			))}
		</Box>
	);
};

export default VisitsPage;
