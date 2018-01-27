"use strict"
import axios from 'axios'


export function registerDeceased(deceased) {
    return dispatch => {
        return axios.post('/deceased/register_deceased', deceased)
    }
}
