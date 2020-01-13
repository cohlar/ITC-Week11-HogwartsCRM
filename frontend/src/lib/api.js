import axios from 'axios';

const baseUrl = 'http://127.0.0.1:5000/';

export function createStudent(firstname, lastname, magicSkills, courses) {
    const apiPath = 'api/students/create';
    const payload = {
        'firstname': firstname,
        'lastname': lastname,
        'magicskills': magicSkills,
        'courses': courses,
    }
    return axios.post(baseUrl + apiPath, payload);
}

export function getStudents() {
    const apiPath = 'api/students/get';
    return axios.get(baseUrl + apiPath);
}

export function getStudentById(id) {
    const apiPath = 'api/students/get';
    return axios.get(baseUrl + apiPath + '/' + id);
}