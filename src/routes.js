import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import HomePage from "./components/HomePage"
import App from "./components/App"
import requireAuth from "./utils/requireAuth"
import SystemAdminDashboard from "./components/admin-dashboard/SystemAdminDashboard"
import SystemAdminLoginForm from "./components/admin-dashboard/SystemAdminLoginForm"
import SchoolList from "./components/schools/SchoolList"
import TeachersList from "./components/teachers/TeachersList"
import StudentsList from "./components/students/StudentsList"


export default () => {
    return (<BrowserRouter>
                <App>
                    <Switch>
                        <Route exact path="/" component={HomePage}/>
                        <Route exact path="/admin" component={requireAuth(SystemAdminDashboard)}/>
                        <Route path='/admin/login' component={SystemAdminLoginForm}/>
                        <Route path='/admin/schools' component={SchoolList}/>
                        <Route path='/admin/students' component={StudentsList}/>
                        <Route path='/admin/teachers' component={TeachersList}/>
                    </Switch>
                </App>
        </BrowserRouter>
    )
}