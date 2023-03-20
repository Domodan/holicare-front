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

const AddRiskfactor = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/lab";

    console.log("From:", from);
    
    const handleFormSubmit = (data) => {
        console.log("Form Data:", data);
        const url = globalVariables.BASE_URL + globalVariables.END_POINT_LAB;
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
            <Header title="" subtitle="Adding lab profile" />
        
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
                                label="Laboratory"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lab}
                                name="lab"
                                error={!!touched.lab && !!errors.lab}
                                helperText={touched.lab && errors.lab}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                type="text"
                                label="Hospital"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.hospital}
                                name="hospital"
                                error={!!touched.hospital && !!errors.hospital}
                                helperText={touched.hospital && errors.hospital}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                type="text"
                                label="Lab Attendant"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.labattendant}
                                name="labattendant"
                                error={!!touched.labattendant && !!errors.labattendant}
                                helperText={touched.labattendant && errors.labattendant}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                type="text"
                                label="Specialty"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.specialty}
                                name="specialty"
                                error={!!touched.specialty && !!errors.specialty}
                                helperText={touched.specialty && errors.specialty}
                                sx={{ gridColumn: "span 2" }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Add Lab
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    )
}

const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    category: yup.string().required("required"),
});

const initialValues = {
    name: "",
    category: "",
};

export default AddRiskfactor