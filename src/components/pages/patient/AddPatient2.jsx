import React from 'react';
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme
} from '@mui/material';
import { tokens } from '../../../theme';
import { Formik } from 'formik';
import * as yup from "yup";
import Header from '../../includes/Header';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';

const AddPatient2 = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const handleFormSubmit = (values) => {
      console.log("Form Data:", values);
    };
    

    return (
        <Box m="20px">
            <Header title="" subtitle="Vitals" />
        
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
                            label="Temperature"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.temperature}
                            name="temperature"
                            error={!!touched.temperature && !!errors.temperature}
                            helperText={touched.temperature && errors.temperature}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            type="text"
                            label="Heart Rate"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.heartrate}
                            name="heartrate"
                            error={!!touched.heartrate && !!errors.heartrate}
                            helperText={touched.heartrate && errors.heartrate}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            type="text"
                            label="Weight"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.weight}
                            name="weight"
                            error={!!touched.weight && !!errors.weight}
                            helperText={touched.weight && errors.weight}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            type="text"
                            label="Height"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.height}
                            name="height"
                            error={!!touched.height && !!errors.height}
                            helperText={touched.height && errors.height}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            type="text"
                            label="BMI"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.bmi}
                            name="bmi"
                            error={!!touched.bmi && !!errors.bmi}
                            helperText={touched.bmi && errors.bmi}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            type="text"
                            label="Blood pressure"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.bloodpressure}
                            name="bloodpressure"
                            error={!!touched.bloodpressure && !!errors.bloodpressure}
                            helperText={touched.bloodpressure && errors.bloodpressure}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            type="text"
                            label="Respiratory Rate"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.respiratory}
                            name="respiratory"
                            error={!!touched.respiratory && !!errors.respiratory}
                            helperText={touched.respiratory && errors.respiratory}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <Typography variant="h5" fontWeight="600" sx={{ gridColumn: "span 4" }}>
                                   Medical History
                                </Typography>
                                <FormControl sx={{ gridColumn: "span 4" }}>
                                <FormLabel id="demo-row-radio-buttons-group-label">Any previous medication or illness</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                   
                                    
                                </RadioGroup>
                                </FormControl>
                                <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            type="text"
                            label="Disease"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.disease}
                            name="disease"
                            error={!!touched.disease && !!errors.disease}
                            helperText={touched.disease && errors.disease}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            type="text"
                            label="Drug (s)"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.drug}
                            name="drug"
                            error={!!touched.drug && !!errors.drug}
                            helperText={touched.drug && errors.drug}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <Typography variant="h5" fontWeight="600" sx={{ gridColumn: "span 4" }}>
                                   Duration
                                </Typography>
                                
                                <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            type="text"
                            label="From"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.from}
                            name="from"
                            error={!!touched.from && !!errors.from}
                            helperText={touched.from && errors.from}
                            sx={{ gridColumn: "span 1" }}
                        />
                       
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            type="text"
                            label="To"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.to}
                            name="to"
                            error={!!touched.to && !!errors.to}
                            helperText={touched.to && errors.to}
                            sx={{ gridColumn: "span 1" }}
                        />
                        
                        </Box>
                        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{padding: 10}}>
                            <Box>
                            <Stack direction="row" alignItems="center" spacing={2}>
                            <Button variant="contained" component="label" sx={{backgroundColor: colors.grey[100], color: colors.grey[700],}}>
                                Save changes                               
                            </Button>
                            <Link to={'/add-patient2'}>
                            <Button variant="outlined" component="label" sx={{backgroundColor: colors.grey[700], color: colors.grey[100], }}>
                                Next
                            </Button>
                            </Link>
                            
                            
                            </Stack>
                            </Box>
                            </Box>
                        

                            
                    </form>
                )}
            </Formik>
        </Box>
    )
}

const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    contact: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("required"),
    address1: yup.string().required("required"),
    address2: yup.string().required("required"),
});

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    address1: "",
    address2: "",
};

export default AddPatient2