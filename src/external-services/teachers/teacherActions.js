import axios from 'axios'


export function registerTeacher(teacher) {
    return dispatch => {
        return axios.post('/tsc/register_teacher', teacher)
    }
}
