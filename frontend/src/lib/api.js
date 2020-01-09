import axios from 'axios';

const baseUrl = 'http://127.0.0.1:5000/';

export function createStudent(firstname, lastname) {
    const apiPath = 'students/add/';
    return axios.get(baseUrl + apiPath + firstname + '/' + lastname);
}