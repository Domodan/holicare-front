import React, { useState, useEffect, useRef } from "react";
import { AddOutlined } from "@mui/icons-material";
import {
	Box,
	Button,
	useTheme,
	Avatar,
	Stack,
	Alert,
	AlertTitle,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link, Navigate, useLocation } from "react-router-dom";
import { tokens } from "../../../theme";
import Header from "../../includes/Header";
import useAuth from "../../../auth/useAuth/useAuth";
import { getDataTokens } from "../../../utils/ApiCalls";
import { globalVariables } from "../../../utils/GlobalVariables";
import { useNavigate } from "react-router-dom";

const D = process.env.REACT_APP_ROLE_D;
const N = process.env.REACT_APP_ROLE_N;
const SA = process.env.REACT_APP_ROLE_SA;

const role = [D, N, SA];

const Patient = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [patients, setPatients] = useState([]);
	const [errorMsg, setErrorMsg] = useState([]);
	const mounted = useRef();
	const { auth, setAuth, setAuthed } = useAuth();
	const location = useLocation();
	const history = useNavigate();

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
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Header title="PATIENTS" subtitle="Manage Patients " />
				{role.includes(auth.role) ? (
					<Box>
						<Link to={"/add_patient"}>
							<Button variant="contained" component="label">
								<AddOutlined sx={{ mr: "10px" }} />
								Add Patient
							</Button>
						</Link>
						&nbsp;&nbsp;&nbsp;
						<Button variant="contained" component="label">
							Upload data
							<input hidden accept="image/*" multiple type="file" />
						</Button>
					</Box>
				) : null}
			</Box>

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
	);
};

export default Patient;
