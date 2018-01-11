import {combineReducers} from 'redux'
import systemAdminLoginReducers from './reducers/systemAdminLoginReducers'
import schoolReducers from "./reducers/schoolReducers"
import teacherReducers from "./reducers/teacherReducers"
import studentReducers from "./reducers/studentReducers"
import schoolAdminReducers from "./reducers/schoolAdminReducers"
import schoolAdminLoginReducers from "./reducers/schoolAdminLoginReducers"


export default combineReducers({
    // flashMessages,
    systemAdminLoginReducers,
    schoolAdminLoginReducers,
    schoolReducers,
    teacherReducers,
    studentReducers,
    schoolAdminReducers,
})
