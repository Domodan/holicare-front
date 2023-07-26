import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export default function Visits() {
  return (
    <Container>
      <div
        className="head"
      >
        <Box
          sx={{
              padding: "10px",
              fontSize: "18px",
              fontWeight: "800",
              color: "#5ab2da",
            }}
          >
            <h3>Appointments</h3>
          </Box>
      </div>
      <Timeline>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            align="right"
            variant="body2"
            color="text.secondary"
          >
            10 Jul 2023
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot></TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span">
            Dr. Benjamin
            </Typography>
            {/* <Typography>Flu</Typography> */}
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            variant="body2"
            color="text.secondary"
          >
            10 Mar 2023
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary"></TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span">
            Dr. Liam
            </Typography>
            {/* <Typography>Arthritis</Typography> */}
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
        <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            variant="body2"
            color="text.secondary"
          >
            10 Feb 2023
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary" variant="outlined"></TimelineDot>
            <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span">
            Dr. Noah
            </Typography>
            {/* <Typography>Arthritis</Typography> */}
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
        <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            variant="body2"
            color="text.secondary"
          >
            10 Nov 2022
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
            <TimelineDot color="secondary"></TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span">
            Dr. Emma
            </Typography>
            {/* <Typography>	Diarrhoea</Typography> */}
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </Container>
  );
}
