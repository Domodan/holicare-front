import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const EmailVerification = () => {
    const navigate = useNavigate();

    const handleSignIn = () => {
        navigate("/sign_in", {replace: true})
    }
    return (
        <Box sx={{ bgcolor: '#333', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Container maxWidth="md">
                <Box sx={{ p: 4, bgcolor: '#fff', borderRadius: 2 }}>
                    <ArrowBackIcon />
                    <Typography variant="h4" align="center" gutterBottom>
                        Verify Email
                    </Typography>
                    <Typography variant="body1" align="center" gutterBottom>
                        You will need to verify your email to complete registration
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <img src="data:image/png;base64,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" alt="Email verification" style={{ height: '200px' }} />
                    </Box>
                    <Typography variant="body2" align="center" sx={{ color: 'grey.500', fontWeight: 'bold', borderRadius: 2 }} gutterBottom>
                        An email has been sent to your account with a link to verify your account. If you don't see the email address check the spam folder.
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button variant="contained" color="primary" sx={{ width: '48%' }}>
                            Resend Email
                        </Button>
                        <Button 
                            variant="contained"
                            color="success"
                            sx={{ width: '48%', mr: 0.1 }}
                            onClick={() => handleSignIn()}
                        >
                            Proceed To SignIn
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default EmailVerification