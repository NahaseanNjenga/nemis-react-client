import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {logout} from '../actions/loginActions'
import jwt from "jsonwebtoken"
import SelectLoginModal from "../modals/SelectLoginModal"
import SchoolAdminLogin from "../modals/SchoolAdminLogin"

class NavigationBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectLoginModal: false,
            schoolAdminLoginModal: false,
            knecAdminLoginModal: false
        }
        this.logout = this.logout.bind(this)
        this.onSchoolAdmin = this.onSchoolAdmin.bind(this)
        this.onKnecAdmin = this.onKnecAdmin.bind(this)
        this.onCloseSchoolAdmin = this.onCloseSchoolAdmin.bind(this)
        this.onCloseKnecAdmin = this.onCloseKnecAdmin.bind(this)
        this.onSignin = this.onSignin.bind(this)
        this.onSignin = this.onSignin.bind(this)
        this.onCloseSignin = this.onCloseSignin.bind(this)
    }

    logout(e) {
        e.preventDefault()
        this.props.logout()
        this.context.router.history.push('/')
    }

    onKnecAdmin(e) {
        e.preventDefault()
        this.setState({selectLoginModal: false})
        this.setState({knecAdminLoginModal: true})
    }

    onCloseKnecAdmin() {
        this.setState({knecAdminLoginModal: false})
    }

    onSchoolAdmin(e) {
        e.preventDefault()
        this.setState({selectLoginModal: false})
        this.setState({schoolAdminLoginModal: true})
    }

    onCloseSchoolAdmin() {
        this.setState({schoolAdminLoginModal: false})
    }

    onSignin(e) {
        e.preventDefault()
        this.setState({selectLoginModal: true})
    }

    onCloseSignin() {

        this.setState({selectLoginModal: false})
    }


    render() {
        const {selectLoginModal, schoolAdminLoginModal, knecAdminLoginModal} = this.state
        const {isAuthenticated} = this.props.loginReducers
        console.log(isAuthenticated)
        const token = jwt.decode(localStorage.systemAdminJwtToken)
        const userLinks = (<ul className="nav navbar-nav navbar-right">
            <li><a href="/logout" onClick={this.logout}>Logout</a></li>
            {token && <Link to="/profile">School name</Link>}
        </ul>)
        // console.log(window.location.p)

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
                        {isAuthenticated ? userLinks :window.location.pathname==='/admin'||window.location.pathname==='/admin/login'?'': guestLinks}
                    </div>
                </div>
                <SelectLoginModal show={selectLoginModal} onClose={this.onCloseSignin} onSchoolAdmin={this.onSchoolAdmin} onKnecAdmin={this.onKnecAdmin}/>
                <SchoolAdminLogin show={schoolAdminLoginModal} onClose={this.onCloseSchoolAdmin}/>

            </nav>
        )
    }
}

NavigationBar.propTypes = {
    loginReducers: PropTypes.object.isRequired,
    // logout: PropTypes.func.isRequired
}
NavigationBar.contextTypes = {
    router: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        loginReducers: state.loginReducers
    }
}

export default connect(mapStateToProps, {logout})(NavigationBar)
