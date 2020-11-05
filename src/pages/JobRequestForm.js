import React from 'react'
import { makeStyles } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import { authenticationService } from '../services/authenticationService';
import { jobService } from '../services/jobService';


const useStyles = makeStyles({
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
});

function JobRequestForm() {

    const classes = useStyles();
    const currentUser = authenticationService.currentUserValue;

    const [jobRequest, setJobRequest] = React.useState({
        image: '',
        buildingName: '',
        room: '',
        floor: '',
        description: ''
    });

    const onSubmitClick = (e) => {
        e.preventDefault();
        console.log("jobRequest => ", jobRequest);

        jobService.createJobRequest(
            currentUser.user_id, 
            jobRequest.buildingName, 
            jobRequest.floor, 
            jobRequest.room, 
            jobRequest.description, 
            jobRequest.image
        )
            .then(res => console.log(res?.[0].message))
            .catch(err => console.log(err))

        setJobRequest({
            buildingName: '',
            room: '',
            floor: '',
            description: ''
        });
    }

    return (
        <div>
            {
                currentUser &&
                <div>
                    <form onSubmit={onSubmitClick} >

                        <label>
                            Image :
                        <input
                            type='file'
                            accept="image/*"
                            name='image'
                            onChange={e => {
                                const { name, files } = e.target;
                                const reader = new FileReader();
                                reader.readAsDataURL(files[0]);

                                reader.onload = (evt) => {
                                    setJobRequest({ 
                                        ...jobRequest, 
                                        [name]: evt.target.result 
                                    })
                                }
                                
                            }} />
                            <br />
                        </label>

                        <label>
                            Building :
                        <input
                            type='text'
                            name='buildingName'
                            value={jobRequest.buildingName}
                            onChange={e => setJobRequest({ ...jobRequest, [e.target.name]: e.target.value })} />
                            <br />
                        </label>

                        <label>
                            Room :
                        <input
                            type='text'
                            name='room'
                            value={jobRequest.room}
                            onChange={e => setJobRequest({ ...jobRequest, [e.target.name]: e.target.value })} />
                            <br />
                        </label>

                        <label>
                            Floor :
                        <input
                            type='text'
                            name='floor'
                            value={jobRequest.floor}
                            onChange={e => setJobRequest({ ...jobRequest, [e.target.name]: e.target.value })} />
                            <br />
                        </label>

                        <label>
                            Description :
                        <TextareaAutosize
                            name="description" 
                            aria-label="description" 
                            rowsMin={8}
                            placeholder="รายละเอียดการแจ้งซ่อม..." 
                            className={classes.inputDetail}
                            onChange={e => setJobRequest({ ...jobRequest, [e.target.name]: e.target.value })} />
                            <br />
                        </label>

                        <button type='submit' >Submit</button>

                    </form>
                    
                </div>
            }
        </div>
    )
}

export default JobRequestForm
