import React from 'react'
import { makeStyles } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';
import { authenticationService } from '../services/authenticationService';
import { jobService } from '../services/jobService';
import { createBrowserHistory } from 'history';
import ImageUpload from '../components/ImageUpload';
import SelectLocation from '../components/SelectLocation';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '25ch',
        },
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
            jobService.createJobRequest(
                currentUser.user_id, 
                jobRequest.buildingName, 
                jobRequest.floor, 
                jobRequest.room, 
                jobRequest.description, 
                jobRequest.image
            )
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
            {
                currentUser &&
                <div>
                    <h1 style={{textAlign: 'center'}} >Job Request Form</h1>
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmitClick} >

                        <SelectLocation onChange={handleBuildingSelection} />
                        <ImageUpload onChange={handleUpload} onRemove={handleResetUpload} />

                        <TextField
                            required
                            label="Building"
                            variant="outlined"
                            name='buildingName'
                            value={jobRequest.buildingName}
                            onChange={e => setJobRequest({ ...jobRequest, [e.target.name]: e.target.value })}
                        />
                        
                        <div>
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

                        <br />

                        <TextareaAutosize
                            name="description" 
                            aria-label="description" 
                            rowsMin={8}
                            placeholder="Description..." 
                            className={classes.inputDetail}
                            onChange={e => setJobRequest({ ...jobRequest, [e.target.name]: e.target.value })} 
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Submit
                        </Button>

                    </form>
                    
                </div>
            }
        </div>
    )
}

export default JobRequestForm
