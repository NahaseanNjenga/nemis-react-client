import React from 'react'
import PropTypes from 'prop-types'
import validator from 'validator'
import {isEmpty} from 'lodash'
import TextFieldGroup from '../../shared/TextFieldsGroup'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import {
    addTeacher, isTeacherDead, isTeacherExists, isTeacherInNemis,
    registerTeacher
} from "../../actions/teacherActions"
import {connect} from 'react-redux'
import {addFlashMessage} from "../../actions/flashMessages"
import jwt from 'jsonwebtoken'
import classnames from "classnames"


class NewTeacherForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tsc: '',
            surname: '',
            first_name: '',
            last_name: '',
            email: '',
            dob: '',
            gender: '',
            dead: false,
            teaching_subject_1: '',
            teaching_subject_2: '',
            telephone: '',
            nationalID: '',
            employment_date: '',

            disable_upi: false,
            nemis: false,
            errors: {},
            isLoading: false,
            invalid: false

        }
        this.cloneObj = JSON.parse(JSON.stringify(this.state))
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.checkTeacherExists = this.checkTeacherExists.bind(this)
        this.school_upi= ''
        if (window.location.pathname === '/school_admin/teachers') {
            const token = jwt.decode(localStorage.schoolAdminJwtToken)
          this.school_upi=token.school_upi
        }
    }

    componentDidMount() {
        if (window.location.pathname === '/school_admin/teachers') {
            const token = jwt.decode(localStorage.schoolAdminJwtToken)
            this.setState({school_upi: token.school_upi, disable_upi: true})
        }
    }

    resetState() {
        this.setState(this.cloneObj)
    }

    checkTeacherExists(e) {
        e.preventDefault()
        const {tsc} = this.state
        this.resetState()
        if (tsc !== '') {
            this.props.isTeacherExists(tsc).then(teacher => {
                if (teacher.data) {
                    const errors = {}
                    this.setState({errors: {}})
                    this.setState({
                        dob: teacher.data.birthdate,
                        telephone: teacher.data.contact.phone1,
                        email: teacher.data.contact.email,
                        last_name: teacher.data.last_name,
                        surname: teacher.data.surname,
                        first_name: teacher.data.first_name,
                        gender: teacher.data.gender,
                        nationalID: teacher.data.nationalID,
                        employment_date: teacher.data.posting_history.reporting_date,
                        teaching_subject_1: teacher.data.teaching_subjects.subject_1,
                        teaching_subject_2: teacher.data.teaching_subjects.subject_2,
                        tsc: teacher.data.tsc
                    })
                    if (validator.isEmpty(this.state.dob)) {
                        errors.dob = 'This field is required'
                        this.setState({errors, invalid: true})
                    }
                    if (Date.parse(this.state.dob) > Date.parse(new Date('2000'))) {
                        errors.dob = "A teacher must be 18 and above"
                        this.setState({errors, invalid: true})
                    }
                    if (validator.isEmpty(this.state.employment_date)) {
                        errors.employment_date = 'This field is required'
                        this.setState({errors, invalid: true})
                    }
                    if (Date.parse(this.state.dob) > Date.parse(this.state.employment_date)) {
                        errors.employment_date = 'You cannot be employed before you are born'
                        this.setState({errors, invalid: true})
                    }
                    if ((new Date(this.state.employment_date).getFullYear()-new Date(this.state.dob).getFullYear())<18) {
                        errors.employment_date = 'You cannot be employed before you are 18 years old'
                        this.setState({errors, invalid: true})
                    }
                    if (Date.parse(this.state.employment_date) < Date.parse(new Date('1976'))) {
                        errors.dob = 'You should be retired by now'
                        this.setState({errors, invalid: true})
                    }
                    if (Date.parse(this.state.dob) < Date.parse(new Date('1956'))) {
                        errors.dob = 'You should be retired by now'
                        this.setState({errors, invalid: true})
                    }
                    this.props.isTeacherDead(this.state.nationalID).then(teacher => {
                        if (teacher.data) {
                            this.resetState()
                            // this.setState({dead: true, invalid: true, 'errors.tsc': '', nemis: false})
                            let errors = {}
                            errors.nationalID = 'Teacher found in deceased database'
                            this.setState({errors,invalid: true})
                        }
                    })
                    this.props.isTeacherInNemis(this.state.tsc).then(teacher => {
                        if (teacher.data) {
                            this.resetState()
                            // this.setState({ dead: false, invalid: true, 'errors.tsc': ''})
                            let errors = {}
                            errors.nemis = 'Teacher already exists in Nemis database'
                            this.setState({errors,invalid: true})
                        }
                    })
                }
                else {
                    let errors = {}
                    errors.tsc = 'No teacher found on TSC Database'
                    console.log("this is working")
                    this.resetState()
                    this.setState({errors,invalid: true})
                    // this.setState({invalid: true})
                }
            })
        }

    }

    validateInput(data) {
        let errors = {}
        // if (!data.tsc) {
        //     errors.tsc = 'This field is required'
        // }
        // if (data.tsc.length < 3) {
        //     errors.tsc = "Tsc number must be greator than 3 characters"
        // }
        if (validator.isEmpty(data.first_name)) {
            errors.first_name = 'This field is required'
        }
        if (validator.isEmpty(data.last_name)) {
            errors.last_name = 'This field is required'
        }
        if (validator.isEmpty(data.gender)) {
            errors.gender = 'This field is required'
        }
        if (validator.isEmpty(data.email)) {
            errors.email = 'This field is required'
        }
        if (!data.telephone) {
            errors.telephone = 'This field is required'
        }
        if (validator.isEmpty(data.dob)) {
            errors.dob = 'This field is required'
        }
        if (Date.parse(data.dob) > Date.parse(new Date('2000'))) {
            errors.dob = "A teacher must be 18 and above"
        }
        if (validator.isEmpty(data.employment_date)) {
            errors.employment_date = 'This field is required'
        }
        if (Date.parse(data.dob) > Date.parse(data.employment_date)) {
            errors.employment_date = 'You cannot be employed before you are born'
        }
        if (Date.parse(data.employment_date) < Date.parse(new Date('1976'))) {
            errors.dob = 'You should be retired by now'
        }
        if (Date.parse(data.dob) < Date.parse(new Date('1956'))) {
            errors.dob = 'You should be retired by now'
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
        if (this.isValid() || !this.state.invalid) {
            this.setState({errors: {}, isLoading: true})
            this.props.registerTeacher(this.state).then(
                (teacher) => {
                    // this.props.addFlashMessage({
                    //     type: 'success',
                    //     text: 'You have signed up successfully. Please use the login in form below to access your account'
                    // })
                    this.props.onClose()
                    this.props.addTeacher(teacher.data)
                    this.setState({
                        tsc: '',
                        surname: '',
                        first_name: '',
                        last_name: '',
                        email: '',
                        dob: '',
                        gender: '',
                        telephone: '',
                        nationalID: '',
                        employment_date: '',
                        subjects: [],
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

        const {errors, isLoading, invalid, tsc, surname, first_name, last_name, email, dob, gender, telephone, nationalID, teaching_subject_1, teaching_subject_2, employment_date, disable_upi, school_upi, nemis, dead} = this.state
        const err = () => {
            for (let prop in errors) {
                if (errors.hasOwnProperty(prop)) {
                    return (<div className="alert alert-danger" role="alert">
                        {errors[prop]}
                    </div>)
                }

            }
        }
        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Register a new teacher</ModalHeader>
                    <ModalBody>
                            {err()}
                        <form onSubmit={this.checkTeacherExists}>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">TSC Number</label>

                                <div className="col-sm-9">
                                    <div className="input-group">

                                        <input type="number"
                                               className={classnames("form-control", {"is-invalid": errors.tsc})}
                                               placeholder="Search Teacher TSC Number"
                                               aria-label="Search Teacher TSC Number" aria-describedby="basic-addon1"
                                               onChange={this.onChange} name="tsc" autoFocus={true}/>
                                        <input type="submit" value="search" className="btn btn-sm btn-default"
                                               id="basic-addon1" onClick={this.checkTeacherExists}/>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                                label="Surname"
                                type="text"
                                name="surname"
                                value={surname}
                                onChange={this.onChange}
                                error={errors.surname}
                                disabled={true}

                            />
                            <TextFieldGroup
                                label="First name"
                                type="text"
                                name="first_name"
                                value={first_name}
                                onChange={this.onChange}
                                error={errors.first_name}
                                disabled={true}
                            />
                            <TextFieldGroup
                                label="Last name"
                                type="text"
                                name="last_name"
                                value={last_name}
                                onChange={this.onChange}
                                error={errors.last_name}
                                disabled={true}
                            />
                            <TextFieldGroup
                                label="Date of birth"
                                type="text"
                                name="dob"
                                value={new Date(dob).toDateString()}
                                onChange={this.onChange}
                                error={errors.dob}
                                disabled={true}
                            />
                            <TextFieldGroup
                                label="Email"
                                type="email"
                                name="email"
                                value={email}
                                onChange={this.onChange}
                                error={errors.email}
                                disabled={true}

                            />
                            <TextFieldGroup
                                label="National ID"
                                type="number"
                                name="nationalID"
                                value={nationalID}
                                onChange={this.onChange}
                                error={errors.nationalID}
                                disabled={true}

                            />
                            <TextFieldGroup
                                label="Phone number"
                                type="number"
                                name="telephone"
                                value={telephone}
                                onChange={this.onChange}
                                error={errors.telephone}
                                disabled={true}
                            />
                            <TextFieldGroup
                                label="Date of Employment"
                                type="text"
                                name="employment_date"
                                value={new Date(employment_date).toDateString()}
                                onChange={this.onChange}
                                error={errors.employment_date}
                                disabled={true}
                            />
                            <TextFieldGroup
                                label="Teaching subject 1 "
                                type="text"
                                name="teaching_subject_1"
                                value={teaching_subject_1}
                                onChange={this.onChange}
                                error={errors.teaching_subject_1}
                                disabled={true}
                            />
                            <TextFieldGroup
                                label="Teaching subject 2"
                                type="text"
                                name="teaching_subject_2"
                                value={teaching_subject_2}
                                onChange={this.onChange}
                                error={errors.teaching_subject_2}
                                disabled={true}
                            />
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label" htmlFor="gender">Gender</label>
                                <div className="col-sm-9">
                                    <select className="form-control form-control-sm" id="gender" name="gender"
                                            required="true" onChange={this.onChange} value={gender} disabled={true}>
                                        <option>Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">female</option>
                                    </select>
                                </div>
                            </div>

                            <TextFieldGroup
                                label="School UPI"
                                type="text"
                                name="school_upi"
                                value={this.school_upi}

                                onChange={this.onChange}
                                error={errors.school_upi}
                                disabled={school_upi?true:false}/>

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


NewTeacherForm.propTypes = {
    // userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    isTeacherExists: PropTypes.func.isRequired,
    registerTeacher: PropTypes.func.isRequired,
    addTeacher: PropTypes.func.isRequired,
    isTeacherDead: PropTypes.func.isRequired,
    isTeacherInNemis: PropTypes.func.isRequired,
}
NewTeacherForm.contextTypes = {
    router: PropTypes.object.isRequired
}


export default connect(null, {
    addTeacher,
    registerTeacher,
    addFlashMessage,
    isTeacherExists,
    isTeacherDead, isTeacherInNemis
})(NewTeacherForm)

