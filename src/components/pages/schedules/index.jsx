import React, { useState } from 'react';

// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import {
	Button, FormControl, FormLabel, Input, Typography, FormGroup,
	FormControlLabel, Checkbox, TextField, Box, Modal, Stack,
	Alert, AlertTitle
} from '@mui/material';

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { globalVariables } from '../../../utils/GlobalVariables';
import { postDataToken } from '../../../utils/ApiCalls';
import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../../../auth/useAuth/useAuth';



export default function Schedules() {
	const dateToday = () => {
		const currentDate = new Date();

		// Extract date components
		const year = currentDate.getFullYear();
		const month = String(currentDate.getMonth() + 1).padStart(2, '0');
		const day = String(currentDate.getDate()).padStart(2, '0');

		// Extract time components
		const hours = String(currentDate.getHours()).padStart(2, '0');
		const minutes = String(currentDate.getMinutes()).padStart(2, '0');

		// Format the date and time
		const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;

		return formattedDate;

	}

	const [open, setOpen] = useState(false);
	const [openHour, setOpenHour] = useState(false);
	const [name, setName] = useState('');
	const [selectedDays, setSelectedDays] = useState([]);
	const [selectedDay, setSelectedDay] = useState();

	const [schedule, setSchedule] = useState({
		name: "My Schedule",
		day: [
			{
				name: "Monday",
				hour: [
					{
						startTime: "08:00",
						endTime: "12:00"
					},
					{
						startTime: "14:00",
						endTime: "17:00",
					}
				]
			},
		]
	});

	const [startTime, setStartTime] = useState(dayjs(dateToday()));
	const [endTime, setEndTime] = useState(dayjs(dateToday()));

    const { setAuth, setAuthed } = useAuth();
    const location = useLocation();
    const [errorMsg, setErrorMsg] = useState([]);

	
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const handleOpenHour = () => setOpenHour(true);
	const handleCloseHour = () => setOpenHour(false);

	const handleDayToggle = (event) => {
		const selectedDay = event.target.name;

		const newSelectedDays = [...selectedDays];

		if (event.target.checked) {
			newSelectedDays.push(selectedDay);
			setSelectedDay(selectedDay);
			handleOpenHour();
		}
		else {
			const index = newSelectedDays.indexOf(selectedDay);
			if (index > -1) {
				// setSchedule((prev) => {
				// 	const updatedDay = prev.day.filter((day) => day.name !== selectedDay);
				// 	console.log('====================================');
				// 	console.log("Updated Day:", updatedDay);
				// 	console.log('====================================');

				// 	return {
				// 		...prev,
				// 		day: updatedDay,
				// 	};
				// })
				newSelectedDays.splice(index, 1);
			}
			setSelectedDay();
			handleCloseHour();
		}

		setSelectedDays(newSelectedDays);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const api_endpoint = globalVariables.END_POINT_SCHEDULE;
		const body = {
			schedule: schedule,
			name: name,
		}

		postDataToken(api_endpoint, body)
		.then((data) => {
			console.log('====================================');
			console.log("Response:", data);
			console.log('====================================');
			if (data?.length > 0) {
				setErrorMsg('');
				handleClose();
				setSchedule({});
				setSelectedDay('');
				setSelectedDays([]);
			}
			else if (typeof data[0] === 'string'){
				if (data[0].includes("Unauthorized")) {
					setErrorMsg(data[0]);
				}
			}
            else if (data.code === "token_not_valid") {
                setErrorMsg(data.messages[0].message);
                setAuthed(false);
                setAuth("");
                localStorage.clear();
                <Navigate to={"/sign_in"} state={{ from: location.pathname }} replace />
            }
            else {
                const error = Object.entries(data).map((e) => {
                    const field = e[0].charAt(0).toUpperCase() + e[0].slice(1);
                    const errorMessage = e[1];
                    const fullErrorMessage = field + ":--- " + errorMessage;
                    return fullErrorMessage;
                })
                setErrorMsg(error);
            }
		})

	};


	const handleAddHours = (e) => {

		handleCloseHour();

		setSchedule((prev) => {
			const existingDayIndex = prev.day.findIndex((day) => day.name === selectedDay);
			
			if (existingDayIndex !== -1) {
				const existingDay = prev.day[existingDayIndex];
				const hourIndex = existingDay.hour.findIndex((hour) => hour.startTime === startTime.format('HH:mm'));
			
				let updatedDay;
				if (hourIndex !== -1) {
					const newHour = {
						...existingDay.hour[hourIndex],
						startTime: startTime.format('HH:mm'),
						endTime: endTime.format('HH:mm'),
					};
				
					updatedDay = {
						...existingDay,
						hour: [
							...existingDay.hour.slice(0, hourIndex),
							newHour,
							...existingDay.hour.slice(hourIndex + 1),
						],
					};
				}
				else {
					const newHour = {
						startTime: startTime.format('HH:mm'),
						endTime: endTime.format('HH:mm')
					}
				
					updatedDay = {
						...existingDay,
						hour: [
							...existingDay.hour,
							newHour,
						],
					};
				}
				return {
					...prev,
					day: [
						...prev.day.slice(0, existingDayIndex),
						updatedDay,
						...prev.day.slice(existingDayIndex + 1),
					],
				};
			}
			
			const newDay = {
				name: selectedDay,
				hour: [
					{
						startTime: startTime.format('HH:mm'),
						endTime: endTime.format('HH:mm'),
					},
				],
			};
			
			return {
				...prev,
				day: [...prev.day, newDay],
			};
		});  
		
	}


	return (
		<div>
			<Button variant="contained" onClick={handleOpen} sx={{p:2, m:4}}>Create Schedule</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						bgcolor: "background.paper",
						boxShadow: 24,
						p: 4,
					}}
				>
					<CloseIcon onClick={handleClose} sx={{ color: "red", float:"right" }} alignitems={ "left"} />
			
					<Typography variant="h4" align="center" gutterBottom>
						Configure Schedule
					</Typography>
					
					{errorMsg.length > 0 || Object.keys(errorMsg).length ?
						<>
							{typeof errorMsg === 'object' ?
								Object.entries(errorMsg).map(([key, value]) => {
									return <Stack sx={{ width: '100%' }} key={ key }>
										<Alert severity="error"  sx={{ mt: 1}}>
											<AlertTitle>Error</AlertTitle>
											<strong>{ value }</strong>
										</Alert>
									</Stack>
								})
							:
								<Stack sx={{ width: '100%' }} spacing={2}>
									<Alert severity="error"  sx={{ mt: 1}}>
										<AlertTitle>Error</AlertTitle>
										<strong>{ errorMsg }</strong>
									</Alert>
								</Stack>
							}
						</>
					:''}
					<form onSubmit={handleSubmit}>
						<FormControl fullWidth margin="normal">
							<FormLabel component="legend">Schedule Name</FormLabel>
							<Input value={name} onChange={(e) => setName(e.target.value)} />
						</FormControl>
					
						<FormControl component="fieldset">
							<FormLabel component="legend">Days</FormLabel>
							<FormGroup aria-label="position" row>
								<FormControlLabel
									value="Sunday"
									label="Su"
									labelPlacement="top"
									control={
										<Checkbox
											checked={selectedDays.includes('Sunday')}
											onChange={(e) => {
												handleDayToggle(e);
											}}
											name="Sunday"
										/>
									}
								/>
								<FormControlLabel
									value="Monday"
									label="M"
									labelPlacement="top"
									control={
										<Checkbox
											checked={selectedDays.includes('Monday')}
											onChange={handleDayToggle}
											name="Monday"
										/>
									}
								/>
								<FormControlLabel
									value="Tuesday"
									label="T"
									labelPlacement="top"
									control={
										<Checkbox
											checked={selectedDays.includes('Tuesday')}
											onChange={handleDayToggle}
											name="Tuesday"
										/>
									}
								/>
								<FormControlLabel
									value="Wednesday"
									label="W"
									labelPlacement="top"
									control={
										<Checkbox
											checked={selectedDays.includes('Wednesday')}
											onChange={handleDayToggle}
											name="Wednesday"
										/>
									}
								/>
								<FormControlLabel
									value="Thursday"
									label="T"
									labelPlacement="top"
									control={
										<Checkbox
											checked={selectedDays.includes('Thursday')}
											onChange={handleDayToggle}
											name="Thursday"
										/>
									}
								/>
								<FormControlLabel
									value="Friday"
									label="F"
									labelPlacement="top"
									control={
										<Checkbox
											checked={selectedDays.includes('Friday')}
											onChange={handleDayToggle}
											name="Friday"
										/>
									}
								/>
								<FormControlLabel
									value="Saturday"
									label="Sa"
									labelPlacement="top"
									control={
										<Checkbox
											checked={selectedDays.includes('Saturday')}
											onChange={handleDayToggle}
											name="Saturday"
										/>
									}
								/>
							</FormGroup>
						</FormControl>
						<FormControl fullWidth margin="normal">
							<TextField
								label="Days and Hours"
								variant='filled'
								value={selectedDays}
								InputProps={{
								  readOnly: true,
								}}
							/>
						</FormControl>
						
						<Button type="submit" sx={{mt:4}} variant="contained" color="primary">
							Submit
						</Button>
					</form>
				</Box>
			</Modal>

			<Modal
				open={openHour}
				onClose={handleCloseHour}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						bgcolor: "background.paper",
						boxShadow: 24,
						p: 4,
					}}
				>
					<CloseIcon onClick={handleCloseHour} sx={{ color: "red", float:"right" }} alignitems={ "left"} />
			
					<Typography variant="h4" align="center" gutterBottom>
						Hours Available
					</Typography>				
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<FormLabel component="legend">Time</FormLabel>
							<DemoContainer
								components={[
									'MobileTimePicker',
									'MobileTimePicker',
									'TimePicker',
									'TimePicker'
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
						<Button
							type="submit"
							sx={{mt:4}}
							variant="contained"
							color="primary"
							onClick={(e) => handleAddHours(e)}
						>
							Add
						</Button>
				</Box>
			</Modal>
			
		</div>
	);
}
