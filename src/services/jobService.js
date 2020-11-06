import axios from 'axios';

export const jobService = {
    getJobRequest,
    createJobRequest,
    createJobAssignment,
    getJobAssignment,
    getJobById,
    
};

function getJobRequest(user_id) {
    return axios.get(`https://database-php-project.000webhostapp.com/api/JobServices/getJobRequest.php?user_id=${user_id}`)
        .then(response => {
            console.log("getJobRequest => ", response);
            return response.data.data
        })
}

function createJobRequest(requester_id, building, floor, room, description, pre_image_path) {

    const formData = new FormData();
    formData.append('requester_id', requester_id);
    formData.append('building', building);
    formData.append('floor', floor);
    formData.append('room', room);
    formData.append('description', description);
    formData.append('pre_image_path', pre_image_path);

    return axios.post("https://database-php-project.000webhostapp.com/api/JobServices/createJobRequest.php", formData)
        .then(response => {
            console.log("createJobRequest => ", response);
            return response.data.data
        })
}

function createJobAssignment(staff_id, job_id) {

    const formData = new FormData();
    formData.append('staff_id', staff_id);
    formData.append('job_id', job_id);    

    return axios.post("https://database-php-project.000webhostapp.com/api/JobServices/createJobAssignment.php", formData)
        .then(response => {
            console.log("createJobAssignment => ", response);
            return response.data.data
        })
}

function getJobAssignment(user_id) {
    return axios.get(`https://database-php-project.000webhostapp.com/api/JobServices/getJobAssignment.php?user_id=${user_id}`)
        .then(response => {
            console.log("getJobAssignment => ", response);
            return response.data.data
        })
}

function getJobById(job_id) {
    return axios.get(`https://database-php-project.000webhostapp.com/api/JobServices/getJobById.php?job_id=${job_id}`)
        .then(response => {
            console.log("getJobById => ", response);
            return response.data.data
        })
}