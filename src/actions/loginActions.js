import axios from 'axios'
import {setSystemAdminAuthorizationToken,setSchoolAdminAuthorizationToken} from '../utils/setAuthorizationToken'
import jwt from 'jsonwebtoken'
import {SET_CURRENT_USER} from "./types"
export function systemAdminlogin(userData) {
    return dispatch=>{
        return axios.post('/admin_login',userData).then(res=>{
            const token=res.data.token
            localStorage.setItem('systemAdminJwtToken',token)
            setSystemAdminAuthorizationToken(token)
            dispatch(setCurrentUser(jwt.decode(token)))
        })
    }
}
export function schoolAdminlogin(userData) {
    return dispatch=>{
        return axios.post('/school_admin_login',userData).then(res=>{
            const token=res.data.token
            localStorage.setItem('schoolAdminJwtToken',token)
            setSchoolAdminAuthorizationToken(token)
            dispatch(setCurrentUser(jwt.decode(token)))
        })
    }
}

export function setCurrentUser(user) {
    return{
        type:SET_CURRENT_USER,
        user
    }
}

export function systemAdminLogout() {
    return dispatch=>{
        localStorage.removeItem('systemAdminJwtToken')
        setSystemAdminAuthorizationToken(false)
        dispatch(setCurrentUser({}))
    }
}

export function schoolAdminLogout() {
    return dispatch=>{
        localStorage.removeItem('schoolAdminJwtToken')
        setSchoolAdminAuthorizationToken(false)
        dispatch(setCurrentUser({}))
    }
}