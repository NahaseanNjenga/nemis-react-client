import React from 'react'
import PropTypes from 'prop-types'
import {addFlashMessage} from "../actions/flashMessages"
import {connect} from 'react-redux'


export default function (ComposedComponent) {
    class AuthenticateKnecAdmin extends React.Component {
        componentWillMount() {
            if (!this.props.isKnecAdminAuthenticated || this.props.role === 'system' || this.props.role === 'school') {
                // this.props.addFlashMessage({
                //     type: 'error',
                //     text: 'You do not have permission to access this page. Please login first'
                // })
                this.context.router.history.push('/knec_admin/login')
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.isKnecAdminAuthenticated) {
                this.context.router.history.push('/knec_admin')
            }
        }

        render() {
            return (
                <ComposedComponent {...this.props}/>
            )
        }

    }

    AuthenticateKnecAdmin.propTypes = {
        isKnecAdminAuthenticated: PropTypes.bool.isRequired,
        role: PropTypes.string,
        // addFlashMessage: PropTypes.func.isRequired
    }
    AuthenticateKnecAdmin.contextTypes = {
        router: PropTypes.object.isRequired
    }

    function mapStateToProps(state) {
        return {
            isKnecAdminAuthenticated: state.knecAdminLoginReducers.isKnecAdminAuthenticated,
            role: state.knecAdminLoginReducers.user.role
        }
    }

    return connect(mapStateToProps)(AuthenticateKnecAdmin)
}