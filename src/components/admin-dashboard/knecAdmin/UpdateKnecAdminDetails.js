import React from 'react'
import PropTypes from 'prop-types'
import validator from 'validator'
import {isEmpty} from 'lodash'
import TextFieldGroup from '../../../shared/TextFieldsGroup'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import {addKnecAdmin, getKnecAdmin, registerKnecAdmin, updateKnecAdmin} from "../../../actions/knecAdminActions"
import {connect} from 'react-redux'
import {addFlashMessage} from "../../../actions/flashMessages"

class NewKnecAdminForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: '',
            email:'',
            password: '',
            passwordConfirmation:'',
            errors: {},
            isLoading: false,
            invalid: false
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        // this.checkKnecAdminExists = this.checkKnecAdminExists.bind(this)
    }

    // checkKnecAdminExists(e) {
    //     const field = e.target.name
    //     const val = e.target.value
    //     if (val !== '') {
    //         // this.props.isKnecAdminExists(val).then(res => {
    //         //     if (res) {
    //         //         let errors = this.state.errors
    //         //         let invalid
    //         //         if (res.data) {
    //         //             invalid = true
    //         //             errors[field] = 'There is school registered with such ' + field
    //         //         } else {
    //         //             invalid = false
    //         //             errors[field] = ''
    //         //         }
    //         //         this.setState({errors, invalid})
    //         //     }
    //         // })
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
        if (validator.isEmpty(data.passwordConfirmation)) {
            errors.gender = 'This field is required'
        }
        if (!validator.equals(data.password, data.passwordConfirmation)) {
            errors.passwordConfirmation = 'The passwords do not match'
        }

        return {
            errors,
            isValid: isEmpty(errors)
        }
    }

    componentDidMount() {
        this.props.getKnecAdmin().then(knecAdmin => {
            if (knecAdmin) {
                this.setState({
                    _id: knecAdmin.data._id,
                    email: knecAdmin.data.email,
                    password: knecAdmin.data.password,
                    passwordConfirmation: knecAdmin.data.password,
                })
            }
        })
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
            this.props.updateKnecAdmin(this.state).then(
                (knecAdmin) => {
                    // this.props.addFlashMessage({
                    //     type: 'success',
                    //     text: 'You have signed up successfully. Please use the login in form below to access your account'
                    // })
                    this.props.onClose()
                    this.setState({
                        email: '',
                        password: '',
                        passwordConfirmation: '',
                        errors: {},
                        isLoading: false,
                        invalid: false
                    })
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

        const {errors, isLoading, invalid, email, password, passwordConfirmation,} = this.state
        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Update Knec Admin Details</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onSubmit}>
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


NewKnecAdminForm.propTypes = {
    // userSignupRequest: PropTypes.func.isRequired,
    // addFlashMessage: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    knecAdmin: PropTypes.object.isRequired,
    // isKnecAdminExists: PropTypes.func.isRequired,
    updateKnecAdmin: PropTypes.func.isRequired,
    getKnecAdmin: PropTypes.func.isRequired,
}
NewKnecAdminForm.contextTypes = {
    router: PropTypes.object.isRequired
}


export default connect(null, {getKnecAdmin, updateKnecAdmin, registerKnecAdmin})(NewKnecAdminForm)

