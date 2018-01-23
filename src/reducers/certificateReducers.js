import {ADD_CERTIFICATE} from "../actions/types"

export default (state = [], action = {}) => {
    switch (action.type) {
        case ADD_CERTIFICATE:
            return [action.payload, ...state]
        default: return state
    }
}