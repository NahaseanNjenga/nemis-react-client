import React from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import PropTypes from 'prop-types'
import TextFieldGroup from "../../shared/TextFieldsGroup"
import validator from "validator"
import {isEmpty} from "lodash"
import {connect} from 'react-redux'
import {updateTeacher, updateTeacherList} from "../../actions/teacherActions"

class UpdateTeacherDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errors: {},
            isLoading: false,
            invalid: false,
            _id : this.props.teacher._id,
            surname : this.props.teacher.surname,
            first_name : this.props.teacher.first_name,
            last_name : this.props.teacher.last_name,
            tsc : this.props.teacher.tsc,
            gender : this.props.teacher.gender,
            nationalID : this.props.teacher.nationalID,
            // life : this.props.teacher.life,
            birthdate : this.props.teacher.birthdate,

        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onSubmit(e) {
        e.preventDefault()
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true})
            this.props.updateTeacher(this.state).then(
                (teacher) => {
                    // this.props.addFlashMessage({
                    //     type: 'success',
                    //     text: 'You have signed up successfully. Please use the login in form below to access your account'
                    // })
                    this.props.onClose()
                    this.props.updateTeacherList(teacher.data)
                    this.setState({isLoading: false})
                },
                err => this.setState({errors: err.response.data, isLoading: false})
            )
        }
    }

    isValid() {
        const {errors, isValid} = this.validateInput(this.state)
        if (!isValid) {
            this.setState({errors})
        }
        return isValid
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
        this.setState({_id: this.props.teacher._id})
    }

    validateInput(data) {
        let errors = {}
        if (validator.isEmpty(data.tsc)) {
            errors.tsc = 'This field is required'
        }
        if (validator.isEmpty(data.first_name)) {
            errors.first_name = 'This field is required'
        }
        if (validator.isEmpty(data.surname)) {
            errors.surname = 'This field is required'
        }

        if (validator.isEmpty(data.gender)) {
            errors.gender = 'This field is required'
        }
        if (validator.isEmpty(data.birthdate)) {
            errors.birthdate = 'This field is required'
        }

        if (!data.nationalID) {
            errors.nationalID = 'This field is required'
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
        const {show, onClose} = this.props
        const {errors, invalid, isLoading} = this.state

        const {surname, first_name, last_name, tsc, gender, nationalID, birthdate, }= this.state
        if (show) {
            return (<Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Update Teacher information</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                                label="TSC Number"
                                type="text"
                                name="tsc"
                                value={tsc} autofocus={true}
                                onChange={this.onChange}
                                error={errors.tsc}

                            />
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
                                name="birthdate"
                                value={birthdate}
                                onChange={this.onChange}
                                error={errors.birthdate}

                            />
                            <TextFieldGroup
                                label="National ID"
                                type="number"
                                name="nationalID"
                                value={nationalID}
                                onChange={this.onChange}
                                error={errors.nationalID}
                            />
                            <div className="form-group">
                                <label htmlFor="gender">Gender</label>
                                <select className="form-control form-control-sm" id="gender" name="gender" required="true" onChange={this.onChange} value={gender}>
                                    <option>Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">female</option>
                                </select>
                            </div>

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

UpdateTeacherDetails.propTypes = {
    show: PropTypes.bool.isRequired,
    teacher: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    updateTeacher: PropTypes.func.isRequired,
    updateTeacherList: PropTypes.func.isRequired,
}


export default connect(null, {updateTeacher, updateTeacherList})(UpdateTeacherDetails)