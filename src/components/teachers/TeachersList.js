import React from 'react'
import PropTypes from 'prop-types'
import Teacher from "./Teacher"
import {addTeacher, clearTeachers, getSchoolTeachers, getTeachers} from "../../actions/teacherActions"
import connect from "react-redux/es/connect/connect"
import Menu from "../Menu"
import NewTeacherForm from "./NewTeacherForm"
import ViewTeacher from "./ViewTeacher"
import jwt from 'jsonwebtoken'
import SchoolAdminMenu from "../school-admin-dashboard/SchoolAdminMenu"

class TeachersList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showNewTeacherModal: false,
            role:''
        }
        this.onShowNewTeacherModal = this.onShowNewTeacherModal.bind(this)
        this.onCloseNewTeacherModal = this.onCloseNewTeacherModal.bind(this)
    }

    componentDidMount() {
        this.props.clearTeachers()
        if (window.location.pathname === '/admin/teachers') {
            this.props.getTeachers().then(teachers => {
                if (teachers) {
                    teachers.data.map(teacher => {
                        this.props.addTeacher(teacher)
                    })
                    this.setState({role:'system'})
                } else {
                    //No schools message
                }
            })
        }
        else if (window.location.pathname === '/school_admin/teachers') {
            const token = jwt.decode(localStorage.schoolAdminJwtToken)
            const upi = token.school_upi
            console.log(token,upi)
            this.props.getSchoolTeachers(upi).then(teachers=>{
                if (teachers) {
                    teachers.data.map(teacher => {
                        this.props.addTeacher(teacher)
                    })
                    this.setState({role:'school'})
                } else {
                    //No schools message
                }
            })

        }
    }

    onShowNewTeacherModal() {
        this.setState({showNewTeacherModal: true})

    }

    onCloseNewTeacherModal() {
        this.setState({showNewTeacherModal: false})
    }

    render() {
        const {teachers} = this.props
        const {showNewTeacherModal,role} = this.state
        let count = 1
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        {role?role==='system'?<Menu/>:<SchoolAdminMenu/>:''}
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
                                               aria-label="Search Teacher UPI" aria-describedby="basic-addon1"/>
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
                        </div>
                        <br/>
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">TSC Number</th>
                                <th scope="col">Surname</th>
                                <th scope="col">First name</th>
                                <th scope="col">School UPI</th>
                            </tr>
                            </thead>
                            <tbody>
                            {teachers.map((teacher, i) => {
                                return <Teacher count={count++} teacher={teacher} key={i}/>
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <NewTeacherForm show={showNewTeacherModal} onClose={this.onCloseNewTeacherModal}
                                addTeacher={this.props.addTeacher}/>

            </div>)
    }

}

TeachersList.propTypes = {
    addTeacher: PropTypes.func.isRequired,
    getTeachers: PropTypes.func.isRequired,
    clearTeachers: PropTypes.func.isRequired,
    teachers: PropTypes.array.isRequired,
    getSchoolTeachers: PropTypes.func.isRequired,

}

function mapStateToProps(state) {
    return {teachers: state.teacherReducers}
}

export default connect(mapStateToProps, {addTeacher, clearTeachers, getTeachers, getSchoolTeachers})(TeachersList)

