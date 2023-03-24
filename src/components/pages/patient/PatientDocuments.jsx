import React from 'react';
import {
    Box,
    Button,
    useTheme,
    Typography,
    CardActionArea,
} from '@mui/material';
import { tokens } from '../../../theme';
import Header from '../../includes/Header';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const PatientDocuments = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Patient Documents" subtitle="You can now browse through the different reports generated from
                each of your visits with us in this section. " />

                <Box>
                <Button variant="contained" component="label">
                            
                            Last 30 days
                        </Button>
                   
                </Box>


              
            </Box>
            <Typography gutterBottom variant="p" component="div"  sx={{marginTop: 5}}>
                       Mar 11 2023
                    </Typography>
            <Box display="flex" alignItems="center" sx={{marginTop: 5}}>
                <Box sx={{paddingLeft: 5}}>
                <Card sx={{ maxWidth: 340 }}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="50"
                        image="/assets/dumm.pdf"
                        alt=""
                        />
                        <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            Report
                        </Typography>
                        <Box display="flex" >
                        <Typography gutterBottom variant="h5" component="div">
                            Test Report 1
                        </Typography>
                        <Button variant="outlined" size="small" sx={{color: colors.primary[500], marginLeft: 7,}}>
                        Open
                        </Button>
                        </Box>
                        <Typography variant="body1" color="text.secondary">
                            Mike Bostock Feb 20 2023
                        </Typography>
    
                        </CardContent>
                    </CardActionArea>
                    
                    </Card>
                </Box>
                <Box sx={{paddingLeft: 10}}>
                <Card sx={{ maxWidth: 340, }}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="50"
                        image="/assets/dumm.pdf"
                        alt=""
                        />
                        <CardContent sx={{color: colors.grey[500],}}>
                        <Typography variant="body2" color="text.secondary">
                            Report
                        </Typography>
                        <Box display="flex" >
                        <Typography gutterBottom variant="h5" component="div">
                            Test Report 2
                        </Typography>
                        <Button variant="outlined" size="small" sx={{color: colors.primary[500], marginLeft: 7,}}>
                        Open
                        </Button>
                        </Box>
                        <Typography variant="body1" color="text.secondary">
                            Mike Bostock Feb 20 2023
                        </Typography>
                        
                        </CardContent>
                    </CardActionArea>
                
                    </Card>
                </Box>
                <Box sx={{paddingLeft: 10}}>
                <Card sx={{ maxWidth: 340 }}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="50"
                        image="/assets/dumm.pdf"
                        alt=""
                        />
                        <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            Report
                        </Typography>
                        <Box display="flex" >
                        <Typography gutterBottom variant="h5" component="div">
                            Test Report 3
                        </Typography>
                        <Button variant="outlined" size="small" sx={{color: colors.primary[500], marginLeft: 7,}}>
                        Open
                        </Button>
                        </Box>
                        <Typography variant="body1" color="text.secondary">
                            Mike Bostock Feb 20 2023
                        </Typography>
                        
                        </CardContent>
                    </CardActionArea>
                    
                    </Card>
                </Box>
            </Box>

            <Typography gutterBottom variant="p" component="div"  sx={{marginTop: 5}}>
                       Feb 01 2023
                    </Typography>
                    <Box display="flex" alignItems="center" sx={{marginTop: 5}}>
                <Box sx={{paddingLeft: 5}}>
                <Card sx={{ maxWidth: 340 }}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="50"
                        image="/assets/dumm.pdf"
                        alt=""
                        />
                        <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            Report
                        </Typography>
                        <Box display="flex" >
                        <Typography gutterBottom variant="h5" component="div">
                            Test Report 1
                        </Typography>
                        <Button variant="outlined" size="small" sx={{color: colors.primary[500], marginLeft: 7,}}>
                        Open
                        </Button>
                        </Box>
                        <Typography variant="body1" color="text.secondary">
                            Mike Bostock Feb 20 2023
                        </Typography>
    
                        </CardContent>
                    </CardActionArea>
                    
                    </Card>
                </Box>
                <Box sx={{paddingLeft: 10}}>
                <Card sx={{ maxWidth: 340, }}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="50"
                        image="/assets/dumm.pdf"
                        alt=""
                        />
                        <CardContent sx={{color: colors.grey[500],}}>
                        <Typography variant="body2" color="text.secondary">
                            Report
                        </Typography>
                        <Box display="flex" >
                        <Typography gutterBottom variant="h5" component="div">
                            Test Report 2
                        </Typography>
                        <Button variant="outlined" size="small" sx={{color: colors.primary[500], marginLeft: 7,}}>
                        Open
                        </Button>
                        </Box>
                        <Typography variant="body1" color="text.secondary">
                            Mike Bostock Feb 20 2023
                        </Typography>
                        
                        </CardContent>
                    </CardActionArea>
                
                    </Card>
                </Box>
                <Box sx={{paddingLeft: 10}}>
                <Card sx={{ maxWidth: 340 }}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="50"
                        image="/assets/dumm.pdf"
                        alt=""
                        />
                        <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            Report
                        </Typography>
                        <Box display="flex" >
                        <Typography gutterBottom variant="h5" component="div">
                            Test Report 3
                        </Typography>
                        <Button variant="outlined" size="small" sx={{color: colors.primary[500], marginLeft: 7,}}>
                        Open
                        </Button>
                        </Box>
                        <Typography variant="body1" color="text.secondary">
                            Mike Bostock Feb 20 2023
                        </Typography>
                        
                        </CardContent>
                    </CardActionArea>
                    
                    </Card>
                </Box>
            </Box>

            <Typography gutterBottom variant="p" component="div"  sx={{marginTop: 5}}>
                       Jan 10 2023
                    </Typography>
                    <Box display="flex" alignItems="center" sx={{marginTop: 5}}>
                <Box sx={{paddingLeft: 5}}>
                <Card sx={{ maxWidth: 340 }}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="50"
                        image="/assets/dumm.pdf"
                        alt=""
                        />
                        <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            Report
                        </Typography>
                        <Box display="flex" >
                        <Typography gutterBottom variant="h5" component="div">
                            Test Report 1
                        </Typography>
                        <Button variant="outlined" size="small" sx={{color: colors.primary[500], marginLeft: 7,}}>
                        Open
                        </Button>
                        </Box>
                        <Typography variant="body1" color="text.secondary">
                            Mike Bostock Feb 20 2023
                        </Typography>
    
                        </CardContent>
                    </CardActionArea>
                    
                    </Card>
                </Box>
                <Box sx={{paddingLeft: 10}}>
                <Card sx={{ maxWidth: 340, }}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="50"
                        image="/assets/dumm.pdf"
                        alt=""
                        />
                        <CardContent sx={{color: colors.grey[500],}}>
                        <Typography variant="body2" color="text.secondary">
                            Report
                        </Typography>
                        <Box display="flex" >
                        <Typography gutterBottom variant="h5" component="div">
                            Test Report 2
                        </Typography>
                        <Button variant="outlined" size="small" sx={{color: colors.primary[500], marginLeft: 7,}}>
                        Open
                        </Button>
                        </Box>
                        <Typography variant="body1" color="text.secondary">
                            Mike Bostock Feb 20 2023
                        </Typography>
                        
                        </CardContent>
                    </CardActionArea>
                
                    </Card>
                </Box>
                <Box sx={{paddingLeft: 10}}>
                <Card sx={{ maxWidth: 340 }}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="50"
                        image="/assets/dumm.pdf"
                        alt=""
                        />
                        <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            Report
                        </Typography>
                        <Box display="flex" >
                        <Typography gutterBottom variant="h5" component="div">
                            Test Report 3
                        </Typography>
                        <Button variant="outlined" size="small" sx={{color: colors.primary[500], marginLeft: 7,}}>
                        Open
                        </Button>
                        </Box>
                        <Typography variant="body1" color="text.secondary">
                            Mike Bostock Feb 20 2023
                        </Typography>
                        
                        </CardContent>
                    </CardActionArea>
                    
                    </Card>
                </Box>
            </Box>
          
        </Box>
    )
}

export default PatientDocuments