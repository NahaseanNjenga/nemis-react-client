import React from 'react'
import PropTypes from 'prop-types'
import validator from 'validator'
import {isEmpty} from 'lodash'
import TextFieldGroup from './../../shared/TextFieldsGroup'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import {addStudent, registerStudent} from "../../actions/studentActions"
import {connect} from 'react-redux'
import {addFlashMessage} from "../../actions/flashMessages"

class NewStudentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            surname: '',
            first_name: '',
            last_name: '',
            dob: '',
            school_upi: '',
            gender: '',
            errors: {},
            isLoading: false,
            invalid: false
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.checkStudentExists = this.checkStudentExists.bind(this)
    }

    checkStudentExists(e) {
        const field = e.target.name
        const val = e.target.value
        if (val !== '') {
            // this.props.isStudentExists(val).then(res => {
            //     if (res) {
            //         let errors = this.state.errors
            //         let invalid
            //         if (res.data) {
            //             invalid = true
            //             errors[field] = 'There is school registered with such ' + field
            //         } else {
            //             invalid = false
            //             errors[field] = ''
            //         }
            //         this.setState({errors, invalid})
            //     }
            // })
        }
    }

    validateInput(data) {
        let errors = {}

        if (validator.isEmpty(data.first_name)) {
            errors.first_name = 'This field is required'
        }
        if (validator.isEmpty(data.last_name)) {
            errors.last_name = 'This field is required'
        }
        if (validator.isEmpty(data.gender)) {
            errors.gender = 'This field is required'
        }
        if (validator.isEmpty(data.dob)) {
            errors.dob = 'This field is required'
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
            this.props.registerStudent(this.state).then(
                (student) => {
                    // this.props.addFlashMessage({
                    //     type: 'success',
                    //     text: 'You have signed up successfully. Please use the login in form below to access your account'
                    // })
                    this.props.onClose()
                    this.props.addStudent(student.data)
                    this.setState({
                        tsc: '',
                        surname: '',
                        first_name: '',
                        last_name: '',
                        email: '',
                        dob: '',
                        school_upi: '',
                        gender: '',
                        telephone: '',
                        nationalID: '',
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

        const {errors, isLoading, invalid, surname, first_name, last_name, dob, school_upi} = this.state
        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Register a new student</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                                label="Surname"
                                type="text"
                                name="surname"
                                value={surname}
                                onChange={this.onChange}
                                error={errors.surname}
                            />
                            <TextFieldGroup
                                label="First name"
                                type="text"
                                name="first_name"
                                value={first_name}
                                onChange={this.onChange}
                                error={errors.first_name}
                            />
                            <TextFieldGroup
                                label="Last name"
                                type="text"
                                name="last_name"
                                value={last_name}
                                onChange={this.onChange}
                                error={errors.last_name}
                            />
                            <TextFieldGroup
                                label="Date of birth"
                                type="date"
                                name="dob"
                                value={dob}
                                onChange={this.onChange}
                                error={errors.dob}
                            />

                            <div className="form-group">
                                <label htmlFor="gender">Gender</label>
                                <select className="form-control form-control-sm" id="gender" name="gender"
                                        required="true" onChange={this.onChange}>
                                    <option>Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">female</option>
                                </select>
                            </div>
                            <TextFieldGroup
                                label="School UPI"
                                type="text"
                                name="school_upi"
                                value={school_upi}
                                onChange={this.onChange}
                                error={errors.school_upi}
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


NewStudentForm.propTypes = {
    // userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    // isStudentExists: PropTypes.func.isRequired,
    registerStudent: PropTypes.func.isRequired,
    addStudent: PropTypes.func.isRequired,
}
NewStudentForm.contextTypes = {
    router: PropTypes.object.isRequired
}


export default connect(null, {addStudent, registerStudent, addFlashMessage})(NewStudentForm)

