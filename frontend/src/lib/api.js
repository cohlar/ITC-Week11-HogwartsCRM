import axios from 'axios';

const baseUrl = 'http://127.0.0.1:5000/';

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

// export function getStudentSkill(id) {
//     const apiPath = 'api/studentskills/get';
//     return axios.get(baseUrl + apiPath + '/' + id);
// }

// export function getStudentCourse(id) {
//     const apiPath = 'api/studentcourses/get';
//     return axios.get(baseUrl + apiPath + '/' + id);
// }