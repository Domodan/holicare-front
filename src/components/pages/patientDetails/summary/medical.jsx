import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  useTheme,
  Container,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormLabel,
  MenuItem,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { ArrowCircleRightOutlined } from "@mui/icons-material";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { tokens } from "../../../../theme";
import { Chart, registerables } from "chart.js";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

Chart.register(...registerables);

const data = {
  labels: ["04-Jul-2023", "04-Jul-2023", "04-Jul-2023"],
  datasets: [
    {
      label: "Details",
      data: [
        "Pulmicort 90mcg — 90mcg, DOSE 2 ampule(s) — oral — once daily — indefinite duration",

        "DOSE 2 ampule(s) — oral — once daily — indefinite duration",

        "INDICATION Hypertension",
      ],
      fill: false,
      borderColor: "rgba(75,192,192,1)",
    },
    {
      label: "Status",
      data: ["Active", "Inactive", "Active"],
      fill: false,
      borderColor: "rgba(255,99,132,1)",
    },
  ],
};

const Medical = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [status, setStatus] = useState(false);
  const [condition, setCondition] = useState("");
  const dateToday = () => {
    const currentDate = new Date();

    // Extract date components
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    // Extract time components
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");

    // Format the date and time
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;

    return formattedDate;
  };
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState(dayjs(dateToday()));
  const [endTime, setEndTime] = useState(dayjs(dateToday()));

  const [state, setState] = React.useState({
    right: false,
  });
  const units = [
    {
      value: "Tablet",
      label: "Tablet",
    },
    {
      value: "mg",
      label: "mg",
    },
    {
      value: "Tablespoon",
      label: "Tablespoon",
    },
    {
      value: "Teaspoon",
      label: "Teaspoon",
    },
    {
      value: "ml",
      label: "ml",
    },
    {
      value: "Drop",
      label: "drop",
    },
    {
      value: "Unit",
      label: "unit",
    },
  ];
  const route = [
    {
      value: "Oral",
      label: "Oral",
    },
    {
      value: "Inhalation",
      label: "Inhalation",
    },
    {
      value: "Vaginally",
      label: "Vaginally",
    },
    {
      value: "Intravenous",
      label: "Intravenous",
    },
    {
      value: "Intramuscular",
      label: "Intramuscular",
    },
    {
      value: "In ear",
      label: "In ear",
    },
    {
      value: "In eyes",
      label: "In eyes",
    },
  ];
  const frequency = [
    {
      value: "Once daily",
      label: "Once daily",
    },
    {
      value: "Every two hours",
      label: "Every two hours",
    },
    {
      value: "Twice daily",
      label: "Twice daily",
    },
    {
      value: "Thrice daily",
      label: "Thrice daily",
    },
    {
      value: "Every six hours",
      label: "Every six hours",
    },
    {
      value: "Every four hours",
      label: "In ear",
    },
    {
      value: "Every twelve hours",
      label: "In eyes",
    },
  ];
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
    console.log("Condition:", condition);
    console.log("Date:", date);
    console.log("Status:", status);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 900 }}
      role="presentation"
    >
      <React.Fragment>
        <Button variant="contained" sx={{ color: "white" }}>
          <ArrowCircleRightOutlined
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
          />
        </Button>
        <Paper elevation={3} sx={{ margin: "15%" }}>
          <Box sx={{ padding: 5 }}>
            <Typography
              variant="h3"
              fontWeight={"bold"}
              gutterBottom
              sx={{ paddingBottom: 5 }}
            >
              Add Medication
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container>
                <FormLabel component="legend">Dosage Instructions</FormLabel>
                <Grid item xs={12}>
                  <TextField
                    required
                    name="Dose"
                    label="Dose"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    select
                    label="Dose Unit"
                    fullWidth
                    defaultValue="Tablet"
                    margin="normal"
                  >
                    {units.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    select
                    label="Route"
                    fullWidth
                    defaultValue="Oral"
                    margin="normal"
                  >
                    {route.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    select
                    label="Frequency"
                    fullWidth
                    defaultValue="Oral"
                    margin="normal"
                  >
                    {frequency.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Patient instructions"
                    placeholder="e.g Take after eating"
                    multiline
                    fullWidth
                    margin="auto"
                    rows={4}
                    // value={diagnosis}
                    // onChange={(e) => setDiagnosis(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormLabel component="legend">Drug</FormLabel>
                  <TextField
                    required
                    name="Drug"
                    label="Drug"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <FormLabel component="legend">
                      Prescription duration
                    </FormLabel>
                    <DemoContainer
                      components={[
                        "MobileTimePicker",
                        "MobileTimePicker",
                        "TimePicker",
                        "TimePicker",
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
                  <FormControl fullWidth margin="normal">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={status}
                            onChange={(e) => setStatus(e.target.checked)}
                            color="primary"
                          />
                        }
                        label="Is active?"
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>

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
            </form>
          </Box>
        </Paper>
      </React.Fragment>
    </Box>
  );
  return (
    <Box>
      <Container>
        <Box
          m={2}
          p={1}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              gridRow: "1",
              gridColumn: "span 2",
              textAlign: "left",
              fontSize: "18px",
              fontWeight: "800",
              color: "#5ab2da",
            }}
          >
            <h3>Conditions</h3>
          </Box>
          <Box></Box>
          <Box>
            <div>
              <React.Fragment key={"right"}>
                <Button
                  variant="contained"
                  onClick={toggleDrawer("right", true)}
                >
                  Add Condition
                </Button>
                <Drawer
                  anchor={"right"}
                  open={state["right"]}
                  onClose={toggleDrawer("right", false)}
                >
                  {list("right")}
                </Drawer>
              </React.Fragment>
            </div>
          </Box>
        </Box>
        <Box>
          <TableContainer
            component={Paper}
            m="40px 0 0 0"
            height="75vh"
            sx={{
              "& .MuiTableHead-root": {
                backgroundColor: colors.grey[900],
                borderBottom: "none",
                color: colors.primary[200],
              },
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Start Date</TableCell>
                  {data.datasets.map((dataset) => (
                    <TableCell key={dataset.label}>{dataset.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.labels.map((label, index) => (
                  <TableRow key={index}>
                    <TableCell>{label}</TableCell>
                    {data.datasets.map((dataset, datasetIndex) => (
                      <TableCell key={datasetIndex}>
                        {dataset.data[index]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </Box>
  );
};

export default Medical;
