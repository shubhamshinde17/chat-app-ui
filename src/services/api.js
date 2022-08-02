import axios from 'axios';

const LoginUser = async (email, password) => {
    const response = axios.post('http://localhost:3000/api/login', {
        email, password
    }).then((response => response.json())).then(responseJson => {

    });
    return response;
}

export default LoginUser;