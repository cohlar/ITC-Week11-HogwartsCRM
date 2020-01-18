import axios from 'axios';

const baseUrl = 'http://127.0.0.1:5000/';

export function getMagicSkills() {
    const apiPath = 'api/magicskills';
    return axios.get(baseUrl + apiPath);
}

export function getCourses() {
    const apiPath = 'api/courses';
    return axios.get(baseUrl + apiPath);
}

export function createStudent(firstname, lastname, magicSkills, courses) {
    const apiPath = 'api/student';
    const payload = {
        'firstname': firstname,
        'lastname': lastname,
        'magicskills': magicSkills,
        'courses': courses,
    }
    return axios.post(baseUrl + apiPath, payload);
}

export function getStudent(id) {
    const apiPath = 'api/student';
    return axios.get(baseUrl + apiPath + '/' + id);
}

export function editStudent(id, firstname, lastname, magicSkills, courses) {
    const apiPath = 'api/student';
    const payload = {
        'id': id,
        'firstname': firstname,
        'lastname': lastname,
        'magicskills': magicSkills,
        'courses': courses,
    }
    return axios.put(baseUrl + apiPath, payload);
}

export function deleteStudent(id) {
    const apiPath = 'api/student';
    return axios.delete(baseUrl + apiPath + '/' + id);
}

export function getStudents() {
    const apiPath = 'api/students';
    return axios.get(baseUrl + apiPath);
}

export function getStudentsByDay() {
    const apiPath = 'api/stats/students/daily';
    return axios.get(baseUrl + apiPath);
}

export function getStudentSkills() {
    const apiPath = 'api/stats/students/skills';
    return axios.get(baseUrl + apiPath);
}

export function getStudentCourses() {
    const apiPath = 'api/stats/students/courses';
    return axios.get(baseUrl + apiPath);
}