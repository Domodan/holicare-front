import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { Button, FormControl, FormLabel, InputLabel, Input, Typography, FormGroup, FormControlLabel, Checkbox,
} from '@mui/material';

import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SingleInputTimeRangeField } from '@mui/x-date-pickers-pro/SingleInputTimeRangeField';



export default function Schedules() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState('');
  const [breakDuration, setBreakDuration] = useState('');
  const [value, setValue] = React.useState(() => [
    dayjs('2022-04-17T15:30'),
    dayjs('2022-04-17T18:30'),
  ]);
  const [selectedDays, setSelectedDays] = useState([]);

  const handleDayToggle = (event) => {
    const selectedDay = event.target.name;
    const newSelectedDays = [...selectedDays];

    if (event.target.checked) {
      newSelectedDays.push(selectedDay);
    } else {
      const index = newSelectedDays.indexOf(selectedDay);
      if (index > -1) {
        newSelectedDays.splice(index, 1);
      }
    }

    setSelectedDays(newSelectedDays);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission logic here
    console.log(`Name: ${name}`);
    console.log(`Selected Time: ${value}`);
    // console.log(`Selected break duration Time: ${breakDuration}`);
    console.log(`Selected Days: ${selectedDays}`);
  };


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
                
            }}>
          <CloseIcon onClick={handleClose} sx={{ color: "red", float:"right" }} alignItems={ "left"} />
      
      <Typography variant="h4" align="center" gutterBottom>
        Configure Schedule
      </Typography>
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
          control={<Checkbox checked={selectedDays.includes('Sunday')} onChange={handleDayToggle} name="Sunday" />}
          label="Su"
          labelPlacement="top"
        />
        <FormControlLabel
          value="Monday"
          control={<Checkbox checked={selectedDays.includes('Monday')} onChange={handleDayToggle} name="Monday" />}
          label="M"
          labelPlacement="top"
        />
        <FormControlLabel
          value="Tuesday"
          control={<Checkbox checked={selectedDays.includes('Tuesday')} onChange={handleDayToggle} name="Tuesday" />}
          label="T"
          labelPlacement="top"
        />
        <FormControlLabel
          value="Wednesday"
          control={<Checkbox checked={selectedDays.includes('Wednesday')} onChange={handleDayToggle} name="Wednesday" />}
          label="W"
          labelPlacement="top"
        />
        <FormControlLabel
          value="Thursday"
          control={<Checkbox checked={selectedDays.includes('Thursday')} onChange={handleDayToggle} name="Thursday" />}
          label="T"
          labelPlacement="top"
        /><FormControlLabel
        value="Friday"
        control={<Checkbox checked={selectedDays.includes('Friday')} onChange={handleDayToggle} name="Friday" />}
        label="F"
        labelPlacement="top"
      /><FormControlLabel
      value="Saturday"
      control={<Checkbox checked={selectedDays.includes('Saturday')} onChange={handleDayToggle} name="Saturday" />}
      label="Sa"
      labelPlacement="top"
    />
      </FormGroup>
      </FormControl>
      
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormLabel component="legend">Time</FormLabel>
      <DemoContainer
                components={['SingleInputTimeRangeField', 'SingleInputTimeRangeField',
                'MobileTimePicker', 'MobileTimePicker', 'MobileTimePicker']}
      >
        <SingleInputTimeRangeField
          label="Shift"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
        
        {/* <DemoItem>
        <FormLabel component="legend">Break Duration</FormLabel>
          <TimePicker views={['minutes']}
          value={breakDuration}
          onChange={(e) => setBreakDuration(e.target.value)} />
        </DemoItem> */}
      </DemoContainer>
    </LocalizationProvider>
      <Button type="submit" sx={{mt:4}} variant="contained" color="primary">
        Submit
      </Button>
    </form>
        </Box>
      </Modal>
    </div>
  );
}
