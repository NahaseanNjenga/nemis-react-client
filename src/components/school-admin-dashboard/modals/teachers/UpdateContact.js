"use strict"
import React from 'react'
import PropTypes from 'prop-types'
import validator from 'validator'
import {isEmpty} from 'lodash'
// import TextFieldGroup from './../../shared/TextFieldsGroup'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
// import {addTeacher, registerTeacher} from "../../actions/teacherActions"
import {connect} from 'react-redux'
// import {addFlashMessage} from "../../actions/flashMessages"
import jwt from 'jsonwebtoken'
import {updateTeacherContact} from "../../../../actions/teacherActions"
import TextFieldGroup from "../../../../shared/TextFieldsGroup"


class UpdateContact extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: this.props.teacher.contact.email,
            phone1: this.props.teacher.contact.phone1,
            _id: this.props.teacher._id,
            errors: {},
            isLoading: false,
            invalid: false

        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    validateInput(data) {
        let errors = {}
        if (validator.isEmpty(data.email)) {
            errors.email = 'This field is required'
        }
        if (!data.phone1) {
            errors.phone1 = 'This field is required'
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
            this.props.updateTeacherContact(this.state).then(
                (teacher) => {
                    // this.props.addFlashMessage({
                    //     type: 'success',
                    //     text: 'You have signed up successfully. Please use the login in form below to access your account'
                    // })

                    this.setState({
                        errors: {},
                        isLoading: false,
                        showUpdateContactForm: false,
                        invalid: false,
                    })
                    this.props.onSuccesss()
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

        const {errors, isLoading, invalid, email, phone1,} = this.state
        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Register a new teacher</ModalHeader>
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
                                label="Phone number"
                                type="number"
                                name="phone1"
                                value={phone1}
                                onChange={this.onChange}
                                error={errors.phone1}
                            />
                            <div className="form-group">
                                <button disabled={isLoading || invalid} className="btn btn-primary btn-sm"
                                        type="submit" onClick={this.onSubmit}>Save
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


UpdateContact.propTypes = {
    teacher: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    updateTeacherContact: PropTypes.func.isRequired,
    onSuccesss: PropTypes.func.isRequired,

}

export default connect(null, {updateTeacherContact})(UpdateContact)

