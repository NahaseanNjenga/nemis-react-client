import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {schoolAdminLogout, systemAdminLogout} from '../actions/loginActions'
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
        this.context.router.history.push('/')
    }

    onKnecAdmin(e) {
        e.preventDefault()
        this.setState({selectLoginModal: false})
        // this.setState({knecAdminLoginModal: true})
        this.context.router.history.push('/knec_admin/login')

    }

    // onCloseKnecAdmin() {
    //     this.setState({knecAdminLoginModal: false})
    // }

    onSchoolAdmin(e) {
        e.preventDefault()
        this.setState({selectLoginModal: false})
        // this.setState({schoolAdminLoginModal: true})
        this.context.router.history.push('/school_admin/login')
    }

    // onCloseSchoolAdmin() {
    //     this.setState({schoolAdminLoginModal: false})
    // }

    onSignin(e) {
        e.preventDefault()
        this.setState({selectLoginModal: true})
    }

    onCloseSignin() {

        this.setState({selectLoginModal: false})
    }


    render() {
        const {selectLoginModal, } = this.state
        const {isAuthenticated} = this.props.systemAdminLoginReducers
        const {isSchoolAdminAuthenticated} = this.props.schoolAdminLoginReducers
        // console.log(isAuthenticated, isSchoolAdminAuthenticated)
        const token = jwt.decode(localStorage.schoolAdminJwtToken)
        const userLinks = (<ul className="nav navbar-nav navbar-right">
            <li><a href="/logout" onClick={this.logout}>Logout</a></li>
            <li>{token && isSchoolAdminAuthenticated? <Link to="/school_admin">&nbsp; {token.username}</Link>:''}</li>
        </ul>)
        const guestLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li><a href="" onClick={this.onSignin}>Sign in</a></li>
            </ul>)
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-info">
                <div className="">
                    <div className="navbar-headers">
                        <Link to="/" className="navbar-brand">Nemis</Link>
                    </div>
                    <div className="collapse navbar-collapse my-2 my-lg-0">
                        {isAuthenticated || isSchoolAdminAuthenticated ? userLinks : window.location.pathname === '/admin' || window.location.pathname === '/admin/login' ? '' : guestLinks}
                    </div>
                </div>
                <SelectLoginModal show={selectLoginModal} onClose={this.onCloseSignin}
                                  onSchoolAdmin={this.onSchoolAdmin} onKnecAdmin={this.onKnecAdmin}/>
                {/*<SchoolAdminLogin show={schoolAdminLoginModal} onClose={this.onCloseSchoolAdmin}/>*/}

            </nav>
        )
    }
}

NavigationBar.propTypes = {
    systemAdminLoginReducers: PropTypes.object.isRequired,
    schoolAdminLoginReducers: PropTypes.object.isRequired,
    schoolAdminLogout: PropTypes.func.isRequired,
    systemAdminLogout: PropTypes.func.isRequired
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

export default connect(mapStateToProps, {systemAdminLogout, schoolAdminLogout})(NavigationBar)
