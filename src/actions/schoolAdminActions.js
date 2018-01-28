import axios from 'axios'
import {ADD_SCHOOL_ADMIN, CLEAR_SCHOOL_ADMINS, UPDATE_SCHOOL_ADMIN} from "./types"


export function registerSchoolAdmin(schoolAdmin) {
    return dispatch => {
        return axios.post('/admin/register_school_admin', schoolAdmin)
    }
}

export function updateSchoolAdmin(schoolAdmin) {
    return dispatch => {
        return axios.post('/admin/update_school_admin', schoolAdmin)
    }
}

export function addSchoolAdmin(schoolAdmin) {
    return {
        type: ADD_SCHOOL_ADMIN,
        payload:schoolAdmin
    }
}
export function clearSchoolAdmins() {
    return {
        type:CLEAR_SCHOOL_ADMINS,
        payload:{}
    }
}
export function updateSchoolAdminList(schoolAdmin) {
    return {
        type: UPDATE_SCHOOL_ADMIN,
        payload:schoolAdmin
    }
}
export function getSchoolAdmins() {
    return dispatch=>{
        return axios.get('/admin/school_admins')
    }
}
export function isSchoolAdminExists(school_upi) {
    return dispatch=>{
        return axios.post('/school_admin/exists',{school_upi:school_upi})
    }
}