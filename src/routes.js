import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import HomePage from "./components/HomePage"
import App from "./components/App"
import requireSystemAdminAuth from "./utils/requireSystemAdminAuth"
import SystemAdminDashboard from "./components/admin-dashboard/SystemAdminDashboard"
import SystemAdminLoginForm from "./components/admin-dashboard/SystemAdminLoginForm"
import SchoolList from "./components/schools/SchoolList"
import TeachersPage from "./components/teachers/TeachersPage"
import StudentsList from "./components/students/StudentsList"
import SchoolAdminList from "./components/schoolAdmins/SchoolAdminList"
import SchoolAdminDashboard from "./components/school-admin-dashboard/SchoolAdminDashboard"
import requireSchoolAdminAuth from "./utils/requireSchoolAdminAuth"
import SchoolAdminLoginForm from "./components/school-admin-dashboard/SchoolAdminLoginForm"

import SchoolDetails from "./components/school-admin-dashboard/SchoolDetails"


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
                    <Route path='/school_admin/login' component={SchoolAdminLoginForm}/>
                    <Route path="/school_admin/students" component={requireSchoolAdminAuth(StudentsList)}/>
                    <Route path="/school_admin/teachers" component={requireSchoolAdminAuth(TeachersPage)}/>
                    <Route path="/school_admin/school" component={requireSchoolAdminAuth(SchoolDetails)}/>
                </Switch>
            </App>
        </BrowserRouter>
    )
}