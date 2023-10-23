import React, { useState, useEffect, useRef } from 'react';
import styled from "styled-components";
import Visits from "./visits";
import {
	Typography,
	Stack, Alert, AlertTitle,
} from "@mui/material";
import MyVerticalTabs from "./visitsPage";
import { useLocation, Link } from "react-router-dom";
import { globalVariables } from "../../../../utils/GlobalVariables";
import useAuth from "../../../../auth/useAuth/useAuth";
import { getDataTokens } from '../../../../utils/ApiCalls';

const LeftSide = (props) => {
	const [patient, setPatient] = useState();
    
    const { setAuth, setAuthed } = useAuth();
    const location = useLocation();
    const [errorMsg, setErrorMsg] = useState([]);
    const [successMsg, setSuccessMsg] = useState([]);

    const patientID = props.patientID;

	const mounted = useRef();

	useEffect(() => {
		mounted.current = true;
		const api_endpoint = globalVariables.END_POINT_PATIENT + patientID;

		getDataTokens(api_endpoint)
		.then((data) => {
			if (mounted) {                
				if (data.id) {
                    setPatient(data);
				}
				// else if (data.errorData.error) {
				// 	const status = data.errorData.status;
				// 	const message = data.errorData.message;
				// 	if (status === 401 && message === 'Unauthorized') {
				// 		setErrorMsg(message);
				// 		setAuthed(false);
				// 		setAuth("");
				// 		localStorage.clear();
				// 		<Navigate to={"/sign_in"} state={{ from: location.pathname }} replace />
				// 	}
				// 	else if (status === 500) {
				// 		setErrorMsg(message);
				// 	}
				// 	else if (status === 404) {
				// 		if (message.includes("Not Found")) {
				// 			const errorMessage = "Errror: Resource Not Found, Check the URL Usage";
				// 			setErrorMsg(errorMessage)
				// 		}
				// 		else {
				// 			setErrorMsg(message);
				// 		}
				// 	}
				// 	else {
				// 		setErrorMsg(message);
				// 	}
				// }
				else if (data.detail) {
				}
				else {
					setErrorMsg(data);
				}
			}
			setTimeout(() => {
				setErrorMsg([]);
				setSuccessMsg([]);
			}, 10000);
		})
		.catch((error) => {
            if (error?.message) {
                if (error.message.includes("Failed to fetch")) {
                    const errorMessage = "ERR_CONNECTION_REFUSED: Please try again or reload the page";
                    setErrorMsg(errorMessage);
                }
                else {
                    setErrorMsg(error.message);
                }
            }
		});
		
		return () => mounted.current = false;
	}, [ mounted, patientID, setAuth, setAuthed, location ]);

    return (
        <Container>
				
            {errorMsg.length > 0 || Object.keys(errorMsg).length ?
                <>
                    {typeof errorMsg === 'object' ?
                        Object.entries(errorMsg).map(([key, value]) => {
                            return <Stack sx={{ width: '100%', mb: 2, alignItems: "center" }} key={ key }>
                                <Alert severity="error"  sx={{ mt: 1}}>
                                    <AlertTitle>
                                        <Typography variant='h1' fontSize="30px">
                                            <strong>Error:</strong>
                                        </Typography>
                                    </AlertTitle>
                                    <Typography variant='h1' fontSize="20px">
                                        <strong>{ value }</strong>
                                    </Typography>
                                </Alert>
                            </Stack>
                        })
                    :
                        <Stack sx={{ width: '100%', mb: 2, alignItems: 'center'}} spacing={2}>
                            <Alert severity="error"  sx={{ mt: 1}}>
                                <AlertTitle>
                                    <Typography variant='h1' fontSize="30px">
                                        <strong>Error:</strong>
                                    </Typography>
                                </AlertTitle>
                                <Typography variant='h1' fontSize="20px">
                                    <strong>{ errorMsg }</strong>
                                </Typography>
                            </Alert>
                        </Stack>
                    }
                </>
            :''}
            
            {successMsg.length > 0 || Object.keys(successMsg).length ?
                <>
                    {typeof successMsg === 'object' ?
                        Object.entries(successMsg).map(([key, value]) => {
                            return <Stack sx={{ width: '100%', alignItems: "center"}} key={ key }>
                                <Alert severity="success">
                                    <AlertTitle>
                                        <Typography variant='h1' fontSize="30px">
                                            <strong>Success:</strong>
                                        </Typography>
                                    </AlertTitle>
                                    <Typography variant='h1' fontSize="20px">
                                        <strong>{ value }</strong>
                                    </Typography>
                                </Alert>
                            </Stack>
                        })
                    :
                        <Stack sx={{ width: '100%', alignItems: 'center'}} spacing={2}>
                            <Alert severity="success">
                                <AlertTitle>
                                    <Typography variant='h1' fontSize="30px">
                                        <strong>Success:</strong>
                                    </Typography>
                                </AlertTitle>
                                <Typography variant='h1' fontSize="20px">
                                    <strong>{ successMsg }</strong>
                                </Typography>
                            </Alert>
                        </Stack>
                    }
                </>
            :''}

            { patient &&
            <ArtCard>
                <UserInfo>
                    <h1>
                        <NameCard>{ patient.name }</NameCard>
                    </h1>
                    <Link to={""}>
                        <LinkCard>{ patient.email }</LinkCard>
                    </Link>
                    <h6>
                        <TitleCardPro>{ patient.role }</TitleCardPro>
                    </h6>
                </UserInfo>
                <Widget>
                    <Link to={""}>
                        <div>
                            {/* <img src="/images/adress-icon.png" alt="" /> */}
                            <span>{ patient.location.parish }/{ patient.location.subcounty }</span>
                        </div>
                    </Link>
                    <StatusCard>
                        <div>
                            {/* <img src="/images/university-icon.png" alt="" /> */}
                            <span>{ patient.location.district } District</span>
                        </div>
                        
                    </StatusCard>
                    
                </Widget>
            </ArtCard>
            }
            <ArtCard>
                <MyVerticalTabs/>
            </ArtCard>
            <ArtCard>
                <Visits/>
            </ArtCard>
            
        </Container>
    )
}

const Container = styled.div`
    grid-area: leftside;
`; 


const ArtCard = styled.div`
    text-align: center;
    overflow: hidden;
    margin-bottom: 8px;
    background-color: #fff;
    border-radius: 6px;
    transition: box-shadow 83ms:
    position: relative;
    border: none;
    box-shadow: 0 0 0 1px rgba(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const UserInfo = styled.div`
    border-bottom: 2px solid rgba(0, 0, 0, 0.15);
    padding: 12px 12px 16px;
    word-wrap: break-word;
    word-break: break-word;

`;

// const CardBackground = styled.div`
//     background: url("/images/OIP.jpeg");
//     background-position: center;
//     background-size: 482px;
//     height: 224px;
//     margin: -12px -12px 0;
// `;

// const Photo = styled.div`
//     box-shadow: none;
//     background-image: url("/images/fotocv.jpg");
//     width: 150px;
//     height: 150px;
//     box-sizing: border-box;
//     background-clip: content-box;
//     background-color: white;
//     background-position: center;
//     background-size: 100%;
//     background-repeat: no-repeat;
//     border: 3px solid black;
//     margin: -38px auto 12px;
//     border-radius: 50%;
// `;

const NameCard = styled.div`
    font-family: Arial;
    font-size: 24px;
    font-styled: bold;
    color: #5ab2da;
    line-height: 1.5;
`;

const LinkCard = styled.div`
    font-size: 14px;
    line-height: 1.5;
`;

const TitleCardPro = styled.div`
    font-size: 12px;
    color: #808080;
`;

const Widget = styled.div`
    padding-top: 20px;
    padding-bottom: 20px;
    color: #808080;
    margin-left: 10px;

    & > a {
        text-decoration: none;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        padding: 4px 12px;

        &:hover {
            background-color: rgba(0, 0, 0, 0.08);
        }

        div {
            display: flex;
            align-items: center;
        }
    }
    
    & span {
        margin-left: 10px;
    }
`;

const StatusCard = styled.div`
    text-decoration: none;
    display: flex;
    font-size: 14px;
    padding: 10px 10px 10px 10px;
    align-items: center;
    justify-content: space-between;
    word-wrap: none;
    word-break: none;
    

    div {
        display: flex;
        align-items: center;
        &:hover {
            background-color: rgba(0, 0, 0, 0.08);
        }
    }

    span {
        align-items: center;

    }



`;


export default LeftSide;
