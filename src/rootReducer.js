import {combineReducers} from 'redux'
import loginReducers from './reducers/loginReducers'
import schoolReducers from "./reducers/schoolReducers"
import teacherReducers from "./reducers/teacherReducers"
import studentReducers from "./reducers/studentReducers"
import schoolAdminReducers from "./reducers/schoolAdminReducers"


export default combineReducers({
    // flashMessages,
    loginReducers,
    schoolReducers,
    teacherReducers,
    studentReducers,
    schoolAdminReducers,
})
