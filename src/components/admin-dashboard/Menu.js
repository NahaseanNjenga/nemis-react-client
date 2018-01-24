import React from 'react'
import {Link} from 'react-router-dom'


export default () =>
    (
        <nav className="collapse bd-links" id="bd-docs-nav">
            <div className="bd-toc-item">
                <div className="bd-toc-item">
                    <Link to="/admin/students" className="bd-toc-link"><h5>Students</h5></Link>
                </div>
                <div className="bd-toc-item">
                    <Link to="/school_admin/teachers" className="bd-toc-link"><h5>Teachers</h5></Link>
                </div>
                <div className="bd-toc-item">
                    <Link to="/admin/schools" className="bd-toc-link"><h5>Schools</h5></Link>
                </div>
                <div className="bd-toc-item">
                    <Link to="/admin/school_admins" className="bd-toc-link"><h5>School Admins</h5></Link>
                </div>
                <div className="bd-toc-item">
                    <Link to="/admin/knec_admin" className="bd-toc-link"><h5>Knec Admin</h5></Link>
                </div>
            </div>
        </nav>)