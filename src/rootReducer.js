import {combineReducers} from 'redux'
import systemAdminLoginReducers from './reducers/systemAdminLoginReducers'
import schoolReducers from "./reducers/schoolReducers"
import teacherReducers from "./reducers/teacherReducers"
import studentReducers from "./reducers/studentReducers"
import schoolAdminReducers from "./reducers/schoolAdminReducers"
import schoolAdminLoginReducers from "./reducers/schoolAdminLoginReducers"
import responsibilityReducers from "./reducers/responsibilityReducers"
import schoolDetailsReducers from "./reducers/schoolDetailsReducers"
import knecAdminLoginReducers from "./reducers/knecAdminLoginReducers"
import certificateReducers from "./reducers/certificateReducers"


export default combineReducers({
    // flashMessages,
    systemAdminLoginReducers,
    schoolAdminLoginReducers,
    schoolReducers,
    teacherReducers,
    studentReducers,
    responsibilityReducers,
    schoolAdminReducers,
    schoolDetailsReducers,
    knecAdminLoginReducers,
    certificateReducers
})
