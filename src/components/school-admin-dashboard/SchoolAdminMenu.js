import React from 'react'
import {Link} from 'react-router-dom'
import jwt from 'jsonwebtoken'

export default () => {
    const token = jwt.decode(localStorage.schoolAdminJwtToken)
    // const role=token.role
    return token ?
        <nav className="collapse bd-links" id="bd-docs-nav">
            <div className="bd-toc-item">
                <div className="bd-toc-item">
                    <Link to="/school_admin/students" className="bd-toc-link"><h5>Students</h5></Link>
                </div>
                <div className="bd-toc-item">
                    <Link to="/school_admin/teachers" className="bd-toc-link"><h5>Teachers</h5></Link>
                </div>
                <div className="bd-toc-item">
                    <Link to="/school_admin/school" className="bd-toc-link"><h5>School Details</h5></Link>
                </div>
                <div className="bd-toc-item">
                    <Link to="/school_admin/gallery" className="bd-toc-link"><h5>Gallery</h5></Link>
                </div>
                <div className="bd-toc-item">
                    <Link to="/school_admin/history" className="bd-toc-link"><h5>School History</h5></Link>
                </div>
                {/*<div className="bd-toc-item">*/}

                {/*<li><Link to="/school_admin/academics" className="bd-toc-link">Performance and Academics</Link></li>*/}

                {/*</div>*/}
            </div>
        </nav>
        :
        ''
}
