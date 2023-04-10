import React, { useState } from 'react';
import {
    Box, Button, TextField, useMediaQuery, Stack, Alert,
    AlertTitle
} from '@mui/material';
import { Formik } from 'formik';
import * as yup from "yup";
import Header from '../../includes/Header';
import { globalVariables } from '../../../utils/GlobalVariables';
import { postDataToken } from '../../../utils/ApiCalls';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import useAuth from '../../../auth/useAuth/useAuth';

const AddDistrict = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const location = useLocation();
    const { setAuth, setAuthed } = useAuth();
    const [errorMsg, setErrorMsg] = useState([]);

    const from = location.state?.from?.pathname || "/district";
    
    const handleFormSubmit = (data) => {
        const endpoint = globalVariables.END_POINT_DISTRICT;
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
            <Header title="" subtitle="Create a New District Profile" />
        
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
                            label="District Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.district_name}
                            name="district_name"
                            error={!!touched.district_name && !!errors.district_name}
                            helperText={touched.district_name && errors.district_name}
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
                            type="number"
                            label="Population"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.population}
                            name="population"
                            error={!!touched.population && !!errors.population}
                            helperText={touched.population && errors.population}
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