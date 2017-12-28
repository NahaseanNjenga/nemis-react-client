import React from 'react'
import Menu from "../Menu"

class Teachers extends React.Component{
    render(){
        return(<div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <Menu/>
                </div>
                <div className="col-md-9"><h3>Admin Dashboard.</h3><h5>List of Teachers</h5>
                </div>
            </div>
        </div>)
    }
}
export default Teachers
