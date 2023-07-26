import React, { useState } from "react";
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
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { tokens } from "../../../../theme";
import { Chart, registerables } from "chart.js";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import { ArrowCircleRightOutlined } from "@mui/icons-material";
Chart.register(...registerables);

const data = {
  labels: ["January", "February", "March"],
  datasets: [
    {
      label: "Condition",
      data: [
        "Hymenoptera Allergy",
        "Helicobacter Pylori Gastrointestinal Tract Infection",
        "HIV resulting in other conditions",
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

const Conditions = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [status, setStatus] = useState(false);
  const [condition, setCondition] = useState("");
  const [date, setDate] = useState("");

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
              Add Condition
            </Typography>
            <form onSubmit={handleSubmit}>
            <Grid container >
              <Grid item xs={12}>
                <TextField
                  required
                  name="Condition name"
                  label="name"
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
              <Grid item xs={12} sm={2}>
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
          <Box sx={{ gridRow: "1", gridColumn: "span 2" ,
              textAlign: "left",
              fontSize: "18px",
              fontWeight: "800",
              color: "#5ab2da",
            }}>
            <h3>Conditions</h3>
          </Box>
          <Box></Box>
          <Box>
            <div>
              <React.Fragment key={"right"}>
                <Button variant="contained" onClick={toggleDrawer("right", true)}>
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
        </Box>
      </Container>
    </Box>
  );
};

export default Conditions;
