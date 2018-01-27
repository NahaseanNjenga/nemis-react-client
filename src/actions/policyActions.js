
import axios from 'axios'

export function getPolicies() {
    return dispatch=>{
        return axios.get('/policies')
    }
}
export function uploadPolicy(policy) {
    return dispatch=>{
        return axios.post('/admin/policies/add',policy)
    }
}
export function updatePolicyOnDB(policy) {
    return dispatch=>{
        return axios.post('/admin/policies/update',policy)
    }
}
export function publishPolicy(policy) {
    return dispatch=>{
        return axios.post('/admin/policies/publish',policy)
    }
}
export function unpublishPolicy(policy) {
    return dispatch=>{
        return axios.post('/admin/policies/unpublish',policy)
    }
}
export function deletePolicy(policy) {
    return dispatch=>{
        return axios.post('/admin/policies/delete',policy)
    }
}