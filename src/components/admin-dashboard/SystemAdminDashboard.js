import React from 'react'

class SystemAdminDashboard extends React.Component{
    render(){
        return(<div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <ul className="list-unstyled">
                        <li><a href="">Students</a></li>
                        <li><a href="">Teachers</a></li>
                        <li><a href="">Schools</a></li>
                        <li><a href="">School Admins</a></li>
                        <li><a href="">Knec Admin</a></li>
                    </ul>
                </div>
                <div className="col-md-9"><h3>Admin Dashboard.</h3><h5>Use the links of the left to access various stakeholders</h5>
                    {}
                </div>
            </div>
        </div>)
    }
}

export default SystemAdminDashboard