import React from 'react'
import SchoolAdminMenu from "./SchoolAdminMenu"

class Gallery extends React.Component{
    render(){
        return (  <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <SchoolAdminMenu/>
                </div>
                <div className="col-md-9">
                    <br/>
                    <h1>Luku but you don't touch</h1>
                </div>
            </div>
        </div>)
    }
}
export default Gallery