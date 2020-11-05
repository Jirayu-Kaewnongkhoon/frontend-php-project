import axios from 'axios';

export const userService = {
    getStaff,
    
};

function getStaff(user_id) {
    return axios.get(`https://database-php-project.000webhostapp.com/api/UserServices/getStaff.php?user_id=${user_id}`)
        .then(response => {
            console.log("getStaff => ", response);
            return response.data.data
        })
}