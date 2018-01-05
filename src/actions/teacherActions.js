import axios from 'axios'
import {ADD_TEACHER, UPDATE_TEACHER} from "./types"

export function isTeacherExists(name) {
    return dispatch => {
        return axios.post('/teachers', {name: name})
    }
}

export function registerTeacher(teacher) {
    return dispatch => {
        return axios.post('/register_teacher', teacher)
    }
}

export function updateTeacher(teacher) {
    return dispatch => {
        return axios.post('/update_teacher_info', teacher)
    }
}

export function addTeacher(teacher) {
    return {
        type: ADD_TEACHER,
        payload:teacher
    }
}
export function updateTeacherList(teacher) {
    return {
        type: UPDATE_TEACHER,
        payload:teacher
    }
}
export function getTeachers() {
    return dispatch=>{
        return axios.get('/admin/teachers')
    }
}