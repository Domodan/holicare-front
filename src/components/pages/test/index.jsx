import {
  Box,
  Button,
  useTheme,
  Drawer,
  Typography,
  Paper,
  Tab,
  Tabs,
  Grid,
} from "@mui/material";
import React, { useState } from "react";

import { mockDataTests } from "../../../data/mockData";
import { tokens } from "../../../theme";
import Header from "../../includes/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { AddOutlined } from "@mui/icons-material";
// import useAuth from "../../../auth/useAuth/useAuth";
import { ArrowCircleRightOutlined } from "@mui/icons-material";

// const D = process.env.REACT_APP_ROLE_D;
// const N = process.env.REACT_APP_ROLE_N;
// const LA = process.env.REACT_APP_ROLE_LA;
// const SA = process.env.REACT_APP_ROLE_SA;

// const role = [D, N, LA, SA];

const Tests = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const { auth } = useAuth();
  const patientID = localStorage.getItem("patientID");
  const [state, setState] = useState({ right: false });
  const [selectedTab, setSelectedTab] = useState(0);
  const tabsData = [
    [
      {
        id: 1,
        date: "10 Jul 2023",
        label: "Tests",
        patient: "PID0001",
        doctor: "Mathew",
        Labattendant: "john",
        Laboratory: "Lancent labs",
        content: [{ 1: "x-ray" }],

        // content: [{ Notes: "Prescribed antiviral medication and rest." }, { "Observed Signs": "Drink plenty of fluids and get plenty of rest." }],
      },
      {
        id: 2,
        label: "Sample",
        content: [{ Samples: "chest scan" }],
        // content: [{ 1: "Paracetamol" }],
      },
      {
        id: 3,
        label: "Results",
        content: [{ 1: "positive" }],
      },
    ],
  ];

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "test",
      headerName: "Test",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "patient_id",
      headerName: "Patient ID",
      flex: 1,
    },
    {
      field: "forwaded_by",
      headerName: "Forwaded by",
      flex: 1,
    },
    {
      field: "test_to_run",
      headerName: "Test to run",
      flex: 1,
    },
    {
      field: "sample",
      headerName: "Sample name",
      flex: 1,
    },

    {
      field: "parameters",
      headerName: "Parameters",
      flex: 1,
    },
    {
      field: "results",
      headerName: "Results",
      flex: 1,
    },
  ];
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
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
        <Paper elevation={3} sx={{ marginTop: "5%", marginX: "15%" }}>
        {!patientID && (
              <Button variant="contained" component="label">
              Upload data
              <input hidden accept="image/*" multiple type="file" />
            </Button>)}
          <Box sx={{ padding: 5 }}>
            <Typography
              variant="h3"
              fontWeight={"bold"}
              gutterBottom
              sx={{ paddingBottom: 5 }}
            >
              Test results
            </Typography>
            {tabsData.map((item, index) => (
              <Box margin="1% 0">
                <Paper
                  sx={{
                    backgroundColor: "rgba(0, 0, 0, 0.07)",
                    margin: "0 2%",
                  }}
                >
                  <Grid item xs={12}>
                    <Typography textAlign={"left"} m={1}>
                      <strong>Date:</strong> {item[0].date}
                    </Typography>
                  </Grid>
                  <Grid display={"flex"} xs={12}>
                    <Grid item xs={6}>
                      <Typography textAlign={"left"} m={1}>
                        <strong>Patient ID:</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography textAlign={"left"} m={1}>
                        {item[0].patient}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid display={"flex"} xs={12}>
                    <Grid item xs={6}>
                      <Typography textAlign={"left"} m={1}>
                        <strong>Forwarded by:</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography textAlign={"left"} m={1}>
                        {item[0].doctor}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid display={"flex"} xs={12}>
                    <Grid item xs={6}>
                      <Typography textAlign={"left"} m={1}>
                        <strong>Laboratory:</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography textAlign={"left"} m={1}>
                        {item[0].Laboratory}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid display={"flex"} xs={12}>
                    <Grid item xs={6}>
                      <Typography textAlign={"left"} m={1}>
                        <strong>Lab attendant:</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography textAlign={"left"} m={1}>
                        {item[0].Labattendant}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
                <Paper
                  key={index}
                  elevation={12}
                  sx={{ display: "flex", margin: "0.5% 2%" }}
                >
                  <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={selectedTab}
                    onChange={handleTabChange}
                    sx={{ borderRight: 3, borderColor: "divider" }}
                  >
                    {item.map((tab) => (
                      <Tab key={tab.id} label={tab.label} />
                    ))}
                  </Tabs>
                  <Box sx={{ flexGrow: 1, p: 2 }}>
                    {item.map((tab, index) => (
                      <div
                        key={tab.id}
                        role="tabpanel"
                        hidden={selectedTab !== index}
                        id={`tabpanel-${index}`}
                      >
                        {selectedTab === index &&
                          tab.content.map((contentItem, contentIndex) => (
                            <div
                              key={contentIndex}
                              textAlign={"left !important"}
                            >
                              {Object.values(contentItem)[0]}
                            </div>
                          ))}
                      </div>
                    ))}
                  </Box>
                </Paper>
              </Box>
            ))}
            {!patientID && (
              <Link to={"/add_test"}>
                <Button variant="contained" component="label">
                  <AddOutlined sx={{ mr: "10px" }} />
                  Run a confirmatory Test
                </Button>
              
              </Link>)}
          </Box>
        </Paper>
      </React.Fragment>
    </Box>
  );
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={"TESTS"} subtitle={"Diagnosis tests reports"} />
        {/* {role.includes(auth.role) ? (
          <Box>
            <Link to={"/add_test"}>
              <Button variant="contained" component="label">
                <AddOutlined sx={{ mr: "10px" }} />
                New Test
              </Button>
            </Link>
          </Box>
        ) : null} */}
      </Box>

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.grey[900],
            borderBottom: "none",
            color: colors.primary[200],
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.grey[900],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.primary[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockDataTests}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onRowClick={toggleDrawer("right", true)}
        />
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Tests;
