import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Responsibility from "./Responsibility"
import {
    addResponsibility, clearResponsibilities, getResponsibilities,
    registerResponsibility, relieveResponsibility, removeResponsibility, updateResponsibility,
    updateResponsibilityOnList
} from "../../../../actions/responsibilityActions"
import {isEmpty} from "lodash"
import validator from "validator"
import TextFieldGroup from "../../../../shared/TextFieldsGroup"
import jwt from "jsonwebtoken"
import classnames from "classnames"
import {getSchoolCategory, searchSchoolUpi} from "../../../../actions/schoolActions"

class ResponsibilitiesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showResponsibilityForm: false,
            errors: {},
            school_category: '',
            isLoading: false,
            invalid: false,
            responsibility: '',
            date_assigned: '',
            showUpdateResponsibilityForm: false,
            editedResponsibilityId: '',
            date_relieved: '',
            school_upi: '',
        }
        this.school_upi = ''
        this.role = ''
        const token = jwt.decode(localStorage.schoolAdminJwtToken)
        if (token) {
            this.school_upi = token.school_upi
        }
        else if (jwt.decode(localStorage.systemAdminJwtToken)) {
            this.role = 'system'
        }
        this.onChange = this.onChange.bind(this)
        this.addResponsibility = this.addResponsibility.bind(this)
        this.onSubmitResponsibility = this.onSubmitResponsibility.bind(this)
        this.onEdit = this.onEdit.bind(this)
        this.onUpdateResponsibility = this.onUpdateResponsibility.bind(this)
        this.onCancelUpdateResponsibilityForm = this.onCancelUpdateResponsibilityForm.bind(this)
        this.onCancelNewResponsibilityForm = this.onCancelNewResponsibilityForm.bind(this)
        this.onRelieve = this.onRelieve.bind(this)
    }

    onRelieve(e) {
        e.preventDefault()
        const responsibility = {
            // teacher_tsc: this.props.teacher.tsc,
            date_relieved: new Date(),
            relievedResponsibilityId: e.target.getAttribute('data-id')
        }
        this.props.relieveResponsibility(responsibility).then((responsibility) => {
                // this.props.addFlashMessage({
                //     type: 'success',
                //     text: 'You have signed up successfully. Please use the login in form below to access your account'
                // })

                // this.props.clearResponsibilities()
                // .map(responsibility => {
                this.props.updateResponsibilityOnList(responsibility.data)
                // })
                this.setState({
                    responsibility: '',
                    date_assigned: '',
                    errors: {},
                    isLoading: false,
                    invalid: false, showUpdateResponsibilityForm: false

                })
            },
            err => this.setState({errors: err.response.data, isLoading: false})
        )
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onUpdateResponsibility(e) {
        e.preventDefault()
        const responsibility = {
            teacher: this.props.teacher,
            responsibility: this.state.responsibility,
            date_assigned: this.state.date_assigned,
            editedResponsibilityId: this.state.editedResponsibilityId
        }
        this.props.updateResponsibility(responsibility).then((responsibilities) => {
                // this.props.addFlashMessage({
                //     type: 'success',
                //     text: 'You have signed up successfully. Please use the login in form below to access your account'
                // })
                this.props.clearResponsibilities()
                responsibilities.data.responsibilities.map(responsibility => {
                    this.props.addResponsibility(responsibility)
                })
                this.setState({
                    responsibility: '',
                    date_assigned: '',
                    errors: {},
                    isLoading: false,
                    invalid: false, showUpdateResponsibilityForm: false
                })
            },
            err => this.setState({errors: err.response.data, isLoading: false})
        )
    }

    addResponsibility() {
        this.setState({
            showResponsibilityForm: true,
            showUpdateResponsibilityForm: false,
            responsibility: '',
            date_assigned: '',
            editedResponsibilityId: ''
        })
    }

    onCancelUpdateResponsibilityForm(e) {
        e.preventDefault()
        this.setState({showUpdateResponsibilityForm: false})
        this.props.addResponsibility({
            _id: this.state.editedResponsibilityId,
            name: this.state.responsibility,
            date_assigned: this.state.date_assigned
        })
    }

    onCancelNewResponsibilityForm(e) {
        e.preventDefault()
        this.setState({showResponsibilityForm: false})
    }

    validateInput(data) {
        let errors = {}
        if (validator.isEmpty(data.responsibility)) {
            errors.responsibility = 'This field is required'
        }
        if (validator.isEmpty(data.date_assigned)) {
            errors.date_assigned = 'This field is required'
        }
        return {
            errors,
            isValid: isEmpty(errors)
        }
    }

    onEdit(e) {
        e.preventDefault()
        // const date=new Date(e.target.getAttribute('data-date')).toL
        this.setState({
            showUpdateResponsibilityForm: true,
            showResponsibilityForm: false,
            editedResponsibilityId: e.target.getAttribute('data-id'),
            responsibility: e.target.getAttribute('data-name'),
            date_assigned: e.target.getAttribute('data-date')
        })
        this.props.removeResponsibility({_id: e.target.getAttribute('data-id')})


    }

    isValid() {
        const {errors, isValid} = this.validateInput(this.state)
        if (!isValid) {
            this.setState({errors})
        }
        return isValid
    }

    componentDidMount() {
        this.props.clearResponsibilities()
        this.props.getResponsibilities(this.props.teacher.tsc).then(responsibilities => {
            if (responsibilities.data.length > 0) {
                // console.log(responsibilities.data)
                responsibilities.data.map(responsibility => {
                    this.props.addResponsibility(responsibility)
                })
            } else {
                // console.log("no resp")

            }
        })
        this.props.getSchoolCategory({upi: this.props.teacher.posting_history.current_school}).then(school => {
            if (school) {
                this.setState({school_category: school.data.category, school_upi: school.data.upi})
            }
        })
    }

    onSubmitResponsibility(e) {
        e.preventDefault()
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true})
            const responsibility = {
                teacher_tsc: this.props.teacher.tsc,
                responsibility: this.state.responsibility,
                date_assigned: this.state.date_assigned,
                school_upi: this.state.school_upi

            }
            this.props.registerResponsibility({responsibility: responsibility}).then(
                (responsibility) => {

                    // this.props.addFlashMessage({
                    //     type: 'success',
                    //     text: 'You have signed up successfully. Please use the login in form below to access your account'
                    // })
                    // this.props.clearResponsibilities()

                    this.props.addResponsibility(responsibility.data)
                    this.setState({
                        responsibility: '',
                        date_assigned: '',
                        errors: {},
                        isLoading: false,
                        invalid: false, showResponsibilityForm: false

                    })
                },
                err => this.setState({errors: err.response.data, isLoading: false})
            )
        }
    }

    render() {
        let count = 1
        const {showResponsibilityForm, showUpdateResponsibilityForm, responsibility, date_assigned, errors, isLoading, invalid, relieved, school_category} = this.state
        const {responsibilities, teacher} = this.props

        const primaryResponsibility = <div className="form-group row">
            <label className="col-sm-3 col-form-label" htmlFor="responsibility">Responsibility</label>
            <div className="col-sm-9">

                <select className={classnames("form-control form-control-sm", {"is-invalid": errors.responsibility})}
                        id="responsibility" name="responsibility"
                        required="true" onChange={this.onChange}>
                    <option>Select</option>
                    <option value="head_teacher">Head Teacher</option>
                    <option value="deputy_head_teacher">Deputy Head Teacher</option>
                    <option value="senior_teacher">Senior Teacher</option>
                    <option value="hod">HOD</option>
                    {teacher.gender === 'male' ? <option value="discipline"> Discipline Master</option> :
                        <option value="discipline"> Discipline Mistress</option>}
                    {teacher.gender === 'male' ? <option value="games"> Games Master</option> :
                        <option value="games"> Games Mistress</option>}
                </select>
                {errors.responsibility && <div className="invalid-feedback">{errors.responsibility}</div>}
            </div>
        </div>
        const secondaryResponsibility = <div className="form-group row">
            <label className="col-sm-3 col-form-label" htmlFor="responsibility">Responsibility</label>
            <div className="col-sm-9">

                <select className={classnames("form-control form-control-sm", {"is-invalid": errors.responsibility})}
                        id="responsibility" name="responsibility"
                        required="true" onChange={this.onChange}>
                    <option>Select</option>
                    <option value="principal">Principal</option>
                    <option value="deputy_principal">Deputy Principal</option>
                    <option value="senior_teacher">Senior Teacher</option>
                    <option value="hod">HOD</option>
                    {teacher.gender === 'male' ? <option value="discipline"> Discipline Master</option> :
                        <option value="discipline"> Discipline Mistress</option>}
                    {teacher.gender === 'male' ? <option value="games"> Games Master</option> :
                        <option value="games"> Games Mistress</option>}
                </select>
                {errors.responsibility && <div className="invalid-feedback">{errors.responsibility}</div>}
            </div>
        </div>
        const responsibilityList = school_category === 'primary' ? primaryResponsibility : school_category === 'secondary' ? secondaryResponsibility : ''

        const responsibilityForm = <form onSubmit={this.onSubmitResponsibility}>
            {responsibilityList}
            <TextFieldGroup
                label="Date Assigned"
                type="date"
                name="date_assigned"
                value={date_assigned}
                onChange={this.onChange}
                error={errors.date_assigned}
            />
            <div className="form-group">
                <button disabled={isLoading || invalid} className="btn btn-primary btn-sm"
                        type="submit">Save
                </button>
                &nbsp;
                <button disabled={isLoading || invalid} className="btn btn-secondary btn-sm"
                        type="submit" onClick={this.onCancelNewResponsibilityForm}>Cancel
                </button>
            </div>
        </form>
        const updateResponsibilityForm =
            <div>

                <form onSubmit={this.onUpdateResponsibility}>
                    {responsibilityList}
                    <TextFieldGroup
                        label="Date Assigned"
                        type="date"
                        name="date_assigned"
                        value={date_assigned}
                        onChange={this.onChange}
                        error={errors.date_assigned}
                        aria-describedby="emailHelp"
                    />
                    <div className="form-group">
                        <div className="alert alert-primary" role="alert">
                            If unchanged, Date assigned remains {new Date(date_assigned).toDateString()}
                        </div>
                        <button disabled={isLoading || invalid} className="btn btn-primary btn-sm"
                                type="submit">Update
                        </button>
                        &nbsp;
                        <button disabled={isLoading || invalid} className="btn btn-secondary btn-sm"
                                type="submit" onClick={this.onCancelUpdateResponsibilityForm}>Cancel
                        </button>

                    </div>
                </form>
            </div>
        // let relieved_date = false
        const showAdd =() => {
            // if(responsibilities.length>0){
            //     console.log(responsibilities," sorted")
            //     console.log(responsibilities[0].date_relieved)
            //   return responsibilities[0].date_relieved
            // }

             responsibilities.map(responsibility => {
                if (responsibility.school_upi === teacher.posting_history.current_school)
                    if (responsibility.active) {
                        console.log("cow")
                        return false
                    }
                //
                // }
            })
            console.log("goat")
            return true
        }
        // console.log(relieved_date)
        return (
            <div>
                {showAdd() ?
                    !this.props.deceased ? this.school_upi || this.role === 'system' ?
                        <button className="btn btn-sm btn-info" hidden={showResponsibilityForm}
                                onClick={this.addResponsibility}>Add responsibility
                        </button> : '' : '' : ''}
                {showResponsibilityForm ? responsibilityForm : ''}
                {showUpdateResponsibilityForm ? updateResponsibilityForm : ''}
                {responsibilities.length > 0 ? <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Responsibility</th>
                        <th scope="col">School</th>
                        <th scope="col">Date assigned</th>
                        <th scope="col">Date relieved</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {responsibilities.map((responsibility, i) => (
                        <Responsibility responsibility={responsibility} count={count++} key={i} onEdit={this.onEdit}
                                        onRelieve={this.onRelieve} relieved={relieved}/>))}
                    </tbody>
                </table> : <h6>No responsibilities found</h6>}
            </div>
        )
    }
}

ResponsibilitiesList.propTypes = {
    addResponsibility: PropTypes.func.isRequired,
    clearResponsibilities: PropTypes.func.isRequired,
    getResponsibilities: PropTypes.func.isRequired,
    registerResponsibility: PropTypes.func.isRequired,
    teacher: PropTypes.object.isRequired,
    removeResponsibility: PropTypes.func.isRequired,
    updateResponsibility: PropTypes.func.isRequired,
    getSchoolCategory: PropTypes.func.isRequired,
    relieveResponsibility: PropTypes.func.isRequired,
    deceased: PropTypes.bool,
    retired: PropTypes.bool,
}

function mapStateToProps(state) {
    return {
        responsibilities: state.responsibilityReducers
    }
}

export default connect(mapStateToProps, {
    clearResponsibilities,
    addResponsibility,
    getResponsibilities, registerResponsibility,
    removeResponsibility, updateResponsibility, relieveResponsibility, getSchoolCategory, updateResponsibilityOnList
})(ResponsibilitiesList)