import {ADD_STUDENT, CLEAR_STUDENTS, DELETE_STUDENT, UPDATE_STUDENT} from "../actions/types"

export default (state = [], action = {}) => {
    switch (action.type) {
        case ADD_STUDENT:
            return [action.payload, ...state]
        case UPDATE_STUDENT:
            return state.map(teacher=>{
                if(teacher._id===action.payload._id){
                    return action.payload
                }
                return teacher
            })
        default: return state
    }
}