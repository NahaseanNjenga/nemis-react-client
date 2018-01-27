import React from 'react'
import PropTypes from 'prop-types'
import validator from 'validator'
import {isEmpty} from 'lodash'
import TextFieldGroup from '../../shared/TextFieldsGroup'
import {registerTeacher} from "./teacherActions"
import {connect} from 'react-redux'


class TSC_Registration extends React.Component {
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
            teaching_subject_1:'',
            teaching_subject_2:'',
            telephone: '',
            nationalID: '',
            employment_date: '',
            errors: {},
            isLoading: false,
            invalid: false

        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }


    validateInput(data) {
        let errors = {}
        if (!data.tsc) {
            errors.tsc = 'This field is required'
        }
        if (data.tsc.length < 3) {
            errors.tsc = "Tsc number must be greator than 3 characters"
        }
        if (validator.isEmpty(data.first_name)) {
            errors.first_name = 'This field is required'
        }
        if (validator.isEmpty(data.last_name)) {
            errors.last_name = 'This field is required'
        }
        if (validator.isEmpty(data.teaching_subject_1)) {
            errors.teaching_subject_1 = 'This field is required'
        }
        if (validator.isEmpty(data.teaching_subject_2)) {
            errors.teaching_subject_2 = 'This field is required'
        }
        if (validator.isEmpty(data.gender)) {
            errors.gender = 'This field is required'
        }
        if (validator.isEmpty(data.email)) {
            errors.email = 'This field is required'
        }
        if (validator.isEmpty(data.telephone)) {
            errors.telephone = 'This field is required'
        }
        if (validator.isEmpty(data.dob)) {
            errors.dob = 'This field is required'
        }
        if (Date.parse(data.dob) > Date.parse(new Date('2000'))) {
            errors.dob = "A teacher must be 18 and above"
        }
        if (validator.isEmpty(data.employment_date)) {
            errors.employmentdate = 'This field is required'
        }
        if (Date.parse(data.dob) > Date.parse(data.employment_date)) {
            errors.employmentdate = 'You cannot be employed before you are born'
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
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true})
            this.props.registerTeacher(this.state).then(
                (teacher) => {
                    window.location.reload()
                },
                err => this.setState({errors: err.response.data, isLoading: false})
            )
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {errors, isLoading, invalid, tsc, surname, first_name, last_name, email, dob,  telephone, nationalID,teaching_subject_1,teaching_subject_2, employment_date, } = this.state
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8 offset-sm-2">
                            <br/>
                <form onSubmit={this.onSubmit}>
                    <TextFieldGroup
                        label="TSC Number"
                        type="number"
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
                        name="dob"
                        value={dob}
                        onChange={this.onChange}
                        error={errors.dob}

                    />
                    <TextFieldGroup
                        label="Email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        error={errors.email}

                    />
                    <TextFieldGroup
                        label="National ID"
                        type="number"
                        name="nationalID"
                        value={nationalID}
                        onChange={this.onChange}
                        error={errors.nationalID}

                    />
                    <TextFieldGroup
                        label="Phone number"
                        type="number"
                        name="telephone"
                        value={telephone}
                        onChange={this.onChange}
                        error={errors.telephone}
                    />
                    <TextFieldGroup
                        label="Date of Employment"
                        type="date"
                        name="employment_date"
                        value={employment_date}
                        onChange={this.onChange}
                        error={errors.employment_date}
                    />
                    <TextFieldGroup
                        label="Teaching subject 1 "
                        type="text"
                        name="teaching_subject_1"
                        value={teaching_subject_1}
                        onChange={this.onChange}
                        error={errors.teaching_subject_1}
                    />
                    <TextFieldGroup
                        label="Teaching subject 2"
                        type="text"
                        name="teaching_subject_2"
                        value={teaching_subject_2}
                        onChange={this.onChange}
                        error={errors.teaching_subject_2}
                    />
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label" htmlFor="gender">Gender</label>
                        <div className="col-sm-9">
                            <select className="form-control form-control-sm" id="gender" name="gender"
                                    required="true" onChange={this.onChange}>
                                <option>Select</option>
                                <option value="male">Male</option>
                                <option value="female">female</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <TextFieldGroup
                            label=""
                            type="submit"
                            name="save"
                            value="Save"
                            className="btn btn-sm btn-primary"
                        />
                    </div>
                </form>
                        </div>
                    </div>
                </div>
            )

    }

}


TSC_Registration.propTypes = {
    registerTeacher: PropTypes.func.isRequired,
}

export default connect(null, {registerTeacher,})(TSC_Registration)

