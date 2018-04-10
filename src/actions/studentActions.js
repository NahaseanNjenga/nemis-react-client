import axios from 'axios'
import {ADD_STUDENT, CLEAR_STUDENTS, UPDATE_STUDENT} from "./types"

export function isStudenetExists(name) {
    return dispatch => {
        return axios.post('/students', {name: name})
    }
}

export function registerStudent(student) {
    return dispatch => {
        return axios.post('/register_student', student)
    }
}

export function updateStudent(student) {
    return dispatch => {
        return axios.post('/update_student_info', student)
    }
}

export function addStudent(student) {
    return {
        type: ADD_STUDENT,
        payload:student
    }
}
export function clearStudents() {
    return {
        type: CLEAR_STUDENTS,
        payload:[]
    }
}
export function updateStudentList(student) {
    return {
        type: UPDATE_STUDENT,
        payload:student
    }
}
export function getStudents() {
    return dispatch=>{
        return axios.get('/admin/students')
    }
}
export function getSchoolStudents(upi) {
    return dispatch => {
        return axios.post('/schools/students', {upi: upi})
    }
}
export function searchStudentUpi(upi) {
    return dispatch => {
        return axios.post('/search/student/upi', {upi: upi})
    }
}
export function searchStudentName(name) {
    return dispatch => {
        return axios.post('/search/student/name', {name: name})
    }
}
export function getSchoolCandidates(upi) {
    return dispatch => {
        return axios.post('/schools/candidates', {upi: upi})
    }

}
export function uploadCertificate(certificate) {
    return dispatch => {
        return axios.post('/students/certificates/add', certificate)
    }
}
export function uploadProfilePicture(photo) {
    return dispatch => {
        return axios.post('/students/picture/add', photo)
    }
}