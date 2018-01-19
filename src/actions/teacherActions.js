import axios from 'axios'
import {ADD_TEACHER, CLEAR_TEACHERS, UPDATE_TEACHER,REMOVE_TEACHER} from "./types"

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
        return axios.post('/update_teacher_info/basic', teacher)
    }
}
export function updateTeacherContact(teacher) {
    return dispatch => {
        return axios.post('/update_teacher_info/contact', teacher)
    }
}
export function clearTeacher(teacher) {
    return dispatch => {
        return axios.post('/update_teacher_info/clear', {teacher:teacher})
    }
}

export function addTeacher(teacher) {
    return {
        type: ADD_TEACHER,
        payload:teacher
    }
}
export function clearTeachers() {
    return {
        type: CLEAR_TEACHERS,
        payload:{}
    }
}
export function updateTeacherOnList(teacher) {
    return {
        type: UPDATE_TEACHER,
        payload:teacher
    }
}
export function updateTeacherList(teacher) {
    return {
        type: UPDATE_TEACHER,
        payload:teacher
    }
}
export function removeTeacher(teacher) {
    return {
        type: REMOVE_TEACHER,
        payload:teacher
    }
}
export function getTeachers() {
    return dispatch=>{
        return axios.get('/admin/teachers')
    }
}
export function getSchoolTeachers(upi) {
    return dispatch=>{
        return axios.post('/schools/teachers',{upi:upi})
    }
}
export function addResponsibility(responbsibility) {
    return dispatch=>{
        return axios.post('/update_teacher_info/responsibilities/add',responbsibility)
    }
}