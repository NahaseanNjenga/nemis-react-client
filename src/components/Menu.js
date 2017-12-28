import React from 'react'
import {Link} from 'react-router-dom'


export default () =>
    (<ul className="list-unstyled">
        <li><Link to="/admin/students">Students</Link></li>
        <li><Link to="/admin/teachers">Teachers</Link></li>
        <li><Link to="/admin/schools">Schools</Link></li>
        <li><Link to="/admin/school_admins">School Admins</Link></li>
        <li><Link to="/admin/knec_admins">Knec Admin</Link></li>
    </ul>)