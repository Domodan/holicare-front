import React from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from "../../includes/Footer";
import useAuth from "../../../auth/useAuth/useAuth";
import { Formik } from 'formik';
import * as yup from "yup";
import { globalVariables } from "../../../utils/GlobalVariables";
import { postData } from "../../../utils/ApiCalls";

const SignIn = () => {
    const theme = createTheme();
    const { setAuthed, setAuth } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/dashboard";
    console.log("From:", from);

    const handleFormSubmit = (data) => {
        const url = globalVariables.BASE_URL_2 + globalVariables.END_POINT_SIGN_IN;
        console.log("Data:", data, "URL:", url);
        postData(url, data)
        .then((data) => {
            console.log("Response Data:", data);
            if (data.tokens) {
                const refresh_token = data.tokens.refresh;
                const access_token = data.tokens.access;
                const email = data.email;
                const username = data.username;

                setAuthed(true);
                setAuth({
                    email: email,
                    username: username,
                    access_token: access_token,
                    refresh_token: refresh_token,
                })
                navigate(from, {replace: true});
            }
            else if (data.detail) {
                console.log("Error Detail:", data.detail);
            }
            else {
                console.log("Field Error:", data);
            }
        })
        .catch((error) => {
            console.log("Error:", error);
        });

        // setAuthed(true);
        // navigate(from, {replace: true});
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
                            Login
                        </Typography>
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
                                            id="email"
                                            label="Email Address"
                                            placeholder="janedoe@example.com"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.email}
                                            error={!!touched.email && !!errors.email}
                                            helperText={touched.email && errors.email}
                                            name="email"
                                            autoComplete="email"
                                            autoFocus
                                        />
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            type="text"
                                            id="phone"
                                            label="Phone Number"
                                            placeholder="0780000000"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.phone}
                                            error={!!touched.phone && !!errors.phone}
                                            helperText={touched.phone && errors.phone}
                                            autoComplete="phone"
                                            name="phone"
                                        />
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            type="password"
                                            id="password"
                                            label="Password"
                                            placeholder="********"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.password}
                                            error={!!touched.password && !!errors.password}
                                            helperText={touched.password && errors.password}
                                            autoComplete="current-password"
                                            name="password"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox value="remember" color="primary" />}
                                            label="Remember me"
                                        />
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                        Login
                                        </Button>
                                        <Grid container>
                                            <Grid item xs>
                                                <Link to={"/sign_in"} variant="body2">
                                                    Forgot password?
                                                </Link>
                                            </Grid>
                                            <Grid item>
                                                {"Don't have an account? "}
                                                <Link to="/sign_up" variant="body2">
                                                    {"Sign Up"}
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
    email: yup.string().required("required"),
    phone: yup.string().required("required"),
    password: yup.string().required("required")
});

const initialValues = {
    email: "",
    phone: "",
    password: "",
};

export default SignIn