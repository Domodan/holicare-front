

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
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate} from 'react-router-dom';

const DynamicForm = () => {
  const [values, setValues] = useState([]);
  const [diagnosis, setDiagnosis] = useState("");
  const [test, setTest] = useState(false);
  const [acknowledgement, setAcknowledgement] = useState(false);
  const navigate = useNavigate();

  const handleChange = (index, event) => {
    const newValues = [...values];
    newValues[index] = event.target.value;
    setValues(newValues);
  };

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
    console.log("Form submitted!");
    console.log("Signs and Symptoms:", values);
    console.log("Test:", test);
    console.log("Acknowledgement:", acknowledgement);
    console.log("Diagnosis:", diagnosis);
    if (test) {
      // Redirect to the success page
      navigate('/add_test');
    }
  };

  return (
    <div>
      <Typography variant="h3" fontWeight={"bold"} m={3}>
        Signs and Symptoms
      </Typography>

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
                ))}
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
