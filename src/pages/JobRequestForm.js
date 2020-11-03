import React, { /* useEffect */ } from 'react'
import { authenticationService } from '../services/authenticationService';
import { Link } from 'react-router-dom';
// import { createBrowserHistory } from 'history';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles({
    root: {

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
});

function JobRequestForm() {

    const classes = useStyles();
    const currentUser = authenticationService.currentUserValue;
    // const history = createBrowserHistory({ forceRefresh: true });

    // useEffect(() => {
    //     console.log("req");
    //     if (!currentUser) {
    //         history.push('/login');
    //     }
    // }, [])

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

        const formData = new FormData();
        formData.append('requester_id', currentUser.user_id);
        formData.append('building', jobRequest.buildingName);
        formData.append('floor', jobRequest.floor);
        formData.append('room', jobRequest.room);
        formData.append('description', jobRequest.description);
        formData.append('pre_image_path', jobRequest.image);


        axios.post("https://database-php-project.000webhostapp.com/api/JobServices/createJobRequest.php", formData)
            .then(res => console.log(res))
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
                    <div>
                        <h2>Name : {currentUser.user_name}</h2>
                        <h2>Your role is : "{currentUser.role_name}"</h2>
                        <Link to={'/login'} >
                            <button
                                type="button"
                                onClick={() => authenticationService.logout()}
                            >
                                Log out
                        </button>
                        </Link>
                    </div>

                    <hr />

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
