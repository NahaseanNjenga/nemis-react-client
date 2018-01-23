import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import HomePage from "./components/admin-dashboard/HomePage"
import App from "./components/admin-dashboard/App"
import requireSystemAdminAuth from "./utils/requireSystemAdminAuth"
import SystemAdminDashboard from "./components/admin-dashboard/SystemAdminDashboard"
import SystemAdminLoginForm from "./components/admin-dashboard/SystemAdminLoginForm"
import SchoolList from "./components/admin-dashboard/schools/SchoolList"
import TeachersPage from "./components/teachers/TeachersPage"
import StudentsList from "./components/students/StudentsList"
import SchoolAdminList from "./components/admin-dashboard/schoolAdmins/SchoolAdminList"
import SchoolAdminDashboard from "./components/school-admin-dashboard/SchoolAdminDashboard"
import requireSchoolAdminAuth from "./utils/requireSchoolAdminAuth"
import SchoolAdminLoginForm from "./components/school-admin-dashboard/SchoolAdminLoginForm"

import SchoolDetails from "./components/school-admin-dashboard/SchoolDetails"
import requireKnecAdminAuth from "./utils/requireKnecAdminAuth"
import KnecAdminDashboard from "./components/knec-admin-dashboard/KnecAdminDashboard"
import Login from "./components/knec-admin-dashboard/KnecAdminLogin"
import KnecAdmin from "./components/admin-dashboard/knecAdmin/KnecAdmin"


export default () => {
    return (<BrowserRouter>
            <App>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/admin" component={requireSystemAdminAuth(SystemAdminDashboard)}/>
                    <Route exact path="/school_admin" component={requireSchoolAdminAuth(SchoolAdminDashboard)}/>
                    <Route path='/admin/login' component={SystemAdminLoginForm}/>
                    <Route path='/admin/schools' component={requireSystemAdminAuth(SchoolList)}/>
                    <Route path='/admin/students' component={requireSystemAdminAuth(StudentsList)}/>
                    <Route path='/admin/teachers' component={requireSystemAdminAuth(TeachersPage)}/>
                    <Route path='/admin/school_admins' component={requireSystemAdminAuth(SchoolAdminList)}/>
                    <Route path='/admin/knec_admin' component={requireSystemAdminAuth(KnecAdmin)}/>
                    <Route path='/school_admin/login' component={SchoolAdminLoginForm}/>
                    <Route path="/school_admin/students" component={requireSchoolAdminAuth(StudentsList)}/>
                    <Route path="/school_admin/teachers" component={requireSchoolAdminAuth(TeachersPage)}/>
                    <Route path="/school_admin/school" component={requireSchoolAdminAuth(SchoolDetails)}/>
                    <Route path="/school_admin/school" component={requireSchoolAdminAuth(SchoolDetails)}/>
                    <Route path="/knec_admin/:upi" component={requireKnecAdminAuth(StudentsList)}/>
                    <Route path="/knec_admin/login" component={Login}/>
                    <Route path="/knec_admin/" component={requireKnecAdminAuth(KnecAdminDashboard)}/>


                </Switch>
            </App>
        </BrowserRouter>
    )
}