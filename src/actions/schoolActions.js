import axios from 'axios'
import {ADD_SCHOOL} from "./types"

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

export function addSchool(school) {
    return {
        type: ADD_SCHOOL,
        payload:school
    }
}
export function getSchools() {
    return dispatch=>{
        return axios.get('/admin/schools')
    }
}