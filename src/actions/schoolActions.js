import axios from 'axios'
import {ADD_SCHOOL, CLEAR_SCHOOLS, UPDATE_SCHOOL} from "./types"

export function isSchoolExists(name) {
    return dispatch => {
        return axios.post('/schools', {name: name})
    }
}

export function registerSchool(school) {
    return dispatch => {
        return axios.post('/register_school', school)
    }
}

export function updateSchool(school) {
    return dispatch => {
        return axios.post('/update_school_info', school)
    }
}

export function addSchool(school) {
    return {
        type: ADD_SCHOOL,
        payload:school
    }
}
export function clearSchools() {
    return {
        type: CLEAR_SCHOOLS,
        payload:{}
    }
}

export function updateSchoolList(school) {
    return {
        type: UPDATE_SCHOOL,
        payload:school
    }
}
export function getSchools() {
    return dispatch=>{
        return axios.get('/admin/schools')
    }
}
export function getSchoolDetails(upi) {
    return dispatch=>{
        return axios.post('/school_info',{upi:upi})
    }
}