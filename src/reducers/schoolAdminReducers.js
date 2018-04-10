import {ADD_SCHOOL_ADMIN, CLEAR_SCHOOL_ADMINS, UPDATE_SCHOOL_ADMIN} from "../actions/types"

export default (state = [], action = {}) => {
    switch (action.type) {
        case ADD_SCHOOL_ADMIN:
            return [action.payload, ...state]
        case CLEAR_SCHOOL_ADMINS:
            return []
        case UPDATE_SCHOOL_ADMIN:
            return state.map(school=>{
                if(school._id===action.payload._id){
                    return action.payload
                }
                return school
            })
        default: return state
    }
}