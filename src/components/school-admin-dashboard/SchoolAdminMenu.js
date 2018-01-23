import React from 'react'
import {Link} from 'react-router-dom'
import jwt from 'jsonwebtoken'

export default () => {
    const token = jwt.decode(localStorage.schoolAdminJwtToken)
    // const role=token.role
    return token ? <ul className="list-unstyled">
        <li><Link to="/school_admin/students">Students</Link></li>
        <li><Link to="/school_admin/teachers">Teachers</Link></li>
        <li><Link to="/school_admin/school">School Details</Link></li>
        <li><Link to="/school_admin/academics">Performance and Academics</Link></li>
        <li><Link to="/school_admin/gallery">Gallery</Link></li>
        <li><Link to="/school_admin/history">School History</Link></li>
    </ul> : ''
}
