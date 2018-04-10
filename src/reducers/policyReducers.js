import {ADD_POLICY, CLEAR_POLICIES, DELETE_POLICY, UPDATE_POLICY} from "../actions/types"
import findIndex from "lodash/findIndex"
export default (state = [], action = {}) => {
    switch (action.type) {
        case ADD_POLICY:
            return [action.payload, ...state]
        case CLEAR_POLICIES:
            return []
        case UPDATE_POLICY:
            return state.map(policy => {
                if (policy._id === action.payload._id) {
                    return action.payload
                }
                return policy
            })
        case DELETE_POLICY:
            const index = findIndex(state, {_id: action.payload._id})
            if (index => 0) {
                return [...state.slice(0, index), ...state.slice(index + 1)]
            }
            return state
        default:
            return state
    }
}