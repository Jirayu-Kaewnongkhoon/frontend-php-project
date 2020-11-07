import axios from 'axios';

// const url = "https://database-php-project.000webhostapp.com"
const url = "http://localhost/backend-php-project"

export const userService = {
    getStaff,
    
};

function getStaff(user_id) {
    return axios.get(`${url}/api/UserServices/getStaff.php?user_id=${user_id}`)
        .then(response => {
            console.log("getStaff => ", response);
            return response.data.data
        })
}