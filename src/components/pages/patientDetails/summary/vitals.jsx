import React from "react";
import { Line } from "react-chartjs-2";
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
  TextField,
} from "@mui/material";
import { tokens } from "../../../../theme";
import { Chart, registerables } from "chart.js";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { useState } from "react";
import { ArrowCircleRightOutlined } from "@mui/icons-material";

Chart.register(...registerables);

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Temp (DEG C)",
      data: [65, 59, 80, 81, 56, 55],
      fill: false,
      borderColor: "rgba(75,192,192,1)",
    },
    {
      label: "BP(mmHg)",
      data: [55, 49, 70, 71, 46, 45],
      fill: false,
      borderColor: "rgba(255,99,132,1)",
    },
    {
      label: "Pulse(beats/min)",
      data: [45, 39, 60, 61, 36, 35],
      fill: false,
      borderColor: "#6610f2",
    },
    {
      label: "R.Rate(breaths/min)",
      data: [35, 35, 50, 50, 30, 30],
      fill: false,
      borderColor: "#198754",
    },
    {
      label: "SPO@(%)",
      data: [28, 48, 46, 99, 86, 27],
      fill: false,
      borderColor: "#fd7e14",
    },
    // Add more datasets as needed
  ],
};

const options = {
  responsive: true,
};

const Vitals = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [date, setDate] = useState("");
  const [bp, setBp] = useState("");
  const [temperature, setTemperature] = useState("");
  const [pulse, setPulse] = useState("");
  const [rRate, setRRate] = useState("");
  const [spo, setSpo] = useState("");
  const [currentView, setCurrentView] = React.useState("table");

  const handleViewSwitch = () => {
    setCurrentView(currentView === "table" ? "chart" : "table");
  };

  const [state, setState] = React.useState({
    right: false,
  });

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
    console.log("Temperature:", temperature);
    console.log("Date:", date);
    console.log("BP:", bp);
    console.log("SPO:", spo);
    console.log("Respiratory Rate:", rRate);
    console.log("Pulse:", pulse);
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
          <Box sx={{ padding: 5 }}>p={1}
            <Typography
              variant="h3"
              fontWeight={"bold"}
              gutterBottom
              sx={{ paddingBottom: 5 }}
            >
              Add Vitals
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    required
                    name="Temperature"
                    label="Temperature"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    name="BP"
                    label="BP"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={bp}
                    onChange={(e) => setBp(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    name="Pulse"
                    label="Pulse"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={pulse}
                    onChange={(e) => setPulse(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    name="Respiratory Rate"
                    label="Respiratory Rate"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={rRate}
                    onChange={(e) => setRRate(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    name="SPO"
                    label="SPO"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={spo}
                    onChange={(e) => setSpo(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Date"
                    fullWidth
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    margin="normal"
                    type="date"
                    required
                  />
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
          <Box sx={{ gridRow: "1", gridColumn: "span 2", 
              textAlign: "left",
              fontSize: "18px",
              fontWeight: "800",
              color: "#5ab2da",
            }}>
            <h3>Vitals </h3>
          </Box>
          
          <Box >
          <Button mr={1} variant="outlined" onClick={handleViewSwitch}>
                Switch View
              </Button>
          </Box>
          <Box>
            <div>
              <React.Fragment key={"right"}>
                <Button onClick={toggleDrawer("right", true)} variant="contained">
                  Add Vitals
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
          {currentView === "table" ? (
            <TableContainer
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
                    <TableCell>Date</TableCell>
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
          ) : (
            <Box>
              <Line data={data} options={options} />
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Vitals;
