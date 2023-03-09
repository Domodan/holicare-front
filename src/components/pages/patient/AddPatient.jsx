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
import { AddOutlined } from '@mui/icons-material';
import {Grid} from '@mui/material'
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

const AddPatient = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const handleFormSubmit = (values) => {
      console.log("Form Data:", values);
    };
    

    return (
        <Box m="20px">
            <Header title="ADD NEW PATIENT" subtitle="Create a New Patient Profile" />
        
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
                            label="First Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.firstName}
                            name="firstName"
                            error={!!touched.firstName && !!errors.firstName}
                            helperText={touched.firstName && errors.firstName}
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
                            value={values.lastName}
                            name="lastName"
                            error={!!touched.lastName && !!errors.lastName}
                            helperText={touched.lastName && errors.lastName}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            type="text"
                            label="Birth Date"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.birth}
                            name="birth"
                            error={!!touched.birth && !!errors.birth}
                            helperText={touched.birth && errors.birth}
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
                            label="Emergency Contact"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.emergency}
                            name="emergency"
                            error={!!touched.emergency && !!errors.emergency}
                            helperText={touched.emergency && errors.emergency}
                            sx={{ gridColumn: "span 2" }}
                        />
                            <FormControl sx={{ gridColumn: "span 2" }}>
                                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                   
                                    
                                </RadioGroup>
                                </FormControl>
                                <FormControl sx={{ gridColumn: "span 2" }}>
                                <FormLabel id="demo-row-radio-buttons-group-label">Marital Status</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="female" control={<Radio />} label="Single" />
                                    <FormControlLabel value="male" control={<Radio />} label="Married" />
                                    <FormControlLabel value="divorced" control={<Radio />} label="Divorced" />
                                    <FormControlLabel value="widowed" control={<Radio />} label="Widowed" />
                                   
                                    
                                </RadioGroup>
                                </FormControl>
                                <Typography variant="h5" fontWeight="600" sx={{ gridColumn: "span 2" }}>
                                    Patient Location
                                </Typography>
                                <Typography variant="h5" fontWeight="600" sx={{ gridColumn: "span 2" }}>
                                    Patient Location History
                                </Typography>
                                
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
                            sx={{ gridColumn: "span 1" }}
                        />
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
                            label="District"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.district}
                            name="district"
                            error={!!touched.district && !!errors.district}
                            helperText={touched.district && errors.district}
                            sx={{ gridColumn: "span 1" }}
                        />
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
                            label="Parish"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.parish}
                            name="parish"
                            error={!!touched.parish && !!errors.parish}
                            helperText={touched.parish && errors.parish}
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
                            value={values.subcounty}
                            name="subcounty"
                            error={!!touched.subcounty && !!errors.subcounty}
                            helperText={touched.subcounty && errors.subcounty}
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
                         <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            type="text"
                            label="Sub County"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.subcounty}
                            name="subcounty"
                            error={!!touched.subcounty && !!errors.subcounty}
                            helperText={touched.subcounty && errors.subcounty}
                            sx={{ gridColumn: "span 1" }}
                        />

                        <Typography variant="h5" fontWeight="400" sx={{ gridColumn: "span 2" }}>
                                   Coordinates
                                </Typography>
                                <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            type="text"
                            label="Time spent"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.time}
                            name="time"
                            error={!!touched.time && !!errors.time}
                            helperText={touched.time && errors.time}
                            sx={{ gridColumn: "span 1" }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            type="text"
                            label="Village"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.village}
                            name="village"
                            error={!!touched.village && !!errors.village}
                            helperText={touched.village && errors.village}
                            sx={{ gridColumn: "span 1" }}
                        />
                        
                             <Grid container spacing={3}>
                                
                                <Grid item xs={6}>
                                  
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
                            sx={{ gridColumn: "span 0.5" }}
                        />
                                </Grid>
                                <Grid item xs={6}>
                                  
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
                            sx={{ gridColumn: "span 0.5" }}
                        />
                                </Grid>
                            </Grid>     


                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            type="text"
                            label="Village"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.village}
                            name="village"
                            error={!!touched.village && !!errors.village}
                            helperText={touched.village && errors.village}
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

export default AddPatient