import {ADD_PICTURE, CLEAR_PICTURES, DELETE_PICTURE} from "./types"
import axios from 'axios'

export function addPhoto(student) {
    return {
        type: ADD_PICTURE,
        payload: student
    }
}

export function removePhoto() {
    return {
        type: DELETE_PICTURE,
        payload: []
    }
}

export function clearGallery() {
    return {
        type: CLEAR_PICTURES,
        payload: []
    }
}

export function uploadPhoto(photo) {
    return dispatch => {
        return axios.post('/schools/gallery/add', photo)
    }
}

export function getGallery(school_upi) {
    return dispatch => {
        return axios.post('/schools/gallery', {school_upi:school_upi})
    }
}