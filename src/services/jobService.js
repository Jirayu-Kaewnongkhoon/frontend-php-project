import axios from 'axios';

export const jobService = {
    getJobRequest,
    createJobRequest,
    createJobAssignment,

};

function getJobRequest(user_id) {
    return axios.get(`https://database-php-project.000webhostapp.com/api/JobServices/getJobRequest.php?head_id=${user_id}`)
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

function createJobAssignment() {
    
}