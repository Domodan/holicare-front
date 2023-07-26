import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
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
} from "@mui/material";
import Header from "../../includes/Header";
import { globalVariables } from "../../../utils/GlobalVariables";
import { postData } from "../../../utils/ApiCalls";
import { useLocation, useNavigate } from "react-router-dom";

const AddTest = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const location = useLocation();
  const [blood, setBlood] = useState(false);
  const [sputum, setSputum] = useState(false);
  const [urine, setUrine] = useState(false);
  const [saliva, setSaliva] = useState(false);
  const [others, setOthers] = useState("");
  const [lab, setLab] = useState("");
  const [notes, setNotes] = useState("");
  const [priority, setPriority] = useState("");

  const from = location.state?.from?.pathname || "/test";

  console.log("From:", from);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", e);
    // const url =
    //   globalVariables.BASE_URL + globalVariables.END_POINT_DISTRICT_ID;
    // postData(url, data)
    //   .then((data) => {
    //     console.log("Response Data:", data);
    //     if (data.id) {
    //       navigate(from, { replace: true });
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("Error:", error);
    //   });
  };
  const options = ["Lancet Laboratory", "MBN Clical Lab", "Crane Medical Lab"];
  const urgencyList = ["High", "Normal"];
  return (
    <Box m={3}>
      {/* <Header title="" subtitle="Request Lab Test" /> */}

      <form onSubmit={handleSubmit}>
          <Paper elevation={3} sx={{ margin: "auto" }}>
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
