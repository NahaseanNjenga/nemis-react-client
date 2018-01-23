import React from 'react'
import PropTypes from 'prop-types'
import validator from 'validator'
import {isEmpty} from 'lodash'
import TextFieldGroup from '../../shared/TextFieldsGroup'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import {addStudent, registerStudent} from "../../actions/studentActions"
import {connect} from 'react-redux'
import {addFlashMessage} from "../../actions/flashMessages"
import jwt from "jsonwebtoken"
import {getSchoolCategory} from "../../actions/schoolActions"

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
            year: '',
            category: '',
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

    componentDidMount() {
        if (window.location.pathname === '/school_admin/students') {
            const token = jwt.decode(localStorage.schoolAdminJwtToken)
            this.setState({school_upi: token.school_upi})
            this.props.getSchoolCategory({upi: token.school_upi}).then(category => {
                if (category) {
                    this.setState({category: category.data.category})
                    console.log(category.data.category)
                }
            })


        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {show, onClose} = this.props

        const {errors, isLoading, invalid, surname, first_name, last_name, dob, school_upi, category} = this.state
        const ecde = <div className="form-group">
            <label htmlFor="year">Year of study</label>
            <select className="form-control form-control-sm" id="year" name="year"
                    required="true" onChange={this.onChange}>
                <option>Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
            </select>
        </div>
        const primary = <div className="form-group">
            <label htmlFor="year">Year of study</label>
            <select className="form-control form-control-sm" id="year" name="year"
                    required="true" onChange={this.onChange}>
                <option>Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
            </select>
        </div>
        const secondary = <div className="form-group">
            <label htmlFor="year">Year of study</label>
            <select className="form-control form-control-sm" id="year" name="year"
                    required="true" onChange={this.onChange}>
                <option>Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
        </div>
        const tertiary = <div className="form-group">
            <label htmlFor="year">Year of study</label>
            <select className="form-control form-control-sm" id="year" name="year"
                    required="true" onChange={this.onChange}>
                <option>Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
        const year_of_study = () => {
            switch (category) {
                case 'ECDE':
                    return ecde
                case 'primary':
                    return primary
                case 'secondary':
                    return secondary
                case 'tertiary':
                    return tertiary
                default :
                    return ''
            }
        }

        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Register a new student</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onSubmit}>
                            {school_upi ? '' : <TextFieldGroup
                                label="School UPI"
                                type="text"
                                name="school_upi"
                                value={school_upi}
                                onChange={this.onChange}
                                error={errors.school_upi}
                            />}
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
                            {year_of_study()}
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
    getSchoolCategory: PropTypes.func.isRequired,
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


export default connect(null, {addStudent, registerStudent, addFlashMessage, getSchoolCategory})(NewStudentForm)

