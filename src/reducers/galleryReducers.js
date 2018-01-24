import {ADD_PICTURE, CLEAR_PICTURES, DELETE_PICTURE} from "../actions/types"
import findIndex from "lodash/findIndex"
export default (state = [], action = {}) => {
    switch (action.type) {
        case ADD_PICTURE:
            return [action.payload, ...state]
        case CLEAR_PICTURES:
            return []
        case DELETE_PICTURE:
            const index = findIndex(state, {_id: action.payload._id})
            if (index => 0) {
                return [...state.slice(0, index), ...state.slice(index + 1)]
            }
            return state
        default: return state
    }
}