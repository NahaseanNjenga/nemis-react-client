import {
    ADD_RESPONSIBILITY, CLEAR_RESPONSIBILITIES, REMOVE_RESPONSIBILITY,
    UPDATE_RESPONSIBILITY
} from "../actions/types"
import findIndex from "lodash/findIndex"

export default (state = [], action = {}) => {
    switch (action.type) {
        case ADD_RESPONSIBILITY:
            return [action.payload, ...state]
        case CLEAR_RESPONSIBILITIES:
            return []
        case UPDATE_RESPONSIBILITY:
            return state.map(responsibility => {
                if (responsibility._id === action.payload._id) {
                    return action.payload
                }
                return responsibility
            })
        case REMOVE_RESPONSIBILITY:
            const index = findIndex(state, {_id: action.payload._id})
            if (index => 0) {
                return [...state.slice(0, index), ...state.slice(index + 1)]
            }
            return state

        default:
            return state
    }
}