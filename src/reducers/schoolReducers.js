import {ADD_SCHOOL, CLEAR_SCHOOLS, DELETE_SCHOOL, UPDATE_SCHOOL} from "../actions/types"

export default (state = [], action = {}) => {
    switch (action.type) {
        case ADD_SCHOOL:
            return [action.payload, ...state]
        default: return state
    }
}