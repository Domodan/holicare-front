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

const AddInfection = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/infection";

    console.log("From:", from);
    
    const handleFormSubmit = (data) => {
        console.log("Form Data:", data);
        const url = globalVariables.BASE_URL + globalVariables.END_POINT_INFECTION;
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
            <Header title="" subtitle="Create a New Infection Profile" />
        
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
                            label="Infection"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.name}
                            name="name"
                            error={!!touched.name && !!errors.name}
                            helperText={touched.name && errors.name}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            type="text"
                            label="Symptoms"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.symptom}
                            name="symptom"
                            error={!!touched.symptom && !!errors.symptom}
                            helperText={touched.symptom && errors.symptom}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            type="text"
                            label="Risk Factors"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.risk_factor}
                            name="risk_factor"
                            error={!!touched.risk_factor && !!errors.risk_factor}
                            helperText={touched.risk_factor && errors.risk_factor}
                            sx={{ gridColumn: "span 2" }}
                        />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Add New Infection
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
    symptom: yup.string().required("required"),
    risk_factor: yup.string().required("required")
});

const initialValues = {
    name: "",
    symptom: "",
    risk_factor: "",
};

export default AddInfection