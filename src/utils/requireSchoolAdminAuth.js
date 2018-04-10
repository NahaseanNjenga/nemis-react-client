import React from 'react'
import PropTypes from 'prop-types'
import {addFlashMessage} from "../actions/flashMessages"
import {connect} from 'react-redux'


export default function (ComposedComponent) {
    class AuthenticateSchoolAdmin extends React.Component {
        componentWillMount() {
            if (!this.props.isSchoolAdminAuthenticated || this.props.role==='system') {
                // this.props.addFlashMessage({
                //     type: 'error',
                //     text: 'You do not have permission to access this page. Please login first'
                // })
                this.context.router.history.push('/school_admin/login')
            }
        }

        componentWillUpdate(nextProps) {
            if(!nextProps.isSchoolAdminAuthenticated){
                this.context.router.history.push('/school_admin')
            }
        }

        render() {
            return (
                <ComposedComponent {...this.props}/>
            )
        }

    }

    AuthenticateSchoolAdmin.propTypes = {
        isSchoolAdminAuthenticated: PropTypes.bool.isRequired,
        role: PropTypes.string,
        // addFlashMessage: PropTypes.func.isRequired
    }
    AuthenticateSchoolAdmin.contextTypes = {
        router: PropTypes.object.isRequired
    }

    function mapStateToProps(state) {
        return {
            isSchoolAdminAuthenticated: state.schoolAdminLoginReducers.isSchoolAdminAuthenticated,
            role: state.schoolAdminLoginReducers.user.role
        }
    }

    return connect(mapStateToProps)(AuthenticateSchoolAdmin)
}