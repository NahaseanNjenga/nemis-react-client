import axios from 'axios'
import {ADD_CERTIFICATE, CLEAR_CERTIFICATES} from "./types"


export function addCertificate(certificate) {
    return {
        type: ADD_CERTIFICATE,
        payload:certificate
    }
}
export function clearCertificates() {
    return {
        type: CLEAR_CERTIFICATES,
        payload:[]
    }
}

export function getCertificates(student_id) {
    return dispatch=>{
        return axios.post('/students/certificates',{student_id:student_id})
    }
}