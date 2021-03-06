import axios from 'axios'
import {ADD_SCHOOL, CLEAR_SCHOOLS, DISPLAY_SCHOOL_DETAILS, UPDATE_SCHOOL, UPDATE_SCHOOL_DETAILS} from "./types"

export function isSchoolExists(name) {
    return dispatch => {
        return axios.post('/schools', {name: name})
    }
}
export function isSchoolUPIExists(upi) {
    return dispatch => {
        return axios.post('/schools/upi', {upi: upi})
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

export function updateSchoolBasicInfo(school) {
    return dispatch => {
        return axios.post('/update_school_info/basic', school)
    }
}
export function updateSchoolInfrastructureInfo(school) {
    return dispatch => {
        return axios.post('/update_school_info/infrastructure', school)
    }
}
export function updateSchoolAssetsInfo(school) {
    return dispatch => {
        return axios.post('/update_school_info/assets', school)
    }
}
export function updateSchoolContactInfo(school) {
    return dispatch => {
        return axios.post('/update_school_info/contact', school)
    }
}
export function updateSchoolLearningMaterialsInfo(school) {
    return dispatch => {
        return axios.post('/update_school_info/learning_materials', school)
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
export function updateSchoolInfo(school) {
    return {
        type: UPDATE_SCHOOL_DETAILS,
        payload:school
    }
}
export function displaySchoolInfo(school) {
    return {
        type: DISPLAY_SCHOOL_DETAILS,
        payload:school
    }
}
export function getSchools() {
    return dispatch=>{
        return axios.get('/schools')
    }
}
export function getSchoolDetails(upi) {
    return dispatch=>{
        return axios.post('/school_info',{upi:upi})
    }
}
export function getSchoolCategory(upi) {
    return dispatch=>{
        return axios.post('/schools/category',{upi:upi})
    }
}
export function getSchoolHistory(upi) {
    return dispatch=>{
        return axios.post('/schools/history',{upi:upi})
    }
}
export function addSchoolHistory(history) {
    return dispatch=>{
        return axios.post('/schools/history/add',history)
    }
}

export function updateSchoolHistory(history) {
    return dispatch=>{
        return axios.post('/schools/history/update',history)
    }
}
export function getS(history) {
    return dispatch=>{
        return axios.post('/schools/history/update',history)
    }
}

export function searchSchoolUpi(upi) {
    return dispatch => {
        return axios.post('/search/schools/upi', {upi: upi})
    }
}
export function searchSchoolName(name) {
    return dispatch => {
        return axios.post('/search/schools/name', {name: name})
    }
}
export function searchSchoolCounty(county) {
    return dispatch => {
        return axios.post('/search/schools/county', {county: county})
    }
}