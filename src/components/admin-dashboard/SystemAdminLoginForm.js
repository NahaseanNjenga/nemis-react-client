import React from 'react'
import PropTypes from 'prop-types'
import validator from 'validator'
import {isEmpty} from 'lodash'
import {connect} from 'react-redux'
import {login} from '../actions/loginActions'
import TextFieldGroup from "../shared/TextFieldsGroup"


class SystemAdminLoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            errors: {},
            isLoading: false,
            invalid: false
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        // this.checkUserExists = this.checkUserExists.bind(this)
    }


    validateInput(data) {
        let errors = {}

        if (validator.isEmpty(data.username)) {
            errors.username = 'This field is required'
        }
        if (validator.isEmpty(data.password)) {
            errors.password = 'This field is required'
        }
        return {
            errors,
            isValid: isEmpty(errors)
        }
    }

    isValid() {
        const {errors, isValid} = this.validateInput(this.state)
        if (!isValid) {
            this.setState({errors})
        }
        return isValid
    }

    onSubmit(e) {
        e.preventDefault()
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true})
            this.props.login(this.state).then(
                (res) => {
                    // this.props.addFlashMessage({type: 'success', text: 'You have signed up successfully'})
                    this.context.router.history.push('/admin')
                },
                err => this.setState({errors: err.response.data.errors, isLoading: false})
            )
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {errors, password, username, isLoading, invalid} = this.state
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 offset-sm-3">
                        <form onSubmit={this.onSubmit}>
                            <h1>Admin Login</h1>
                            {errors.form && <div className="alert alert-danger">{errors.form}</div>}
                            <TextFieldGroup
                                label="Username"
                                type="username"
                                name="username"
                                value={username}
                                onChange={this.onChange}
                                error={errors.username}
                                autofocus={true}
                                // checkUserExists={this.checkUserExists}
                            />
                            <TextFieldGroup
                                label="Password"
                                type="password"
                                name="password"
                                value={password}
                                onChange={this.onChange}
                                error={errors.password}
                            />
                            <div className="form-group">
                                <button disabled={isLoading || invalid} className="btn btn-primary btn-sm"
                                        type="submit">Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

SystemAdminLoginForm.propTypes = {
    login: PropTypes.func.isRequired
}
SystemAdminLoginForm.contextTypes = {
    router: PropTypes.object.isRequired
}

export default connect(null, {login})(SystemAdminLoginForm)