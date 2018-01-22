import React from 'react'
import PropTypes from 'prop-types'
import validator from 'validator'
import {isEmpty} from 'lodash'
import TextFieldGroup from '../../../shared/TextFieldsGroup'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import {registerSchoolAdmin} from "../../../actions/schoolAdminActions"
import {connect} from 'react-redux'
import {addFlashMessage} from "../../../actions/flashMessages"


class NewSchoolAdminForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            school_upi: '',
            password: '',
            passwordConfirmation: '',
            errors: {},
            isLoading: false,
            invalid: false
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.checkSchoolAdminExists = this.checkSchoolAdminExists.bind(this)
    }

    checkSchoolAdminExists(e) {
        const field = e.target.name
        const val = e.target.value
        if (val !== '') {
            this.props.isSchoolAdminExists(val).then(res => {
                if (res) {
                    let errors = this.state.errors
                    let invalid
                    if (res.data) {
                        invalid = true
                        errors[field] = 'There is School Admin registered with such ' + field
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
        if (validator.isEmpty(data.username)) {
            errors.username = 'This field is required'
        }
        if (validator.isEmpty(data.password)) {
            errors.password = 'This field is required'
        } if (validator.isEmpty(data.passwordConfirmation)) {
            errors.passwordConfirmation = 'This field is required'
        }
        if (!validator.equals(data.password,data.passwordConfirmation)) {
            errors.passwordConfirmation= 'Passwords do not match'
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
            this.props.registerSchoolAdmin(this.state).then(
                (schoolAdmin) => {
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'You have signed up successfully. Please use the login in form below to access your account'
                    })
                    this.props.onClose()
                    this.props.addSchoolAdmin(schoolAdmin.data)
                    this.setState({name:'',category:'',isLoading: false})
                },
                err => this.setState({errors: err.response.data, isLoading: false})
            )
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {show, onClose} = this.props

        const {errors, username, school_upi, password, passwordConfirmation,isLoading, invalid} = this.state
        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Register a new schoolAdmin</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                                label="Username (Name of the school)"
                                type="text"
                                name="username"
                                value={username} autoFocus={true}
                                onChange={this.onChange}
                                error={errors.username}
                            />
                            <TextFieldGroup
                                label="School UPI"
                                type="text"
                                name="school_upi"
                                value={school_upi}
                                onChange={this.onChange}
                                error={errors.school_upi}
                            />
                            <TextFieldGroup
                                label="Password"
                                type="password"
                                name="password"
                                value={password}
                                onChange={this.onChange}
                                error={errors.password}
                            />
                            <TextFieldGroup
                                label="Confirm Password"
                                type="password"
                                name="passwordConfirmation"
                                value={passwordConfirmation}
                                onChange={this.onChange}
                                error={errors.passwordConfirmation}
                            />

                            <div className="form-group">
                                <button disabled={isLoading || invalid} className="btn btn-primary btn-sm"
                                        type="submit">Save
                                </button>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={onClose}>Cancel</Button>{' '}
                    </ModalFooter>
                </Modal>
            )
        }
        else return null
    }

}


NewSchoolAdminForm.propTypes = {
    // userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    // isSchoolAdminExists: PropTypes.func.isRequired,
    registerSchoolAdmin: PropTypes.func.isRequired,
    addSchoolAdmin: PropTypes.func.isRequired,
}
NewSchoolAdminForm.contextTypes = {
    router: PropTypes.object.isRequired
}


export default connect(null,{registerSchoolAdmin,addFlashMessage})(NewSchoolAdminForm)

