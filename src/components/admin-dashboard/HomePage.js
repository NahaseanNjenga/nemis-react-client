import React from 'react'
import SearchResults from "../search/SearchResults"
import {isEmpty} from "lodash"
import validator from "validator"
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {searchStudentName, searchStudentUpi} from "../../actions/studentActions"
import {searchTeacherName, searchTeacherTsc} from "../../actions/teacherActions"
import {searchSchoolCounty, searchSchoolName, searchSchoolUpi} from "../../actions/schoolActions"


class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            results: [],
            query:'',
            search: '',
            category: '',
            error: '',
            table:'',
            schoolCategory: false,
            teacherCategory: false,
            studentCategory: false,
            isLoading: false,
            invalid: false
        }

        this.onChange = this.onChange.bind(this)
        this.isValid = this.isValid.bind(this)
        this.validateInput = this.validateInput.bind(this)
        this.onSearch = this.onSearch.bind(this)
        this.onStudent = this.onStudent.bind(this)
    }

    validateInput(data) {
        let error
        if (validator.isEmpty(data.query)) {
            error = 'This field is required'
        }
        return {
            error,
            isValid: isEmpty(error)
        }
    }

    isValid() {
        const {error, isValid} = this.validateInput(this.state)
        if (!isValid) {
            this.setState({error})
        }
        return isValid
    }

    onChange(e) {
        e.preventDefault()
        this.setState({[e.target.name]: e.target.value})
    }

    onSearch(e) {
        e.preventDefault()
        // if (this.isValid()) {
            this.setState({error: '', isLoading: true})
            const {search, category} = this.state
            switch (search) {
                case "student":
                    this.setState({table:'students'})
                    switch (category) {
                        case "student_name":
                            this.props.searchStudentName(this.state.query).then(
                                (student) => {
                                    if (student.data) {
                                        this.setState({results: student.data,table:'students'})
                                    }
                                    else {
                                        this.setState({results: 'No results found'})
                                    }
                                },
                                err => this.setState({error: err.response.data, isLoading: false})
                            )
                            break
                        case "student_upi":
                            this.props.searchStudentUpi(this.state.query).then(
                                (student) => {
                                    if (student.data) {
                                        this.setState({results: student.data,table:'students'})
                                    }
                                    else {
                                        this.setState({results: 'No results found'})
                                    }
                                },
                                err => this.setState({error: err.response.data, isLoading: false})
                            )
                            break
                        default:
                            break
                    }
                    break
                case "teacher":
                    switch (category) {
                        case "teacher_name":
                            this.props.searchTeacherName(this.state.query).then(
                                (teacher) => {
                                    if (teacher.data) {
                                        this.setState({results: teacher.data,table:'teachers'})
                                    }
                                    else {
                                        this.setState({results: 'No results found'})
                                    }
                                },
                                err => this.setState({error: err.response.data, isLoading: false})
                            )
                            break
                        case "tsc_number":
                            this.props.searchTeacherTsc(this.state.query).then(
                                (teacher) => {
                                    if (teacher.data) {
                                        this.setState({results: teacher.data,table:'teachers'})
                                    }
                                    else {
                                        this.setState({results: 'No results found'})
                                    }
                                },
                                err => this.setState({error: err.response.data, isLoading: false})
                            )
                            break
                        default:
                            break
                    }
                    break
                case "school":
                    switch (category) {
                        case "school_name":
                            this.props.searchSchoolName(this.state.query).then(
                                (school) => {
                                    if (school.data) {
                                        this.setState({results: school.data,table:'schools'})
                                    }
                                    else {
                                        this.setState({results: 'No results found'})
                                    }
                                },
                                err => this.setState({error: err.response.data, isLoading: false})
                            )
                            break
                        case "school_upi":
                            this.props.searchSchoolUpi(this.state.query).then(
                                (school) => {
                                    if (school.data) {
                                        this.setState({results: school.data,table:'schools'})
                                    }
                                    else {
                                        this.setState({results: 'No results found'})
                                    }
                                },
                                err => this.setState({error: err.response.data, isLoading: false})
                            )
                            break
                        case "school_county":
                            this.props.searchSchoolCounty(this.state.query).then(
                                (school) => {
                                    if (school.data) {
                                        this.setState({results: school.data,table:'schools'})
                                    }
                                    else {
                                        this.setState({results: 'No results found'})
                                    }
                                },
                                err => this.setState({error: err.response.data, isLoading: false})
                            )
                            break
                        default:
                            break
                    }
                    break
                default:
                    break

            }

        // }
    }


    onStudent(e) {

    }

    render() {
        const {results, error,table} = this.state
        return (
            <div className="container">
                <div className="col-sm-6 offset-sm-3 centered">
                    <form onSubmit={this.onSearch}>
                        <div className=" input-group">
                            <input type="text" className="form-control"
                                   placeholder="Search Students, Teachers, Schools "
                                   aria-label="Search Teacher TSC Number" aria-describedby="basic-addon1"
                                   onChange={this.onChange} name="query"/>
                            <span className="input-group-addon" onClick={this.onSearch} id="basic-addon1"><i
                                className="fa fa-search"></i></span>
                            {/*<TextFieldGroup name="upi" label="Search student UPI" type="text" onChange={this.onChange}*/}
                            {/*autofocus={true} errorr={error.upi}/>*/}
                        </div>
                        {/*<div className="form-check">*/}
                        <div className="form-row align-items-center">
                            <div className=" col-md-4 my-1">
                                <input className="" type="radio" name="search" id="student"
                                       value="student" onChange={this.onChange}/>
                                <label className="form-check-label" htmlFor="student">
                                    Students
                                </label>
                                &nbsp;
                                <select name="category" onChange={this.onChange}>
                                    <option >Select</option>
                                    <option value="student_upi">UPI</option>
                                    <option value="student_name">Name</option>
                                </select>
                            </div>
                            <div className=" col-md-4 my-1">
                                <input className="" type="radio" name="search" id="teacher"
                                       value="teacher" onChange={this.onChange}/>
                                <label className="form-check-label" htmlFor="teacher">
                                    Teachers
                                </label>
                                &nbsp;
                                <select name="category" onChange={this.onChange} >
                                    <option >Select</option>
                                    <option value="tsc_number">TSC Number</option>
                                    <option value="teacher_name">Name</option>
                                </select>
                            </div>
                            <div className=" col-md-4 my-1">
                                <input className="" type="radio" name="search" id="school"
                                       value="school" onChange={this.onChange}/>
                                <label className="form-check-label" htmlFor="school">
                                    Schools
                                </label>
                                &nbsp;
                                <select name="category" onChange={this.onChange} >
                                    <option >Select</option>
                                    <option value="school_upi">UPI</option>
                                    <option value="school_name">Name</option>
                                    <option value="school_county">County</option>
                                </select>
                            </div>
                        </div>

                        {error && <div className="invalid-feedback">{error}</div>}
                    </form>
                    <br/>

                    {results ? <SearchResults results={results} table={table}/> : ''}
                </div>
            </div>
        )

    }
}

HomePage.propTypes = {
    searchStudentUpi: PropTypes.func.isRequired,
    searchStudentName: PropTypes.func.isRequired,
    searchTeacherName: PropTypes.func.isRequired,
    searchTeacherTsc: PropTypes.func.isRequired,
    searchSchoolUpi: PropTypes.func.isRequired,
    searchSchoolName: PropTypes.func.isRequired,
    searchSchoolCounty: PropTypes.func.isRequired,
}
export default connect(null, {searchStudentUpi,searchStudentName,searchTeacherName,searchTeacherTsc,searchSchoolUpi, searchSchoolName, searchSchoolCounty})(HomePage)