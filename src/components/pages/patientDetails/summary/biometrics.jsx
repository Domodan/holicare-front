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
  TextField
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
      label: "Weight(kgs)",
      data: [65, 59, 80, 81, 56, 55],
      fill: false,
      borderColor: "rgba(75,192,192,1)",
    },
    {
      label: "Height(cm)",
      data: [28, 48, 40, 19, 86, 27],
      fill: false,
      borderColor: "rgba(255,99,132,1)",
    },
    {
      label: "BMI(kg/m2)",
      data: [28, 8, 41, 18, 85, 29],
      fill: false,
      borderColor: "rgba(255,99,132,1)",
    },
  ],
};

const options = {
  responsive: true,
};

const Biometrics = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentView, setCurrentView] = React.useState("table");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [date, setDate] = useState("");

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
    console.log("Height:", height);
    console.log("Weight:", weight);
    console.log("BMI:", bmi);
    console.log("Date:", date);
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
              Add Anthropometric Measurements
            </Typography>
            <form onSubmit={handleSubmit}>
            <Grid container >
              <Grid item xs={12}>
                <TextField
                  required
                  name="Height"
                  label="Height"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                  required
                  name="Weight"
                  label="Weight"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                  required
                  name="BMI"
                  label="BMI"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={bmi}
                  onChange={(e) => setBmi(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                
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
                  </Grid>
              <Grid item xs={12} sm={5} />
              <Grid item xs={12} sm={4}>
                <Button variant="contained" sx={{ color: "white" }} onClick={handleSubmit}>
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
    <Box  display={"block"}>
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
            <h3>Anthropometric </h3>
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
                  Add Biometrics
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
            <TableContainer component={Paper}
            height="75vh"
            sx={{
            "& .MuiTableHead-root": {
                backgroundColor: colors.grey[900],
                borderBottom: "none",
                color: colors.primary[200],
            },
            }}>
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
            <Box height={"200px"}>
              <Line data={data} options={options} />
            </Box>
          )
          }
        </Box>
      </Container>
    </Box>
  );
};

export default Biometrics;
