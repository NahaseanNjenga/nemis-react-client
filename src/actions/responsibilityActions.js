import axios from 'axios'
import {ADD_RESPONSIBILITY, CLEAR_RESPONSIBILITIES, REMOVE_RESPONSIBILITY, UPDATE_RESPONSIBILITY} from "./types"



export function registerResponsibility(responsibility) {
    return dispatch => {
        return axios.post('/teachers/responsibilities/add', responsibility)
    }
}

export function updateResponsibility(responsibility) {
    return dispatch => {
        return axios.post('/update_teacher_info/responsibilities/update', {responsibility:responsibility})
    }
}

export function addResponsibility(responsibility) {
    return {
        type: ADD_RESPONSIBILITY,
        payload:responsibility
    }
}
export function clearResponsibilities() {
    return {
        type: CLEAR_RESPONSIBILITIES,
        payload:[]
    }
}
export function updateResponsibilityOnList(responsibility) {
    return {
        type: UPDATE_RESPONSIBILITY,
        payload:responsibility
    }
}
export function removeResponsibility(responsibility) {
    return {
        type: REMOVE_RESPONSIBILITY,
        payload:responsibility
    }
}

export function getResponsibilities(teacher_id) {
    return dispatch=>{
        return axios.post('/teachers/responsibilities',{teacher_id:teacher_id})
    }
}
export function relieveResponsibility(responsibility) {
    return dispatch=>{
        return axios.post('/update_teacher_info/responsibilities/relieve',{responsibility:responsibility})
    }
}
export function getSchoolResponsibilities(upi) {
    return dispatch => {
        return axios.post('/schools/responsibilitys', {upi: upi})
    }
}
export function searchResponsibility(upi) {
    return dispatch => {
        return axios.post('/search', {upi: upi})
    }
}