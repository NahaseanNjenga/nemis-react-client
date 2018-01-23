import {ADD_CERTIFICATE,CLEAR_CERTIFICATES} from "../actions/types"

export default (state = [], action = {}) => {
    switch (action.type) {
        case ADD_CERTIFICATE:
            return [action.payload, ...state]
        case CLEAR_CERTIFICATES:
            return []
        default: return state
    }
}