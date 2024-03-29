import React, { useContext } from 'react';
import {
    DarkModeOutlined,
    LightModeOutlined,
    NotificationsOutlined,
    Search,
    SettingsOutlined,
    PersonOutlined
} from '@mui/icons-material';
import {
    Box,
    IconButton,
    InputBase,
    useTheme
} from '@mui/material';
import { ColorModeContext, tokens } from '../../../theme';
import useAuth from '../../../auth/useAuth/useAuth';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const { setAuth, setAuthed } = useAuth();
    const navigate = useNavigate();
    
    const handleClick = () => {
        setAuthed(false);
        setAuth("");
        localStorage.clear();
        navigate("/", { replace: true });

    }

    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            {/* SEARCH BAR */}
            <Box
                display="flex"
                backgroundColor={colors.primary[400]}
                borderRadius="3px"
            >
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                <IconButton type="button" sx={{ p: 1 }}>
                    <Search />
                </IconButton>
            </Box>
        
            {/* ICONS */}
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlined />
                    ) : (
                        <LightModeOutlined />
                    )}
                </IconButton>
                <IconButton>
                    <NotificationsOutlined />
                </IconButton>
                <IconButton>
                    <SettingsOutlined />
                </IconButton>
                <IconButton onClick={handleClick}>
                    <PersonOutlined />
                </IconButton>
            </Box>
        </Box>
    )
}

export default Topbar