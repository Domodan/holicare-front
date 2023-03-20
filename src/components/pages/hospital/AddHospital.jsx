import React from 'react';
import {
    Box,
    Button,
    TextField,
    useMediaQuery
} from '@mui/material';
import { Formik } from 'formik';
import * as yup from "yup";
import Header from '../../includes/Header';
import { globalVariables } from '../../../utils/GlobalVariables';
import { postData } from '../../../utils/ApiCalls';
import { useLocation, useNavigate } from 'react-router-dom';

const AddHospital = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/hospital";

    console.log("From:", from);
    
    const handleFormSubmit = (data) => {
        console.log("Form Data:", data);
        const url = globalVariables.BASE_URL + globalVariables.END_POINT_HOSPITAL_ID;
        postData(url, data)
        .then((data) => {
            console.log("Response Data:", data);
            if (data.id) {
                navigate(from, {replace: true});
            }
        })
        .catch((error) => {
            console.log("Error:", error);
        });
    };

    return (
        <Box m="20px">
            <Header title="" subtitle="Create a New Hospital Profile" />
        
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
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                type="text"
                                label="Region"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.region}
                                name="region"
                                error={!!touched.region && !!errors.region}
                                helperText={touched.region && errors.region}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                type="text"
                                label="District"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.district}
                                name="district"
                                error={!!touched.district && !!errors.district}
                                helperText={touched.district && errors.district}
                                sx={{ gridColumn: "span 2" }}
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
                                Add New District
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
    region: yup.string().required("required"),
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
    region: "",
    district: "",
    sub_county: "",
    longitude: "",
    latitude: "",
};

export default AddHospital