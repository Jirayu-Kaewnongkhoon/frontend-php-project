import { BehaviorSubject } from 'rxjs';
import axios from 'axios';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() {
        return currentUserSubject.value
    }
};

function login(username, password) {
    const formData = new FormData()
    formData.append('username', username);
    formData.append('password', password);

    return axios.post('https://database-php-project.000webhostapp.com/login.php', formData)
        .then(response => {
            console.log("response: ", response.data?.[0])
            const user = response.data?.[0];
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                // console.log(user)
                currentUserSubject.next(user)
            }
            return user
            // do something about response
        })
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}