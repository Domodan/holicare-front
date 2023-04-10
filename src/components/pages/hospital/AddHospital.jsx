import React, { useRef, useState, useEffect } from 'react';
import {
    Box, Button, TextField, useMediaQuery, Select,MenuItem,
    FormControl, InputLabel, Stack, Alert,
    AlertTitle,
} from '@mui/material';
import { Formik } from 'formik';
import * as yup from "yup";
import Header from '../../includes/Header';
import { globalVariables } from '../../../utils/GlobalVariables';
import { getData, postDataToken } from '../../../utils/ApiCalls';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import useAuth from '../../../auth/useAuth/useAuth';

const AddHospital = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const location = useLocation();
    const { setAuth, setAuthed } = useAuth();
    const [districts, setDistricts] = useState([]);
    const [errorMsg, setErrorMsg] = useState([]);
    const mounted = useRef();

    const from = location.state?.from?.pathname || "/hospital";

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
    
    
    const handleFormSubmit = (data) => {
        const endpoint = globalVariables.END_POINT_HOSPITAL;
        postDataToken(endpoint, data)
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
            <Header title="" subtitle="Create a New Hospital Profile" />
        
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
                }) => (
                    <form onSubmit={handleSubmit}>
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
                                label="Hospital Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.hospital_name}
                                name="hospital_name"
                                error={!!touched.hospital_name && !!errors.hospital_name}
                                helperText={touched.hospital_name && errors.hospital_name}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                type="text"
                                label="Hospital Type"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.hospital_type}
                                name="hospital_type"
                                error={!!touched.hospital_type && !!errors.hospital_type}
                                helperText={touched.hospital_type && errors.hospital_type}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                type="text"
                                label="Ownership"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.ownership}
                                name="ownership"
                                error={!!touched.ownership && !!errors.ownership}
                                helperText={touched.ownership && errors.ownership}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                type="text"
                                label="Authority"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.authority}
                                name="authority"
                                error={!!touched.authority && !!errors.authority}
                                helperText={touched.authority && errors.authority}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <FormControl sx={{gridColumn: "span 2", minWidth: 150}} size="small">
                                <InputLabel id="hospitalLabel">District</InputLabel>
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
                                                {district.district_name}
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
                                label="Sub County"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.sub_county}
                                name="sub_county"
                                error={!!touched.sub_county && !!errors.sub_county}
                                helperText={touched.sub_county && errors.sub_county}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                type="text"
                                label="LNG"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.longitude}
                                name="longitude"
                                error={!!touched.longitude && !!errors.longitude}
                                helperText={touched.longitude && errors.longitude}
                                sx={{ gridColumn: "span 1" }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                type="text"
                                label="LAT"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.latitude}
                                name="latitude"
                                error={!!touched.latitude && !!errors.latitude}
                                helperText={touched.latitude && errors.latitude}
                                sx={{ gridColumn: "span 1" }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Add New Hospital
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    )
}

const checkoutSchema = yup.object().shape({
    hospital_name: yup.string().required("required"),
    hospital_type: yup.string().required("required"),
    ownership: yup.string().required("required"),
    authority: yup.string().required("required"),
    district: yup.string().required("required"),
    sub_county: yup.string().required("required"),
    longitude: yup.string().required("required"),
    latitude: yup.string().required("required"),
});

const initialValues = {
    hospital_name: "",
    hospital_type: "",
    ownership: "",
    authority: "",
    district: "",
    sub_county: "",
    longitude: "",
    latitude: "",
};

export default AddHospital