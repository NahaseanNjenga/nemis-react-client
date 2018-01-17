import {DISPLAY_SCHOOL_DETAILS, CLEAR_SCHOOL_DETAILS, UPDATE_SCHOOL_DETAILS} from "../actions/types"

export default (state = {}, action = {}) => {

    switch (action.type) {
        case DISPLAY_SCHOOL_DETAILS:
            return action.payload
        case CLEAR_SCHOOL_DETAILS:
            return []
        case UPDATE_SCHOOL_DETAILS:
            state=action.payload
            return state
        default: return state
    }
}