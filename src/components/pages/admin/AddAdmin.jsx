import React, { useEffect, useRef, useState } from 'react';
import {
    Box, Button, TextField, useMediaQuery, Stack, Alert,
    AlertTitle, Select, MenuItem, FormControl, InputLabel,
    FormControlLabel, Checkbox, FormHelperText
} from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import { Formik } from 'formik';
import * as yup from "yup";
import Header from '../../includes/Header';
import { globalVariables } from '../../../utils/GlobalVariables';
import { getData } from '../../../utils/ApiCalls';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import useAuth from '../../../auth/useAuth/useAuth';
import { serialize } from 'object-to-formdata';

const AddAdmin = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const { setAuth, setAuthed } = useAuth();
    const location = useLocation();
    const [errorMsg, setErrorMsg] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    const [admin, setAdmin] = useState(false);
    const mounted = useRef();

    const from = location.state?.from?.pathname || "/admin";

    useEffect(() => {
        mounted.current = true;
        const endpoint = globalVariables.END_POINT_HOSPITAL;
        getData(endpoint)
        .then((data) => {
            if (data?.length > 0) {
                setHospitals(data);
            }
        })
        .catch((error) => console.log("Error:", error));

        return () => mounted.current = false;
    }, [mounted])
    

    const handleFormSubmit = (data) => {
        let endpoint = "";
        if (admin) 
            endpoint = globalVariables.END_POINT_HOSPITAL_ADMIN;
        else
            endpoint = globalVariables.END_POINT_ADMIN;
        const url = globalVariables.BASE_URL_2 + endpoint;
        data = serialize(data);
        let header = new Headers({
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        });
        fetch(url, {
            method: globalVariables.METHOD_POST,
            headers: header,
            body: data,
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.id) {
                navigate(from, {replace: true});
            }
            else if (data.code === "token_not_valid") {
                setErrorMsg(data.messages[0].message);
                setAuthed(false);
                setAuth("");
                localStorage.clear();
                <Navigate to={"/sign_in"} state={{ from: location.pathname }} replace />
            }
            else {
                const error = Object.entries(data).map((e) => {
                    const field = e[0].charAt(0).toUpperCase() + e[0].slice(1);
                    const errorMessage = e[1];
                    const fullErrorMessage = field + ":--- " + errorMessage;
                    return fullErrorMessage;
                })
                setErrorMsg(error);
            }
        })
        .catch((error) => {
            console.log("Error:", error);
        });
    };

    return (
        <Box m="20px">
            <Header title="" subtitle="Create a New Admin's Profile" />
        
            {errorMsg.length > 0 || Object.keys(errorMsg).length ?
                <>
                    {typeof errorMsg === 'object' ?
                        Object.entries(errorMsg).map(([key, value]) => {
                            return <Stack sx={{ width: '100%' }} key={ key }>
                                <Alert severity="error"  sx={{ mt: 1}}>
                                    <AlertTitle>Error</AlertTitle>
                                    <strong>{ value }</strong>
                                </Alert>
                            </Stack>
                        })
                    :
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="error"  sx={{ mt: 1}}>
                                <AlertTitle>Error</AlertTitle>
                                <strong>{ errorMsg }</strong>
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
                    setFieldValue
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            marginY={"10px"}
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                type="text"
                                label="First Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.first_name}
                                name="first_name"
                                error={!!touched.first_name && !!errors.first_name}
                                helperText={touched.first_name && errors.first_name}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                type="text"
                                label="Last Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.last_name}
                                name="last_name"
                                error={!!touched.last_name && !!errors.last_name}
                                helperText={touched.last_name && errors.last_name}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
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
                                size="small"
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
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
                                size="small"
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
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
                                size="small"
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="text"
                                id="phone"
                                label="Phone Number"
                                placeholder="0772100100"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.phone}
                                error={!!touched.phone && !!errors.phone}
                                helperText={touched.phone && errors.phone}
                                name="phone"
                                size="small"
                                sx={{ gridColumn: "span 2" }}
                            />
                            <FormControl sx={{gridColumn: "span 2", minWidth: 150}} size="small">
                                <InputLabel id="hospitalLabel">Hospital</InputLabel>
                                <Select
                                    fullWidth
                                    label="Hospital"
                                    id="hospital"
                                    labelId="hospitalLabel"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.hospital}
                                    error={!!touched.hospital && !!errors.hospital}
                                    name="hospital"
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {hospitals.length > 0 ?
                                        hospitals.map((hospital) => {
                                            return <MenuItem value={hospital.id} key={hospital.id}>
                                                {hospital.hospital_name}
                                            </MenuItem>
                                        })
                                    :null}
                                </Select>
                            </FormControl>
                            <MuiFileInput
                                fullWidth
                                size="small"
                                label="Select an Image"
                                onBlur={handleBlur}
                                onChange={(event) => setFieldValue('image', event)}
                                value={values.image}
                                name="image"
                                error={!!touched.image && !!errors.image}
                                helperText={touched.image && errors.image}
                                sx={{ gridColumn: "span 2" }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <FormControl sx={{ gridColumn: "span 2" }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={values.is_admin}
                                            onChange={(e) => {
                                                setFieldValue('is_admin', e.target.checked);
                                                setAdmin(e.target.checked);
                                            }}
                                            inputProps={{
                                                'aria-label': 'controlled'
                                            }}
                                        />
                                    }
                                    label="Is Hospital Admin?"
                                />
                                <FormHelperText sx={{ fontWeight: "bold" }}>
                                    Check this box if adding a Hospital Admin, leave it unchecked for a General Admin
                                </FormHelperText>
                            </FormControl>
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Add New Admin
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    )
}

const checkoutSchema = yup.object().shape({
    first_name: yup.string().required("First Name is required"),
    last_name: yup.string().required("Last Name is required"),
    username: yup.string().required("Username is required"),
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
    phone: yup.string().required("Phone Number is required"),
    hospital: yup.string().required("Hospital field is required"),
    image: yup.mixed()
    .required('Please select an image')
    .test('fileSize', 'The image size is too large, Max. 2MB', (value) => {
        return value && value.size <= 2 * 1024 * 1024; // 2MB
    })
    .test('fileType', 'Only JPEG, PNG, GIF, and BMP images are allowed', (value) => {
        return value && ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'].includes(value.type);
    }),
});

const initialValues = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    hospital: "",
    image: "",
    is_admin: false,
};

export default AddAdmin