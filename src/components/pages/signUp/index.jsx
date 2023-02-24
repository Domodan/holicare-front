import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Link} from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import logo from '/assets/img/hlogo.png';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Holicare
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export const SignUp= () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [fullName, setName] = useState("");
    const [phone, setPhone] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
                    fullWidth
                    margin="normal"
                    label="Full Name"
                    type="text"
                    placeholder="Ryan George"
                    value={fullName}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Phone Number"
                    type="tel"
                    placeholder="0780000000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type={email}
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
             
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPass(e.target.value)}
              />
              <TextField
                    fullWidth
                    margin="normal"
                    label="Confirm Password"
                    type="password"
                    placeholder="*******"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                  />
              <FormControlLabel
                control={<Checkbox checked={rememberMe} value="rememberMe" 
                color="primary" 
                onChange={(e) => setRememberMe(e.target.checked)} 
                name="rememberMe"/>}
                label="Remember me"
                
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
               Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/Login" variant="body2">
                    {"Already have an account? Login"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }}/>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://media.gettyimages.com/id/1159312593/photo/eliminating-delays-in-patient-care-with-digital-technology.jpg?s=612x612&w=0&k=20&c=PYFD2vO_kzbqiX37otzv4YgzdOcoAQNMkCyxpk_lAlw=)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
    </ThemeProvider>
  );
}
