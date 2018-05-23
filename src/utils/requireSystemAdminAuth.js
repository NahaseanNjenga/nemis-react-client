import React from 'react'
import PropTypes from 'prop-types'
import {addFlashMessage} from "../actions/flashMessages"
import {connect} from 'react-redux'

export default function (ComposedComponent) {
    class AuthenticateSystemAdmin extends React.Component {
        componentWillMount() {
            if (!this.props.isAuthenticated || this.props.role==='school') {
                // this.props.addFlashMessage({
                //     type: 'error',
                //     text: 'You do not have permission to access this page. Please login first'
                // })
                this.context.router.history.push('/admin/login')
            }
        }

        componentWillUpdate(nextProps) {
            if(!nextProps.isAuthenticated){
                this.context.router.history.push('/admin')
            }
        }

        render() {
            return (
                <ComposedComponent {...this.props}/>
            )
        }

    }

    AuthenticateSystemAdmin.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        role: PropTypes.string,

        // addFlashMessage: PropTypes.func.isRequired
    }
    AuthenticateSystemAdmin.contextTypes = {
        router: PropTypes.object.isRequired
    }

    function mapStateToProps(state) {
        return {
            isAuthenticated: state.systemAdminLoginReducers.isAuthenticated,
            role: state.systemAdminLoginReducers.user.role
        }
    }

    return connect(mapStateToProps)(AuthenticateSystemAdmin)
}