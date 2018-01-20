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
import {deceaseTeacher, removeTeacher} from "../../../../actions/teacherActions"
import TextFieldGroup from "../../../../shared/TextFieldsGroup"


class Retire extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: '',
            cause: '',
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
        if (!data.date) {
            errors.date = 'This field is required'
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
            const token = jwt.decode(localStorage.schoolAdminJwtToken)
            const teacher = {
                teacher_id: this.props.teacher._id,
                tsc: this.props.teacher.tsc,
                date_deceased: this.state.date,
                school_upi: token.school_upi,
                timestamp: new Date(),
                cause: this.state.cause
            }
            this.props.deceaseTeacher(teacher).then(
                (teacher) => {
                    // this.props.addFlashMessage({
                    //     type: 'success',
                    //     text: 'You have signed up successfully. Please use the login in form below to access your account'
                    // })

                    this.setState({
                        errors: {},
                        isLoading: false,
                        showRetireForm: false,
                        invalid: false,
                    })
                    this.props.removeTeacher({_id: teacher.data.teacher_id})
                    this.props.onClose()
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

        const {errors, isLoading, invalid, date, cause} = this.state
        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Mark Teacher as deceased</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                                label="Date of death"
                                type="date"
                                name="date"
                                value={date}
                                onChange={this.onChange}
                                error={errors.date}
                            />

                            <TextFieldGroup
                                label="Cause of death (leave blank if unknown)"
                                type="text"
                                name="cause"
                                value={cause}
                                onChange={this.onChange}
                                error={errors.cause}
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


Retire.propTypes = {
    teacher: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    deceaseTeacher: PropTypes.func.isRequired,
    removeTeacher: PropTypes.func.isRequired,

}

export default connect(null, {deceaseTeacher,removeTeacher})(Retire)

