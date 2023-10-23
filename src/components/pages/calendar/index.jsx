import React, { useState } from 'react';
import { formatDate } from "@fullcalendar/core";
import daygrid from "@fullcalendar/daygrid";
import interaction from "@fullcalendar/interaction";
import list from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timegrid from "@fullcalendar/timegrid";
import CloseIcon from '@mui/icons-material/Close';
import {
    Box, List, ListItem, ListItemText, Typography, useTheme,
    Modal, TextField, Button, Select, InputLabel, MenuItem,
    FormControl, FormGroup, FormControlLabel, Checkbox,
    Stack, Alert, AlertTitle,
} from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../includes/Header";
import { globalVariables } from '../../../utils/GlobalVariables';
import { postDataTokens } from '../../../utils/ApiCalls';
import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../../../auth/useAuth/useAuth';


const Calendar = () => {
    const userEmail = localStorage.getItem("email");
    const username = localStorage.getItem("username");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [currentEvents, setCurrentEvents] = useState([]);
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState(userEmail);
    const [doctorName, setDoctorName] = useState("");
    const [service, setService] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [reminder, setReminder] = useState(false);
    const [calendarApi, setCalendarApi] = useState(false);
    const [patient, setPatient] = useState("");
    const [doctors, setDoctors] = useState();
    
    const { setAuth, setAuthed } = useAuth();
    const location = useLocation();
    const [errorMsg, setErrorMsg] = useState([]);

    const getAvailableDoctors = (day) => {
        setErrorMsg([]);
        const api_endpoint = globalVariables.END_POINT_SCHEDULE;
        const body = {
            action: "get_doctor",
            day: day
        }
        postDataTokens(api_endpoint, body)
        .then((data) => {
            // console.log('====================================');
            // console.log("Doctor Response:", data);
            // console.log('====================================');
            if (data.data) {
                const availableDoctors = data.data;
                if (availableDoctors[0].id && availableDoctors?.length > 0) {
                    setDoctors(availableDoctors);
                    setOpen(true);
                }
                else {
                    if (availableDoctors[0].includes("Day matching")) {
                        setErrorMsg("There are No Doctors available of this Day: " + day);
                    }
                    else {
                        setErrorMsg(availableDoctors[0]);
                    }
                }
                setTimeout(() => {
                    setErrorMsg([]);
                }, 10000);
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
                else {
                    setErrorMsg(message);
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
    }

    const handleDateClick = (selected) => {
        // const dateObj = new Date(selected.view.calendar.currentData.currentDate);
        setPatient(selected)
        setCalendarApi(selected.view.calendar);
    };

    const handleDayClick = (day) => {
        const dateObj = new Date(day.date);
        const daySelected = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
        const dateSelected = day.dateStr;
        setDate(dateSelected);
        getAvailableDoctors(daySelected);
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        const api_endpoint = globalVariables.END_POINT_APPOINTMENT;
        const body = {
            doctor: doctorName,
            email: email,
            username: username,
            service: service,
            time: time,
            reminder: reminder,
            date: date,
        }

        postDataTokens(api_endpoint, body)
        .then((data) => {
            console.log("Response:", data);
            if (data.data) {
                const appointments = data.data;
                console.log("Appointments:", appointments)
                if (appointments?.length > 0) {
                    console.log("Appointment Created Successfully");

                    calendarApi.unselect();
            
                    if (doctorName) {
                        calendarApi.addEvent({
                            id: `${patient.dateStr}-${doctorName}`,
                            title: "Doctor Appointment",
                            name: doctorName,
                            email: userEmail,
                            service: service,
                            time: time,
                            reminder: reminder,
                            start: patient.startStr,
                            end: patient.endStr,
                            allDay: patient.allDay,
                        });
                        console.log("Patient:", patient);
                    }
                    setOpen(false);
                }
                else if (appointments.error) {
                    setErrorMsg(appointments.message);
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


    const handleEventClick = (selected) => {
        if (
        window.confirm(
            `Are you sure you want to delete the event '${selected.event.title}'`
        )) {
            selected.event.remove();
        }
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <Box m="20px">
            <Header title="Appointments" />

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
                                    <Typography variant='h1' fontSize="25px">
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
                                <Typography variant='h1' fontSize="25px">
                                    <strong>{ errorMsg }</strong>
                                </Typography>
                            </Alert>
                        </Stack>
                    }
                </>
            :''}

            <Box display="flex" justifyContent="space-between">

                {/* CALENDAR SIDEBAR */}
                <Box
                    flex="1 1 20%"
                    backgroundColor={colors.primary[400]}
                    p="15px"
                    borderRadius="4px"
                >
                    <Typography variant="h5">Events</Typography>
                    <List>
                        {currentEvents.map((event) => (
                        <ListItem
                            key={event.id}
                            sx={{
                            backgroundColor: colors.greenAccent[500],
                            margin: "10px 0",
                            borderRadius: "2px",
                            }}
                        >
                            <ListItemText
                                primary={event.title}
                                secondary={
                                    <Typography>
                                        {formatDate(event.start, {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </Typography>
                                }
                            />
                            <ListItemText
                                primary={event.service}
                                secondary={
                                    <Typography>
                                        {event.reminder ? "Reminder set" : "No reminder set"}
                                    </Typography>
                                }
                            />
                        </ListItem>
                        ))}
                    </List>
                </Box>

                {/* CALENDAR */}
                <Box flex="1 1 100%" ml="15px">
                    <FullCalendar
                        height="75vh"
                        plugins={[daygrid, timegrid, interaction, list]}
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                        }}
                        initialView="dayGridMonth"
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        select={handleDateClick}
                        dateClick={handleDayClick}
                        eventClick={handleEventClick}
                        eventsSet={(events) => setCurrentEvents(events)}
                        initialEvents={[
                        {
                            id: "12315",
                            title: "Doctor Appointment",
                            date: "2022-09-14",
                            name: "Mbabazi",
                            email: "mbabazi@gmail.com",
                            service: "Outpatient Department",
                            time: "12:00am",
                            reminder: "true",
                        },
                        {
                            id: "1231",
                            title: "Doctor Appointment",
                            date: "2022-09-28",
                            name: "Mbabazi",
                            email: "mbabazi@gmail.com",
                            service: "Outpatient Department",
                            time: "1:00am",
                            reminder: "true",
                        },
                        ]}
                    />
                    <Modal open={open} onClose={handleClose}>
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
                            {errorMsg.length > 0 || Object.keys(errorMsg).length ?
                                <>
                                    {typeof errorMsg === 'object' ?
                                        Object.entries(errorMsg).map(([key, value]) => {
                                            return <Stack sx={{ width: '100%', mb: 2 }} key={ key }>
                                                <Alert severity="error"  sx={{ mt: 1}}>
                                                    <AlertTitle>
                                                        <Typography variant='h1' fontSize="25px">
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
                                        <Stack sx={{ width: '100%', mb: 2 }} spacing={2}>
                                            <Alert severity="error"  sx={{ mt: 1}}>
                                                <AlertTitle>
                                                    <Typography variant='h1' fontSize="25px">
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

                            <CloseIcon onClick={handleClose} sx={{ color: "red", float:"right" }} alignitems={ "left"} />
                            {/* Add your form components here */}
                            {/* Doctors field should be a select */}
                            {/* Doctors schedule will be set along with the doctors schedule from the backend  */}
                            {/* search patient by phone number*/}
                            
                            <Typography variant="h4" align="center" gutterBottom>
                                Schedule an Appointment
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                
                                <TextField
                                    label="Reason for the visit"
                                    fullWidth
                                    value={service}
                                    onChange={(e) => setService(e.target.value)}
                                    margin="normal"
                                    type="text"
                                    required
                                />
                                
                                <FormControl fullWidth required margin="normal">
                                    <InputLabel id="demo-simple-select-helper-label">Doctors' Name</InputLabel>
                                    <Select
                                        label="Doctors' Name"
                                        fullWidth
                                        id="demo-simple-select-helper"
                                        value={doctorName}
                                        onChange={(e) => setDoctorName(e.target.value)}
                                    >
                                        <MenuItem value={""}><em>None</em></MenuItem>
                                        {doctors?.length > 0 ?
                                            doctors.map((doctor, index) => {
                                                return <MenuItem value={doctor.id} key={index}>
                                                    {doctor.name}
                                                </MenuItem>
                                            })
                                        :null}
                                    </Select>
                                </FormControl>
                                <TextField
                                    label="Email"
                                    fullWidth
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    margin="normal"
                                    // variant='filled'
                                    // InputProps={{
                                    //   readOnly: true,
                                    // }}
                                    type="email"
                                    required
                                />
                                <TextField
                                    label="Time"
                                    fullWidth
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    margin="normal"
                                    type="time"
                                    required
                                />
                                <FormControl fullWidth margin="normal" >
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={reminder}
                                                    onChange={(e) => setReminder(e.target.checked)}
                                                    color="primary"
                                                />
                                            }
                                            label="Send reminder"
                                        />
                                    </FormGroup>
                                </FormControl>
                                <Button type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>
                            </form>
                        </Box>
                    </Modal>
                </Box>
            </Box>
        </Box>
    )
}

export default Calendar