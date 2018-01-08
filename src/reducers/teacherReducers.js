import {ADD_TEACHER, CLEAR_TEACHERS, DELETE_TEACHER, UPDATE_TEACHER} from "../actions/types"

export default (state = [], action = {}) => {
    switch (action.type) {
        case ADD_TEACHER:
            return [action.payload, ...state]
        case CLEAR_TEACHERS:
            return []
        case UPDATE_TEACHER:
            return state.map(teacher => {
                if (teacher._id === action.payload._id) {
                    return action.payload
                }
                return teacher
            })
        default:
            return state
    }
}