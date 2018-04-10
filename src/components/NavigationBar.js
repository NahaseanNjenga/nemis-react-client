import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {knecAdminLogout, schoolAdminLogout, systemAdminLogout} from '../actions/loginActions'
import jwt from "jsonwebtoken"
import SelectLoginModal from "../modals/SelectLoginModal"
import SchoolAdminLogin from "./school-admin-dashboard/SchoolAdminLoginForm"

class NavigationBar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectLoginModal: false,
            // schoolAdminLoginModal: false,
            // knecAdminLoginModal: false
        }

        this.logout = this.logout.bind(this)
        this.onSchoolAdmin = this.onSchoolAdmin.bind(this)
        this.onKnecAdmin = this.onKnecAdmin.bind(this)
        // this.onCloseSchoolAdmin = this.onCloseSchoolAdmin.bind(this)
        // this.onCloseKnecAdmin = this.onCloseKnecAdmin.bind(this)
        this.onSignin = this.onSignin.bind(this)
        this.onSignin = this.onSignin.bind(this)
        this.onCloseSignin = this.onCloseSignin.bind(this)
    }

    logout(e) {
        e.preventDefault()
        this.props.systemAdminLogout()
        this.props.schoolAdminLogout()
        this.props.knecAdminLogout()
        this.context.router.history.push('/')
    }

    onKnecAdmin(e) {
        e.preventDefault()
        this.setState({selectLoginModal: false})
        // this.setState({knecAdminLoginModal: true})
        this.context.router.history.push('/knec_admin/login')

    }

    onSchoolAdmin(e) {
        e.preventDefault()
        this.setState({selectLoginModal: false})
        // this.setState({schoolAdminLoginModal: true})
        this.context.router.history.push('/school_admin/login')
    }

    onSignin(e) {
        e.preventDefault()
        this.setState({selectLoginModal: true})
    }

    onCloseSignin() {

        this.setState({selectLoginModal: false})
    }


    render() {
        let user = 'none'
        if (jwt.decode(localStorage.schoolAdminJwtToken))
            user = 'school'
        else if (jwt.decode(localStorage.knecAdminJwtToken))
            user = 'knec'
        else if (jwt.decode(localStorage.systemAdminJwtToken))
            user = 'system'

        const {selectLoginModal,} = this.state
        const {isAuthenticated} = this.props.systemAdminLoginReducers
        const {isSchoolAdminAuthenticated} = this.props.schoolAdminLoginReducers
        const token = jwt.decode(localStorage.schoolAdminJwtToken)
        const systemToken = jwt.decode(localStorage.systemAdminJwtToken)
        const userLinks = (<ul className="nav navbar-nav  navbar-right">
            <li>{token && isSchoolAdminAuthenticated ?
                <Link to="/school_admin" className="h5"> Dashboard &nbsp;</Link> : ''}</li>
            <li>{systemToken && isAuthenticated ?
                <Link to="/admin" className="h5"> Dashboard &nbsp;</Link> : ''}</li>
            <li><a href="/logout" type="button" onClick={this.logout} className="white-link btn btn-dark">Logout</a>
            </li>
        </ul>)
        const guestLinks = (
            <ul className="navbar-nav  ml-md-auto d-none d-md-flex">
                <li><a href="" type="button" className="white-link btn btn-warning" onClick={this.onSignin}>Sign in</a>
                </li>
            </ul>)
        return (
                <div className="container nemis"><div className="row">
                <nav className="navbar navbar-expand-lg navbar-info bg-info fixed-top">

                    <Link to="/" className="h3 nemiss">Nemis</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="navbar-nav mr-auto">
                        {user !=='system'? <Link to="/policies" className="policy">Policy Documents</Link> : ''}
                    </div>
                    <div className="my-2 my-lg-0">
                        <div className=" mr-sm-2 my-2 my-sm-0">
                            {isAuthenticated || isSchoolAdminAuthenticated ? userLinks : window.location.pathname === '/admin' || window.location.pathname === '/admin/login' ? '' : guestLinks}
                        </div>
                    </div>
                    <SelectLoginModal show={selectLoginModal} onClose={this.onCloseSignin}
                                      onSchoolAdmin={this.onSchoolAdmin} onKnecAdmin={this.onKnecAdmin}/>
                    {/*<SchoolAdminLogin show={schoolAdminLoginModal} onClose={this.onCloseSchoolAdmin}/>*/}

                </nav>
                </div></div>
        )
    }
}

NavigationBar.propTypes = {
    systemAdminLoginReducers: PropTypes.object.isRequired,
    schoolAdminLoginReducers: PropTypes.object.isRequired,
    schoolAdminLogout: PropTypes.func.isRequired,
    systemAdminLogout: PropTypes.func.isRequired,
    knecAdminLogout: PropTypes.func.isRequired
}
NavigationBar.contextTypes = {
    router: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        systemAdminLoginReducers: state.systemAdminLoginReducers,
        schoolAdminLoginReducers: state.schoolAdminLoginReducers
    }
}

export default connect(mapStateToProps, {knecAdminLogout, systemAdminLogout, schoolAdminLogout})(NavigationBar)
