import {ADD_SCHOOL, CLEAR_SCHOOLS, DELETE_SCHOOL, UPDATE_SCHOOL} from "../actions/types"

export default (state = [], action = {}) => {
    switch (action.type) {
        case ADD_SCHOOL:
            return [action.payload, ...state]
        case UPDATE_SCHOOL:
            return state.map(school=>{
                if(school._id===action.payload._id){
                    return action.payload
                }
                return school
            })
        default: return state
    }
}