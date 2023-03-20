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

const AddTest = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/test";

    console.log("From:", from);
    
    const handleFormSubmit = (data) => {
        console.log("Form Data:", data);
        const url = globalVariables.BASE_URL + globalVariables.END_POINT_DISTRICT_ID;
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
            <Header title="" subtitle="Create a New Test" />
        
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
                            label="Test"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.test}
                            name="test"
                            error={!!touched.test && !!errors.test}
                            helperText={touched.test && errors.test}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            type="text"
                            label="Parameters"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.parameters}
                            name="parameters"
                            error={!!touched.parameters && !!errors.parameters}
                            helperText={touched.parameters && errors.parameters}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            type="text"
                            label="Results"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.results}
                            name="results"
                            error={!!touched.results && !!errors.results}
                            helperText={touched.results && errors.results}
                            sx={{ gridColumn: "span 2" }}
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
    test: yup.string().required("required"),
    parameters: yup.string().required("required"),
    results: yup.number().required("required")
});

const initialValues = {
    test: "",
    parameters: "",
    results: "",
};

export default AddTest