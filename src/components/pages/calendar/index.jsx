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
} from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../includes/Header";


const Calendar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [currentEvents, setCurrentEvents] = useState([]);
    const [open, setOpen] = useState(false);
    const [doctorName, setDoctorName] = useState("");
    const [service, setService] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [reminder, setReminder] = useState(false);
    const [calendarApi, setCalendarApi] = useState(false);
    const [patient, setPatient] = useState("");


    const handleDateClick = (selected) => {
        console.log("yeeeee");
        setOpen(true);
        setDate(selected.view.calendar.currentData.currentDate);
        setPatient(selected)
        console.log("Selected:", selected.view);
        setCalendarApi(selected.view.calendar);
        console.log("Date:", date);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Form submitted!");
        console.log("Name:", doctorName);
        console.log("Email:", email);
        console.log("Service:", service);
        console.log("Date:", date);
        console.log("Time:", time);
        console.log("Reminder:", reminder);
        // const calendarApi = date.view.calendar;
        console.log("CalendarApi:", calendarApi);

        calendarApi.unselect();

        if (doctorName) {
        calendarApi.addEvent({
            id: `${patient.dateStr}-${doctorName}`,
            title: "Doctor Appointment",
            name: doctorName,
            email: email,
            service: service,
            time: time,
            reminder: reminder,
            start: patient.startStr,
            end: patient.endStr,
            allDay: patient.allDay,
        });
        }
        setOpen(false);
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
                                        <MenuItem value={1}>
                                            <em>Any</em>
                                        </MenuItem>
                                        <MenuItem value={10}>John Kato</MenuItem>
                                        <MenuItem value={20}>Tom Kiwanuka</MenuItem>
                                        <MenuItem value={30}>Sam Kagwa</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    label="Email"
                                    fullWidth
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    margin="normal"
                                    type="email"
                                    required
                                />
                                {/* <TextField
                                    label="Date"
                                    fullWidth
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    margin="normal"
                                    type="date"
                                    required
                                /> */}
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