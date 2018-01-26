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
export function retireTeacher(teacher) {
    return dispatch => {
        return axios.post('/update_teacher_info/retire', teacher)
    }
}
export function deceaseTeacher(teacher) {
    return dispatch => {
        return axios.post('/update_teacher_info/deceased', teacher)
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
export function getRetiredTeachers() {
    return dispatch=>{
        return axios.get('/admin/teachers/retired')
    }
}
export function getDeceasedTeachers() {
    return dispatch=>{
        return axios.get('/admin/teachers/deceased')
    }
}
export function getSchoolTeachers(upi) {
    return dispatch=>{
        return axios.post('/schools/teachers',{upi:upi})
    }
}
export function getRetiredSchoolTeachers(upi) {
    return dispatch=>{
        return axios.post('/schools/teachers/retired',{upi:upi})
    }
}
export function getDeceasedSchoolTeachers(upi) {
    return dispatch=>{
        return axios.post('/schools/teachers/deceased',{upi:upi})
    }
}
export function getTransferredSchoolTeachers(upi) {
    return dispatch=>{
        return axios.post('/schools/teachers/transferred',{upi:upi})
    }
}

export function addResponsibility(responbsibility) {
    return dispatch=>{
        return axios.post('/update_teacher_info/responsibilities/add',responbsibility)
    }
}
export function searchTeacherTsc(tsc_number) {
    return dispatch => {
        return axios.post('/search/teachers/tsc', {tsc_number: tsc_number})
    }
}
export function searchTeacherName(name) {
    return dispatch => {
        return axios.post('/search/teachers/name', {name: name})
    }
}
export function uploadProfilePicture(picture) {
    return dispatch=>{
        return axios.post('/update_teacher_info/picture/add',picture)
    }
}