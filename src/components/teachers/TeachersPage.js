import React from 'react'
import PropTypes from 'prop-types'
import Teacher from "./Teacher"
import {addTeacher, clearTeachers, getSchoolTeachers, getTeachers} from "../../actions/teacherActions"
import connect from "react-redux/es/connect/connect"
import Menu from "../admin-dashboard/Menu"
import NewTeacherForm from "./NewTeacherForm"
import ViewTeacher from "./ViewTeacher"
import jwt from 'jsonwebtoken'
import SchoolAdminMenu from "../school-admin-dashboard/SchoolAdminMenu"
import RetiredTeachersList from "./RetiredTeachersList"
import DeceasedTeachersList from "./DeceasedTeachersList"
import TeachersList from "./TeachersList"

class TeachersPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            life: 'working',
            role: '',
            showNewTeacherModal: false,
        }
        if (window.location.pathname === '/admin/teachers') {
            this.state.role = 'system'
        }
        else if (window.location.pathname === '/school_admin/teachers') {
            this.state.role = 'school'
        }
        this.onShowNewTeacherModal = this.onShowNewTeacherModal.bind(this)
        this.onCloseNewTeacherModal = this.onCloseNewTeacherModal.bind(this)
        this.onChange = this.onChange.bind(this)

        this.filter = this.filter.bind(this)
    }

    onChange(e) {
        const {teachers} = this.state
        let arr_results = []
        for (let i = 0; i < teachers.length; i++) {
            let exp = new RegExp(e.target.value, 'i')
            if (teachers[i].tsc.match(exp)) {
                arr_results.push(teachers[i])
                this.props.addTeacher(teachers[i])
            }
        }
    }

    onShowNewTeacherModal() {
        this.setState({showNewTeacherModal: true})

    }

    onCloseNewTeacherModal() {
        if (this.state.life !== 'working') {
            this.props.clearTeachers()
            this.setState({life: "working"})
        }
        this.setState({showNewTeacherModal: false})
    }

    filter(e) {
        e.preventDefault()
        this.props.clearTeachers()
        this.setState({life: e.target.name})
    }

    render() {
        const {life, role, showNewTeacherModal} = this.state
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        {role ? role === 'system' ? <Menu/> : <SchoolAdminMenu/> : ''}
                    </div>
                    <div className="col-md-9">
                        <br/>
                        <br/>
                        <div className="row">
                            <div className="col-sm-6">
                                <form>
                                    <div className="input-group">
                                        <input type="text" className="form-control"
                                               placeholder="Search Teacher TSC Number"
                                               aria-label="Search Teacher TSC Number" aria-describedby="basic-addon1"
                                               onChange={this.onChange}/>
                                        <span className="input-group-addon" id="basic-addon1"><i
                                            className="fa fa-search"></i></span>
                                    </div>
                                </form>
                            </div>
                            <div className="col-sm-2 offset-sm-1">
                                <button className="btn btn-sm btn-info" onClick={this.onShowNewTeacherModal}>Register
                                    new teacher
                                </button>
                            </div>
                            <div className="col-sm-2 ">
                               <span className="dropdown">
                        <button className="btn btn-sm btn-primary dropdown-toggle" type="button"
                                id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                           Filter
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="" onClick={this.filter} name="working">Working</a>
                                   <a className="dropdown-item" href="" onClick={this.filter} name="retired">Retired</a>
                            <a className="dropdown-item" href="" onClick={this.filter} name="deceased">Deceased</a>
                        </div>
                    </span>
                            </div>
                        </div>
                        <br/>
                        {life === 'working' ? <TeachersList/> : life === 'retired' ?
                            <RetiredTeachersList/> : life === 'deceased' ? <DeceasedTeachersList/> : ''}
                    </div>
                </div>
                <NewTeacherForm show={showNewTeacherModal} onClose={this.onCloseNewTeacherModal}
                                addTeacher={this.props.addTeacher} />
            </div>)
    }

}

TeachersPage.propTypes = {
    // addTeacher: PropTypes.func.isRequired,
    // getTeachers: PropTypes.func.isRequired,
    clearTeachers: PropTypes.func.isRequired,
    // teachers: PropTypes.array.isRequired,
    // getSchoolTeachers: PropTypes.func.isRequired,

}

// function mapStateToProps(state) {
//     return {teachers: state.teacherReducers}
// }

export default connect(null, {clearTeachers,})(TeachersPage)

