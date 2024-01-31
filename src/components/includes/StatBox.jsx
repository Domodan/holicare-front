import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const StatBox = ({ title, subtitle, description, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.blueAccent[400] }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: colors.grey[100] }}>
          {subtitle}
        </Typography>
        
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
      <Typography
          variant="h5"
          fontStyle={"italic"}
          sx={{ color: colors.grey[100] }}
        >
          {description}
        </Typography>
        </Box>
    </Box>
  );
};

export default StatBox;
