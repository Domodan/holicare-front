import React from 'react';
import {
    Box,
    Typography,
    useTheme
} from '@mui/material';
import { tokens } from '../../theme';

const Header = ({ title, subtitle, username, role}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    return (
        <Box mb="30px">
            <Typography
                variant="h2"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{ m: "0 0 5px 0" }}
            >
                {title}
            </Typography>
            <Typography variant="h5" color={colors.grey[500]}>
                {subtitle} {role} {username}
            </Typography>
        </Box>
    )
}

export default Header