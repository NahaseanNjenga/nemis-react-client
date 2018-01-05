import axios from 'axios'
import {ADD_STUDENT, UPDATE_STUDENT} from "./types"

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