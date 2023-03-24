import React, { useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../includes/Footer';
import {
    Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox,
    Paper, Box, Grid, Typography, Select, MenuItem, FormControl, InputLabel,
    Alert, AlertTitle, Stack
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik } from 'formik';
import * as yup from "yup";
import { globalVariables } from "../../../utils/GlobalVariables";
import { postData } from "../../../utils/ApiCalls";

const SignUp = () => {
    const theme = createTheme();
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState([]);
    const navigate = useNavigate();
    const errorRef = useRef();
    const inputRef = useRef();
    
    const handleFormSubmit = (data) => {
        const url = globalVariables.END_POINT_SIGN_UP;
        if (data.password === data.confirm_password) {
            postData(url, data)
            .then((data) => {
                if (data.username && (typeof data.username === 'string')) {
                    navigate("/verify_email", {replace: true});
                }
                else if ((typeof data.first_name === 'object') ||
                    (typeof data.last_name === 'object') ||
                    (typeof data.email === 'object') ||
                    (typeof data.password === 'object') ||
                    (typeof data.username === 'object')) {
                    const error = Object.entries(data).map((d) => {
                        const key0 = d[0][0].toUpperCase() + d[0].slice(1) + ': ';
                        return key0 + d[1];
                    });
                    setError(error);
                    window.scrollTo({
                        top: 70,
                        left: 0,
                        behavior: 'smooth',
                    });
                }
                else {
                    const newData = Object.entries(data).map((d, i) => {
                        const key0 = d[0][0].toUpperCase() + d[0].slice(1) + ': ';
                        return key0 + d[1];
                    });
                    setError(newData);
                    window.scrollTo({
                        top: 70,
                        left: 0,
                        behavior: 'smooth',
                    });
                }
            })
            .catch((error) => {
                console.log("Error:", error);
            });
        }
        else {
            setError("Two passwords do not match");
            window.scrollTo({
                top: 70,
                left: 0,
                behavior: 'smooth',
            });
        }
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
                        {error.length > 0 || Object.keys(error).length ?
                            <>
                                {typeof error === 'object' ?
                                    Object.entries(error).map(([keys, value]) => {
                                        return <Stack sx={{ width: '100%' }} key={ keys }>
                                            <Alert severity="error" sx={{ mt: 1}} ref={ errorRef }>
                                                <AlertTitle>Error</AlertTitle>
                                                <strong>{ value }</strong>
                                            </Alert>
                                        </Stack>
                                    })
                                :
                                    <Stack sx={{ width: '100%' }} spacing={2}>
                                        <Alert severity="error" sx={{ mt: 1}} ref={ errorRef }>
                                            <AlertTitle>Error</AlertTitle>
                                            <strong>{ error }</strong>
                                        </Alert>
                                    </Stack>
                                }
                            </>
                        :''}
                        <Formik
                            onSubmit={handleFormSubmit}
                            initialValues={initialValues}
                            validationSchema={checkoutSchema}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleBlur,
                                handleChange,
                                handleSubmit,
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <Box sx={{ mt: 1 }}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            type="text"
                                            id="first_name"
                                            label="First Name"
                                            placeholder="Jane"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.first_name}
                                            error={!!touched.first_name && !!errors.first_name}
                                            helperText={touched.first_name && errors.first_name}
                                            name="first_name"
                                            autoComplete="first_name"
                                            autoFocus
                                            ref={ inputRef }
                                        />
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            type="text"
                                            id="last_name"
                                            label="Last Name"
                                            placeholder="Doe"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.last_name}
                                            error={!!touched.last_name && !!errors.last_name}
                                            helperText={touched.last_name && errors.last_name}
                                            name="last_name"
                                            autoComplete="last_name"
                                        />
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            type="text"
                                            id="username"
                                            label="Username"
                                            placeholder="Jane Doe"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.username}
                                            error={!!touched.username && !!errors.username}
                                            helperText={touched.username && errors.username}
                                            name="username"
                                        />
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            type="text"
                                            id="email"
                                            label="Email Address"
                                            placeholder="someone@example.com"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.email}
                                            error={!!touched.email && !!errors.email}
                                            helperText={touched.email && errors.email}
                                            name="email"
                                            autoComplete="email"
                                        />
                                        <FormControl fullWidth>
                                            <InputLabel id="roleLabel">Role</InputLabel>
                                            <Select
                                                label="Role"
                                                id="user_role"
                                                labelId="roleLabel"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.user_role}
                                                error={!!touched.user_role && !!errors.user_role}
                                                name="user_role"
                                            >
                                                <MenuItem value=""><em>None</em></MenuItem>
                                                <MenuItem value="patient">Patient</MenuItem>
                                                <MenuItem value="admin">Admin</MenuItem>
                                                <MenuItem value="doctor">Doctor</MenuItem>
                                                <MenuItem value="nurse">Nurse</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            type="text"
                                            id="password"
                                            label="Password"
                                            placeholder="********"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.password}
                                            error={!!touched.password && !!errors.password}
                                            helperText={touched.password && errors.password}
                                            name="password"
                                            autoComplete="password"
                                        />
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            type="text"
                                            id="confirm_password"
                                            label="Confirm Password"
                                            placeholder="********"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.confirm_password}
                                            error={!!touched.confirm_password && !!errors.confirm_password}
                                            helperText={touched.confirm_password && errors.confirm_password}
                                            name="confirm_password"
                                            autoComplete="confirm_password"
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
                                                {"Already have an account? "}
                                                <Link to="/sign_in" variant="body2">
                                                    {"Sign In"}
                                                </Link>
                                            </Grid>
                                        </Grid>
                                        <Footer />
                                    </Box>
                                </form>
                            )}
                        </Formik>
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
    )
}

const checkoutSchema = yup.object().shape({
    first_name: yup.string().required("First Name is required"),
    last_name: yup.string().required("Last Name is required"),
    username: yup.string().required("Username is required"),
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
    confirm_password: yup.string().required("Password is required"),
    user_role: yup.string().required("Role is required")
});

const initialValues = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    user_role: "",
};

export default SignUp