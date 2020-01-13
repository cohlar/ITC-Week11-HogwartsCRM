import axios from 'axios';

const baseUrl = 'http://127.0.0.1:5000/';

export function createStudent(firstname, lastname) {
    const apiPath = 'api/students/create';
    return axios.get(baseUrl + apiPath + '/' + firstname + '/' + lastname);
}

export function getStudents() {
    const apiPath = 'api/students/get';
    return axios.get(baseUrl + apiPath);
}

export function getStudentById(id) {
    const apiPath = 'api/students/get';
    return axios.get(baseUrl + apiPath + '/' + id);
}