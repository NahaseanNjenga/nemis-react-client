import axios from 'axios'
import {ADD_KNEC_ADMIN, UPDATE_KNEC_ADMIN} from "./types"

export function registerKnecAdmin(knec_admin) {
    return dispatch => {
        return axios.post('/admin/knec_admin/register', knec_admin)
    }
}

export function updateKnecAdmin(knec_admin) {
    return dispatch => {
        return axios.post('/admin/knec_admin/update', knec_admin)
    }
}

export function addKnecAdmin(knec_admin) {
    return {
        type: ADD_KNEC_ADMIN,
        payload:knec_admin
    }
}
export function updateKnecAdminList(knec_admin) {
    return {
        type: UPDATE_KNEC_ADMIN,
        payload:knec_admin
    }
}
export function getKnecAdmin() {
    return dispatch=>{
        return axios.get('/admin/knec_admin')
    }
}
