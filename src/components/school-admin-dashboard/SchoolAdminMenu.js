import React from 'react'
import {Link} from 'react-router-dom'

export default () =>
    (<ul className="list-unstyled">
        <li><Link to="/school_admin/students">Students</Link></li>
        <li><Link to="/school_admin/teachers">Teachers</Link></li>
        <li><Link to="/school_admin/school">School Details</Link></li>
    </ul>)