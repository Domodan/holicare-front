import React, { useState } from "react";
import { Tabs, Tab, Box, Paper, Grid, Typography } from "@mui/material";
const VisitsPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabsData = [
    [
      {
        id: 1,
        date: "10 Jul 2023",
        label: "Notes",
        diagnosis: "Flu",
        content: [{ Notes: "Prescribed antiviral medication and rest." }, { "Observed Signs": "Drink plenty of fluids and get plenty of rest." }],
      },
      {
        id: 2,
        label: "Prescriptions",
        date: "10 Jul 2023",
        diagnosis: "cough",
        content: [{ 1: "Paracetamol" }],
      },
      {
        id: 3,
        label: "Tests",
        diagnosis: "Allergy",
        date: "10 Jul 2023",
        content: [{ 1: "LFT" }],
      },
    ],
    [
      {
        id: 1,
        label: "Notes",
        date: "10 Jul 2023",
        diagnosis: "Flu",
        content: [{ Notes: "Notes" }, { "Observed Signs": "Fever" }],
      },
      {
        id: 2,
        label: "Prescriptions",
        date: "10 Jul 2023",
        diagnosis: "cough",
        content: [{ 1: "Paracetamol" }],
      },
      {
        id: 3,
        label: "Tests",
        date: "10 Jul 2023",
        diagnosis: "Allergy",
        content: [{ 1: "LFT" }],
      },
    ],
  ];

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
      <Box display="flex" flexDirection={"column"} margin={5}>
          <div
        className="head"
      >
        <Box
          sx={{
              fontSize: "18px",
              fontWeight: "800",
              color: "#5ab2da",
            }}
          >
            <h3>Visits</h3>
          </Box>
      </div>

      {tabsData.map((item, index) => (
        <Box margin= "1% 0">
          <Paper sx={{backgroundColor:"rgba(0, 0, 0, 0.07)",  margin: "0 2%"}} ><Grid item xs={12} >
            <Typography textAlign={"left"} m={1}>
              <strong>Day of the visit:</strong> {item[0].date}
            </Typography>
          </Grid>
          <Grid display={ "flex"} xs={12}>
                  <Grid item xs={6}>
              <Typography textAlign={"left"} m={1}>
                <strong>Diagnosis:</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography textAlign={"left"} m={1}>
                {item[0].diagnosis}
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
                      <div key={contentIndex} textAlign={"left !important"}>
                        {Object.values(contentItem)[0]}
                      </div>
                    ))}
                </div>
              ))}
            </Box>
          </Paper>
        </Box>
      ))}
    </Box>
  );
};

export default VisitsPage;
