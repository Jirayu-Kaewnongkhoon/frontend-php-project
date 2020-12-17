import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import PublishIcon from '@material-ui/icons/Publish';
import DescriptionIcon from '@material-ui/icons/Description';
import InfoIcon from '@material-ui/icons/Info';
import swal from 'sweetalert';
import { authenticationService } from '../services/authenticationService';
import { jobService } from '../services/jobService';
import { createBrowserHistory } from 'history';
import ImageUpload from '../components/ImageUpload';
import SelectLocation from '../components/SelectLocation';


const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(8),
    },
    form: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    inputDetail: {
        marginTop: '8px',
        backgroundColor: '#ffffff',
        width: '750px',
        borderRadius: '4px',
        padding: '20px',
        "&::placeholder": {
            fontSize: '16px',
            fontColor: '##757575'
        },
        '@media(max-width: 768px)': {
            width: '350px',
        },
        borderColor: '#c4c4c4',
        fontSize: '16px'
    },
    section: {
        marginTop: '30px', 
        marginBottom: '30px'
    },
    contentHeader: {
        fontSize: 18, 
        textDecoration: 'underline', 
        display: 'flex', 
        marginBottom: 20
    },
    content: {
        display: 'flex',
        justifyContent: 'center'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        width: '50%',
    },
}));

function JobRequestForm() {

    const classes = useStyles();
    const currentUser = authenticationService.currentUserValue;
    const history = createBrowserHistory({ forceRefresh: true });

    const [jobRequest, setJobRequest] = React.useState({
        image: null,
        // image: '',
        buildingName: '',
        room: '',
        floor: '',
        description: ''
    });

    useEffect(() => {
        document.title = "Fix Me : Job Request Form";
    }, [])

    const onSubmitClick = (e) => {
        e.preventDefault();
        console.log("jobRequest => ", jobRequest);
        const { buildingName, floor, room, description, image } = jobRequest;

        if (buildingName === '' || floor === '' || room === '' || description === '' || image === null) {
            swal({
                title: "Textfield couldn't empty",
                text: "Please try again",
                icon: "warning",
                button: "Accept",
            })
        } else {
            jobService.createJobRequest(currentUser.user_id, buildingName, floor, room, description, image)
                .then(
                    res => {
                        console.log(res?.[0].message);
                        const title = res?.[0].message;
                        swal({
                            title: title,
                            icon: "success",
                            button: "Accept",
                        })
                        .then(() => {
                            history.push('/history')
                        })
                    }
                )
                .catch(
                    err => {
                        console.log(err);
                        swal({
                            title: "Something went wrong",
                            text: "Please try again",
                            icon: "error",
                            button: "Accept",
                        })
                    }
                )
        }
    }

    const handleUpload = (imageValue) => {
        setJobRequest({
            ...jobRequest,
            image: imageValue
        });
    }

    const handleResetUpload = () => {
        setJobRequest({
            ...jobRequest,
            image: null
            // image: ''
        });
    }

    const handleBuildingSelection = (buildingValue) => {
        setJobRequest({ 
            ...jobRequest, 
            buildingName: buildingValue 
        });
    }

    return (
        <div>
            <div className={classes.root} >
                <Container maxWidth='md' >
                    <form className={classes.form} noValidate autoComplete="off" onSubmit={onSubmitClick} >

                        <SelectLocation onChange={handleBuildingSelection} />

                        <div className={classes.section} >
                            <Typography variant='h6' className={classes.contentHeader} >
                                <InfoIcon color='primary'/>
                                Place Information
                            </Typography>

                            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                                <TextField
                                    required
                                    label="Building"
                                    variant="outlined"
                                    name='buildingName'
                                    value={jobRequest.buildingName}
                                    onChange={e => setJobRequest({ ...jobRequest, [e.target.name]: e.target.value })}
                                />
                            
                                <TextField
                                    required
                                    label="Room"
                                    variant="outlined"
                                    name='room'
                                    onChange={e => setJobRequest({ ...jobRequest, [e.target.name]: e.target.value })}
                                />

                                <TextField
                                    required
                                    label="Floor"
                                    variant="outlined"
                                    name='floor'
                                    onChange={e => setJobRequest({ ...jobRequest, [e.target.name]: e.target.value })}
                                />
                            </div>
                        </div>

                        <Divider />

                        <div className={classes.section} >
                            <Typography variant='h6' className={classes.contentHeader} >
                                <PublishIcon color='primary'/>
                                Upload Image
                            </Typography>

                            <div className={classes.content} >
                                <ImageUpload onChange={handleUpload} onRemove={handleResetUpload} />
                            </div>
                        </div>

                        <Divider />

                        <div className={classes.section} >
                            <Typography variant='h6' className={classes.contentHeader} >
                                <DescriptionIcon color='primary'/>
                                Description
                            </Typography>

                            <div className={classes.content} >
                                <TextareaAutosize
                                    name="description" 
                                    aria-label="description" 
                                    rowsMin={8}
                                    placeholder="Description..." 
                                    className={classes.inputDetail}
                                    onChange={e => setJobRequest({ ...jobRequest, [e.target.name]: e.target.value })} 
                                />
                            </div>
                        </div>

                        <div className={classes.content} >
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Submit
                            </Button>
                        </div>

                    </form>
                </Container>
            </div>
        </div>
    )
}

export default JobRequestForm
