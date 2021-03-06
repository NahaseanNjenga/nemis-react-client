import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import validator from 'validator'
import {isEmpty} from 'lodash'
import {knecAdminlogin, schoolAdminlogin} from '../../actions/loginActions'
import TextFieldGroup from "../../shared/TextFieldsGroup"

class KnecAdminLogin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errors: {},
            isLoading: false,
            invalid: false
        }
        this.onChange = this.onChange.bind(this)
        // this.checkSchoolExists = this.checkSchoolExists.bind(this)
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
            this.props.knecAdminlogin(this.state).then(
                (knecAdmin) => {
                    // if (knecAdmin) {
                    this.context.router.history.push('/knec_admin')
                    // }
                    // this.props.addFlashMessage({type: 'success', text: 'You have signed up successfully'})
                },
                err => this.setState({errors: err.response.data.errors, isLoading: false})
            )
        }
    }

    // checkSchoolExists(e) {
    //     const field = e.target.name
    //     const val = e.target.value
    //     if (val !== '') {
    //         this.props.isSchoolExists(val).then(res => {
    //             if (res) {
    //                 let errors = this.state.errors
    //                 let invalid
    //                 if (res.data) {
    //                     invalid = true
    //                     errors[field] = 'There is user with such ' + field
    //                 } else {
    //                     invalid = false
    //                     errors[field] = ''
    //                 }
    //                 this.setState({errors, invalid})
    //             }
    //         })
    //     }
    // }

    validateInput(data) {
        let errors = {}

        if (validator.isEmpty(data.email)) {
            errors.email = 'This field is required'
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

        const {email, password, isLoading, invalid, errors} = this.state

        return (<div className="container">
                <div className="row">
                    <div className="col-sm-6 offset-sm-3">
                        <h2>Knec Admin KnecAdminLogin </h2>
                        <form onSubmit={this.onSubmit}>
                            {errors.form && <div className="alert alert-danger">{errors.form}</div>}
                            <TextFieldGroup
                                label="Email"
                                type="email"
                                name="email"
                                value={email}
                                onChange={this.onChange}
                                error={errors.email}
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

KnecAdminLogin.propTypes = {
    // isSchoolExists: PropTypes.func.isRequired,
    knecAdminlogin: PropTypes.func.isRequired,
}
KnecAdminLogin.contextTypes = {
    router: PropTypes.object.isRequired
}

export default connect(null, {knecAdminlogin})(KnecAdminLogin)