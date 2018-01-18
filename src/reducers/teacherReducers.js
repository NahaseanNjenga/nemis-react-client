import {ADD_TEACHER, CLEAR_TEACHERS, REMOVE_TEACHER, UPDATE_TEACHER} from "../actions/types"
import findIndex from "lodash/findIndex"
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
        case REMOVE_TEACHER:
            const index = findIndex(state, {_id: action.payload._id})
            if (index => 0) {
                return [...state.slice(0, index), ...state.slice(index + 1)]
            }
            return state
        default:
            return state
    }
}