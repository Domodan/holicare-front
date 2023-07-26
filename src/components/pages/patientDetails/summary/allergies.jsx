import React, { useState } from "react";
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
  Select,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  MenuItem,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
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
  labels: ["2023-07-26", "2023-07-26", "2023-07-26"],
  datasets: [
    {
      label: "Allergen Category",
      data: [
        "Drug",
        "Food",
        "Environmental",
      ],
      fill: false,
      borderColor: "rgba(75,192,192,1)",
    },
    {
      label: "Allergen",
      data: ["Penecillins", "Diary food", "Dust"],
      fill: false,
      borderColor: "rgba(255,99,132,1)",
    },
    {
      label: "Reaction",
      data: ["Diarrhea", "Rash", "Cough"],
      fill: false,
      borderColor: "rgba(255,99,132,1)",
    },
    {
      label: "Severity",
      data: ["Mild", "Moderate", "Severe"],
      fill: false,
      borderColor: "rgba(255,99,132,1)",
    },
    {
      label: "Comments",
      data: ["Test", "Trial", "Flu"],
      fill: false,
      borderColor: "rgba(255,99,132,1)",
    },
  ],
};

const Allergies = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [drug, setDrug] = useState("");
  const [food, setFood] = useState("");
  const [environment, setEnvironment] = useState("");
  const [date, setDate] = useState("");
  const [reaction, setReaction] = useState("");
  const [comments, setComments] = useState("");
  const [severity, setSeverity] = useState("");
  const [value, setValue] = React.useState("1");
  const severityList = ["Mild", "Moderate", "Severe"];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [state, setState] = React.useState({
    right: false,
  });
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };

  const selectedValues = Object.entries(checkedItems)
    .filter(([key, value]) => value === true)
    .map(([key]) => key);

  const drugs = [
    { id: "ACE inhibitors", label: "ACE inhibitors" },
    {
      id: "ARBs (angiotensin II receptor blockers)",
      label: "ARBs (angiotensin II receptor blockers)",
    },
    { id: "Cephalosporins", label: "Cephalosporins" },
    { id: "Morphine", label: "Morphine" },
    { id: "Penicillins", label: "Penicillins" },
    { id: "Heparins", label: "Heparins" },
    { id: "7", label: "Other" },
  ];
  const [checkedFoodItems, setCheckedFoodItems] = useState({});

  const handleFoodCheckboxChange = (event) => {
    setCheckedFoodItems({
      ...checkedFoodItems,
      [event.target.name]: event.target.checked,
    });
  };

  const selectedFoodValues = Object.entries(checkedFoodItems)
    .filter(([key, value]) => value === true)
    .map(([key]) => key);

  const foods = [
    { id: "Beef", label: "Beef" },
    {
      id: "Milk",
      label: "Milk",
    },
    { id: "Eggs", label: "Eggs" },
    { id: "Chocolate", label: "Chocolate" },
    { id: "Diary products", label: "Diary food" },
    { id: "Soy", label: "Soy" },
    { id: "7", label: "Other" },
  ];

  const environmental = [
    { id: "Bee stings", label: "Bee stings" },
    {
      id: "Dust",
      label: "Dust",
    },
    { id: "Latex", label: "Latex" },
    { id: "Mold", label: "Mold" },
    { id: "Pollen", label: "Pollen" },
    { id: "Ragweed", label: "Ragweed" },
    { id: "Adhesive tape", label: "Adhesive tape" },
    { id: "7", label: "Other" },
  ];
  const [checkedEnvironmentalItems, setCheckedEnvironmentalItems] = useState(
    {}
  );

  const handleEnvironmentalCheckboxChange = (event) => {
    setCheckedEnvironmentalItems({
      ...checkedEnvironmentalItems,
      [event.target.name]: event.target.checked,
    });
  };

  const selectedEnvironmentalValues = Object.entries(checkedEnvironmentalItems)
    .filter(([key, value]) => value === true)
    .map(([key]) => key);

  const reactions = [
    { id: "Fever", label: "Fever" },
    { id: "Cough", label: "Cough" },
    { id: "Diarrhea", label: "Diarrhea" },
    { id: "Itching", label: "Itching" },
    { id: "Rash", label: "Rash" },
    { id: "Headache", label: "Headache" },
    { id: "Adhesive tape", label: "Hypertension" },
    { id: "7", label: "Other" },
  ];
  const [checkedReactionsItems, setCheckedReactionsItems] = useState({});

  const handleReactionsCheckboxChange = (event) => {
    setCheckedReactionsItems({
      ...checkedReactionsItems,
      [event.target.name]: event.target.checked,
    });
  };

  const selectedReactionsValues = Object.entries(checkedReactionsItems)
    .filter(([key, value]) => value === true)
    .map(([key]) => key);

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
    console.log("Severity:", severity);
    console.log("Comments:", comments);
    console.log("Date:", date);
    console.log("Options:", checkedItems[7] === true ? drug : selectedValues);
    console.log(
      "Food Allergies:",
      checkedFoodItems[7] === true ? foods : selectedFoodValues
    );
    console.log(
      "Environmental Allergies:",
      checkedEnvironmentalItems[7] === true
        ? environment
        : selectedEnvironmentalValues
    );
    console.log(
      "Reaction:",
      checkedEnvironmentalItems[7] === true ? reaction : selectedReactionsValues
    );
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
              Add Allergies
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container>
                <Grid container></Grid>
                <Grid item xs={12}>
                  <FormLabel component="legend">Select the allergens</FormLabel>
                  <Box sx={{ width: "100%", typography: "body1" }}>
                    <TabContext value={value}>
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList
                          onChange={handleChange}
                          aria-label="lab API tabs example"
                        >
                          <Tab label="Drug" value="1" />
                          <Tab label="Food" value="2" />
                          <Tab label="Environmental" value="3" />
                        </TabList>
                      </Box>
                      <TabPanel value="1">
                        <FormGroup>
                          {drugs.map((option) => (
                            <FormControlLabel
                              key={option.id}
                              control={
                                <Checkbox
                                  checked={checkedItems[option.id] || false}
                                  onChange={handleCheckboxChange}
                                  name={option.id}
                                />
                              }
                              label={option.label}
                            />
                          ))}
                        </FormGroup>
                        {checkedItems[7] === true && (
                          <TextField
                            required
                            name="Drug name"
                            label="Drug name"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            value={drug}
                            onChange={(e) => setDrug(e.target.value)}
                          />
                        )}
                      </TabPanel>
                      <TabPanel value="2">
                        <FormGroup>
                          {foods.map((option) => (
                            <FormControlLabel
                              key={option.id}
                              control={
                                <Checkbox
                                  checked={checkedFoodItems[option.id] || false}
                                  onChange={handleFoodCheckboxChange}
                                  name={option.id}
                                />
                              }
                              label={option.label}
                            />
                          ))}
                        </FormGroup>
                        {checkedFoodItems[7] === true && (
                          <TextField
                            required
                            name="Food name"
                            label="Food"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            value={food}
                            onChange={(e) => setFood(e.target.value)}
                          />
                        )}
                      </TabPanel>
                      <TabPanel value="3">
                        <FormGroup>
                          {environmental.map((option) => (
                            <FormControlLabel
                              key={option.id}
                              control={
                                <Checkbox
                                  checked={
                                    checkedEnvironmentalItems[option.id] ||
                                    false
                                  }
                                  onChange={handleEnvironmentalCheckboxChange}
                                  name={option.id}
                                />
                              }
                              label={option.label}
                            />
                          ))}
                        </FormGroup>
                        {checkedEnvironmentalItems[7] === true && (
                          <TextField
                            required
                            name="Environmental condition"
                            label="Environmental condition"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            value={environment}
                            onChange={(e) => setEnvironment(e.target.value)}
                          />
                        )}
                      </TabPanel>
                    </TabContext>
                  </Box>

                  <FormGroup>
                    <FormLabel component="legend">
                      Select the reaction
                    </FormLabel>
                    {reactions.map((option) => (
                      <FormControlLabel
                        key={option.id}
                        control={
                          <Checkbox
                            checked={checkedReactionsItems[option.id] || false}
                            onChange={handleReactionsCheckboxChange}
                            name={option.id}
                          />
                        }
                        label={option.label}
                      />
                    ))}
                    {checkedReactionsItems[7] === true && (
                      <TextField
                        required
                        name="Reaction"
                        label="Reaction"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        value={reaction}
                        onChange={(e) => setReaction(e.target.value)}
                      />
                    )}
                  </FormGroup>
                </Grid>
              </Grid>
              <Grid>
                <Grid item xs={12}>
                  <FormLabel component="legend">Onset Date</FormLabel>
                  <TextField
                    fullWidth
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    margin="normal"
                    type="date"
                    required
                  />
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
                      value={severity}
                      onChange={(e) => setSeverity(e.target.value)}
                    >
                      {severityList.map((option, index) => (
                        <MenuItem key={index} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ margin: " 2% 0" }}>
                    <TextField
                      id="outlined-multiline-static"
                      label="Additional Comments"
                      multiline
                      fullWidth
                      margin="auto"
                      rows={4}
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                    />
                  </Box>
                </Grid>

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
            <h3>Allergies</h3>
          </Box>
          <Box></Box>
          <Box>
            <div>
              <React.Fragment key={"right"}>
                <Button
                  variant="contained"
                  onClick={toggleDrawer("right", true)}
                >
                  Add Allergies
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
                  <TableCell>Onset Date</TableCell>
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

export default Allergies;
