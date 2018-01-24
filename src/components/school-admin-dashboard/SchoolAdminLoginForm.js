import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import validator from 'validator'
import {isEmpty} from 'lodash'
import{schoolAdminlogin} from '../../actions/loginActions'
import TextFieldGroup from "../../shared/TextFieldsGroup"
import {Link} from "react-router-dom"

class SchoolAdminLoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            school_upi: '',
            username: '',
            password: '',
            errors: {},
            isLoading: false,
            invalid: false
        }
        this.onChange = this.onChange.bind(this)
        this.checkSchoolExists = this.checkSchoolExists.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
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
            console.log(typeof this.props.schoolAdminLogin)
            this.props.schoolAdminlogin(this.state).then(
                (res) => {
                    // this.props.addFlashMessage({type: 'success', text: 'You have signed up successfully'})
                    this.context.router.history.push('/school_admin')
                },
                err => this.setState({errors: err.response.data.errors, isLoading: false})
            )
        }
    }

    checkSchoolExists(e) {
        const field = e.target.name
        const val = e.target.value
        if (val !== '') {
            this.props.isSchoolExists(val).then(res => {
                if (res) {
                    let errors = this.state.errors
                    let invalid
                    if (res.data) {
                        invalid = true
                        errors[field] = 'There is user with such ' + field
                    } else {
                        invalid = false
                        errors[field] = ''
                    }
                    this.setState({errors, invalid})
                }
            })
        }
    }

    validateInput(data) {
        let errors = {}

        if (validator.isEmpty(data.school_upi)) {
            errors.school_upi = 'This field is required'
        }
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

    render() {

        const {username, password, school_upi, isLoading, invalid, errors} = this.state

        return (<div className="container">
                <div className="row">
                    <div className="col-sm-6 offset-sm-3">
                        <h2>School Admin Login </h2>
                        <form onSubmit={this.onSubmit}>
                            {errors.form && <div className="alert alert-danger">{errors.form}</div>}
                            <TextFieldGroup
                                label="School UPI"
                                type="text"
                                name="school_upi"
                                value={school_upi}
                                onChange={this.onChange}
                                error={errors.school_upi}

                            />
                            <TextFieldGroup
                                label="Username"
                                type="text"
                                name="username"
                                value={username}
                                onChange={this.onChange}
                                error={errors.username}
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
                                <button disabled={isLoading || invalid} className="btn btn-primary btn-sm form-control col-sm-4 offset-sm-3"
                                        type="submit">Login
                                </button>
                            </div>
                        </form>
                        <Link to="/school_admin/forgot password">Forgot Password</Link>
                    </div>
                </div>
            </div>
        )
    }
}

SchoolAdminLoginForm.propTypes = {
    // isSchoolExists: PropTypes.func.isRequired,
    schoolAdminlogin: PropTypes.func.isRequired,
}
SchoolAdminLoginForm.contextTypes = {
    router: PropTypes.object.isRequired
}

export default connect(null,{schoolAdminlogin})(SchoolAdminLoginForm)