import React from 'react'
import Menu from "../admin-dashboard/Menu"
import SchoolAdminMenu from "./SchoolAdminMenu"
import jwt from "jsonwebtoken"

class SchoolAdminDashboard extends React.Component {

render(){
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <SchoolAdminMenu/>
                </div>
                <div className="col-md-9"><h3>School Admin Dashboard.</h3><h5>Use the links of the left to access various
                    stakeholders</h5>
                </div>
            </div>
        </div>
    )
}

}

export default SchoolAdminDashboard