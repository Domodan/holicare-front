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

const AddDistrict = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/district";

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
            <Header title="ADD NEW District" subtitle="Create a New District Profile" />
        
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
                            variant="filled"
                            type="text"
                            label="District Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.district_name}
                            name="district_name"
                            error={!!touched.district_name && !!errors.district_name}
                            helperText={touched.district_name && errors.district_name}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Region"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.region}
                            name="region"
                            error={!!touched.region && !!errors.region}
                            helperText={touched.region && errors.region}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="Population"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.population}
                            name="population"
                            error={!!touched.population && !!errors.population}
                            helperText={touched.population && errors.population}
                            sx={{ gridColumn: "span 4" }}
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
    district_name: yup.string().required("required"),
    region: yup.string().required("required"),
    population: yup.number().required("required")
});

const initialValues = {
    district_name: "",
    region: "",
    population: "",
};

export default AddDistrict