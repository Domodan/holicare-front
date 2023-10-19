import React, { useEffect, useRef, useState } from 'react';
import {
    Box, Button, TextField, useMediaQuery, Typography,
    Radio, RadioGroup, FormControl, FormControlLabel, FormLabel,
    Stack, Select, InputLabel, MenuItem, Alert, AlertTitle
} from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Formik } from 'formik';
import * as yup from "yup";
import Header from '../../includes/Header';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import useAuth from '../../../auth/useAuth/useAuth';
import { serialize } from 'object-to-formdata';
import { globalVariables } from '../../../utils/GlobalVariables';
import { getData } from '../../../utils/ApiCalls';
import dayjs from 'dayjs';

const AddPatient = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const { setAuth, setAuthed } = useAuth();
    const location = useLocation();
    const [errorMsg, setErrorMsg] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    const [districts, setDistricts] = useState([]);
    const mounted = useRef();

    const [prevDistrict, setPrevDistrict] = useState();
    const [prevCounty, setPrevCounty] = useState();
    const [prevSubcounty, setPrevSubcounty] = useState();
    const [prevParish, setPrevParish] = useState();
    const [prevVillage, setPrevVillage] = useState();
    const [prevTimeSpent, setPrevTimeSpent] = useState();

    const from = location.state?.from?.pathname || "/patient";

    useEffect(() => {
        const endpoint = globalVariables.END_POINT_DISTRICT;
        getData(endpoint)
        .then((data) => {
            if (mounted) {
                if (data?.length > 0)
                    setDistricts(data);
            }
        })
        return () => mounted.current = false
    }, [mounted])

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
        const url = globalVariables.BASE_URL + globalVariables.END_POINT_PATIENT;
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
            <Header title="" subtitle="Create a New Patient Profile" />
        
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
                    setFieldValue,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Typography variant="h5" fontWeight="600" sx={{ marginY: 2 }}>
                            User Auth Data (Mandatory)
                        </Typography>
                        <Box
                            display="grid"
                            gap="30px"
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
                        </Box>
                        <Typography variant="h5" fontWeight="600" sx={{ marginY: 2 }}>
                            Other Mandatory Data
                        </Typography>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            <DatePicker
                                label="Date of Birth"
                                value={dayjs(values.date_of_birth)}
                                onChange={(date) => setFieldValue("date_of_birth", date.format("YYYY-MM-DD")) }
                                format="LL"
                                slotProps={{ textField: { size: 'small' } }}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                type="text"
                                label="Phone Number"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.phone}
                                name="phone"
                                error={!!touched.phone && !!errors.phone}
                                helperText={touched.phone && errors.phone}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                type="text"
                                label="Occupation"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.occupation}
                                name="occupation"
                                error={!!touched.occupation && !!errors.occupation}
                                helperText={touched.occupation && errors.occupation}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                type="text"
                                label="Emergency Contact"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.emergency_contact}
                                name="emergency_contact"
                                error={!!touched.emergency_contact && !!errors.emergency_contact}
                                helperText={touched.emergency_contact && errors.emergency_contact}
                                sx={{ gridColumn: "span 2" }}
                            />
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
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                type="text"
                                label="Age"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.age}
                                name="age"
                                error={!!touched.age && !!errors.age}
                                helperText={touched.age && errors.age}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <FormControl sx={{ gridColumn: "span 2" }}>
                                <FormLabel id="gender">Gender</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="gender"
                                    name="gender"
                                >
                                    <FormControlLabel
                                        value="female"
                                        control={<Radio />}
                                        label="Female"
                                        checked={values.gender === "female"}
                                        onChange={() => setFieldValue("gender", "female")}
                                    />
                                    <FormControlLabel
                                        value="male"
                                        control={<Radio />}
                                        label="Male"
                                        checked={values.gender === "male"}
                                        onChange={() => setFieldValue("gender", "male")}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <Typography variant="h5" fontWeight="600" sx={{ marginY: 2 }}>
                            Hospital Attached
                        </Typography>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
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
                        </Box>
                        <Typography variant="h5" fontWeight="600" sx={{ marginY: 2 }}>
                            Patient Location
                        </Typography>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            <FormControl sx={{gridColumn: "span 1", minWidth: 150}} size="small">
                                <InputLabel id="districtLabel">District</InputLabel>
                                <Select
                                    fullWidth
                                    label="District"
                                    id="district"
                                    labelId="districtLabel"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.district}
                                    error={!!touched.district && !!errors.district}
                                    name="district"
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {districts.length > 0 ?
                                        districts.map((district) => {
                                            return <MenuItem value={district.id} key={district.id}>
                                                {district.district}
                                            </MenuItem>
                                        })
                                    :null}
                                </Select>
                            </FormControl>
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                type="text"
                                label="County"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.county}
                                name="county"
                                error={!!touched.county && !!errors.county}
                                helperText={touched.county && errors.county}
                                sx={{ gridColumn: "span 1" }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                type="text"
                                label="Sub County"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.sub_county}
                                name="sub_county"
                                error={!!touched.sub_county && !!errors.sub_county}
                                helperText={touched.sub_county && errors.sub_county}
                                sx={{ gridColumn: "span 1" }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                type="text"
                                label="Parish"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.parish}
                                name="parish"
                                error={!!touched.parish && !!errors.parish}
                                helperText={touched.parish && errors.parish}
                                sx={{ gridColumn: "span 1" }}
                            />
                        </Box>
                        <Typography variant="h5" fontWeight="600" sx={{ marginY: 2 }}>
                            Patient Location History
                        </Typography>
                        <Box
                            display="grid"
                            gap="30px"
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
                                label="District"
                                onChange={(e) => setPrevDistrict(e.target.value)}
                                value={prevDistrict}
                                name="prevDistrict"
                                sx={{ gridColumn: "span 1" }}
                                disabled
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                type="text"
                                label="County"
                                onChange={(e) => setPrevCounty(e.target.value)}
                                value={prevCounty}
                                name="prevCounty"
                                sx={{ gridColumn: "span 1" }}
                                disabled
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                type="text"
                                label="Sub County"
                                onChange={(e) => setPrevSubcounty(e.target.value)}
                                value={prevSubcounty}
                                name="prevSubcounty"
                                sx={{ gridColumn: "span 1" }}
                                disabled
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                type="text"
                                label="Parish"
                                onChange={(e) => setPrevParish(e.target.value)}
                                value={prevParish}
                                name="prevParish"
                                sx={{ gridColumn: "span 1" }}
                                disabled
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                type="text"
                                label="Time Spent"
                                onChange={(e) => setPrevTimeSpent(e.target.value)}
                                value={prevTimeSpent}
                                name="prevTimeSpent"
                                sx={{ gridColumn: "span 1" }}
                                disabled
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                type="text"
                                label="Village"
                                onChange={(e) => setPrevVillage(e.target.value)}
                                value={prevVillage}
                                name="preVillage"
                                sx={{ gridColumn: "span 1" }}
                                disabled
                            />
                        </Box>
                        <Box display="flex" justifyContent="center" alignItems="center" sx={{padding: 5}}>
                            <Button type="submit" color="secondary" variant="contained">
                                Add New Patient
                            </Button>
                        </Box> 
                    </form>
                )}
            </Formik>
        </Box>
    )
}

const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
    first_name: yup.string().required("First Name is required"),
    last_name: yup.string().required("Last Name is required"),
    username: yup.string().required("Username is required"),
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
    phone: yup.string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Phone Number is required"),
    emergency_contact: yup.string()
        .matches(phoneRegExp, "Emergency Contact is not valid")
        .required("Emergency Contact is required"),
    hospital: yup.string().required("Hospital field is required"),
    district: yup.string().required("District field is required"),
    county: yup.string().required("County field is required"),
    sub_county: yup.string().required("Sub County field is required"),
    parish: yup.string().required("Parish field is required"),
    image: yup.mixed()
        .required('Please select an image')
        .test('fileSize', 'The image size is too large, Max. 2MB', (value) => {
            return value && value.size <= 2 * 1024 * 1024; // 2MB
        })
        .test('fileType', 'Only JPEG, PNG, GIF, and BMP images are allowed', (value) => {
            return value && ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'].includes(value.type);
        }),
    age: yup.string().required("Age field is required"),
    gender: yup.string().required("Gender field is required"),
    date_of_birth: yup.string().required("Birthday is required"),
    occupation: yup.string().required("District field is required"),
});

const initialValues = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    hospital: "",
    district: "",
    county: "",
    sub_county: "",
    parish: "",
    image: "",
    age: 0,
    gender: "",
    emergency_contact: "",
    occupation: "",
    date_of_birth: new Date().toLocaleDateString()
};

export default AddPatient