import React from 'react'
import PropTypes from 'prop-types'
import Student from "./Student"
import {
    addStudent, clearStudents, getStudents, getSchoolStudents,
    getSchoolCandidates
} from "../../actions/studentActions"
import connect from "react-redux/es/connect/connect"
import Menu from "../admin-dashboard/Menu"
import NewStudentForm from "./NewStudentForm"
import SchoolAdminMenu from "../school-admin-dashboard/SchoolAdminMenu"
import jwt from "jsonwebtoken"


class StudentsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showNewStudentModal: false,
            role: '',
            students: ''
        }
        this.state.role='knec'
        this.onShowNewStudentModal = this.onShowNewStudentModal.bind(this)
        this.onCloseNewStudentModal = this.onCloseNewStudentModal.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        const {students} = this.state
        let arr_results = []
        this.props.clearStudents()
        for (let i = 0; i < students.length; i++) {
            let exp = new RegExp(e.target.value, 'i')
            if (students[i].upi.match(exp)) {
                arr_results.push(students[i])
                this.props.addStudent(students[i])
            }
        }
    }

    componentDidMount() {
        this.props.clearStudents()
        if (window.location.pathname === '/admin/students') {
            this.props.getStudents().then(students => {
                if (students) {
                    students.data.map(student => {
                        this.props.addStudent(student)
                    })
                    this.setState({role: 'system', students: students.data})
                } else {
                    //No schools message
                }
            })
        }
        else if (window.location.pathname === '/school_admin/students') {
            const token = jwt.decode(localStorage.schoolAdminJwtToken)
            const upi = token.school_upi
            this.props.getSchoolStudents(upi).then(students => {
                if (students) {
                    students.data.map(student => {
                        this.props.addStudent(student)
                    })
                    this.setState({role: 'school', students: students.data})
                } else {
                    //No schools message
                }
            })
        }
        // else if (window.location.pathname === '/') {
        //     console.log('reacherd here')
        //     this.props.students.map(student => {
        //         this.props.addStudent(student)
        //     })
        //     this.setState({students: this.props.students})
        // }

        else {
            const upi = window.location.pathname.split('/')[2]

            this.props.getSchoolCandidates(upi).then(students => {
                if (students) {
                    students.data.map(student => {
                        this.props.addStudent(student)
                    })
                    this.setState({ students: students.data})
                } else {
                    //No schools message
                }
            })
        }

    }

    onShowNewStudentModal() {
        this.setState({showNewStudentModal: true})

    }

    onCloseNewStudentModal() {
        this.setState({showNewStudentModal: false})
    }

    render() {
        const {students} = this.props
        const {showNewStudentModal, role} = this.state
        let count = 1
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        {role ? role === 'system' ? <Menu/> : <SchoolAdminMenu/> : ''}
                    </div>
                    <div className="col-md-9">
                        <br/>
                        <br/>
                            {role==='knec'?<h1>List of all candidates in a given school</h1>:role==='system'?<h1>List of all students in the country</h1>:''}
                        <div className="row">
                            <br/>
                            <br/>
                            <div className="col-sm-6">

                                <form>
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Search Student UPI"
                                               aria-label="Search Student UPI" aria-describedby="basic-addon1"
                                               onChange={this.onChange}/>
                                        <span className="input-group-addon" id="basic-addon1"><i
                                            className="fa fa-search"></i></span>
                                    </div>
                                </form>
                            </div>

                            {role ? role === 'system'||role === 'school' ? <div className="col-sm-2 offset-sm-1">
                                <button className="btn btn-sm btn-info" onClick={this.onShowNewStudentModal}>Register new student</button></div> : '':''}
                        </div>
                        <br/>
                        {students.length > 0 ? <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Picture</th>
                                <th scope="col">UPI</th>
                                <th scope="col">Surname</th>
                                <th scope="col">Firstname</th>
                                <th scope="col">School UPI</th>
                            </tr>
                            </thead>
                            <tbody>
                            {students.map((student, i) => {
                                return <Student count={count++} student={student} key={i}/>
                            })}
                            </tbody>
                        </table> : 'No students found'}
                    </div>
                </div>
                <NewStudentForm show={showNewStudentModal} onClose={this.onCloseNewStudentModal}
                                addStudent={this.props.addStudent}/>
            </div>)
    }
}

StudentsList.propTypes = {
    addStudent: PropTypes.func.isRequired,
    getStudents: PropTypes.func.isRequired,
    getSchoolStudents: PropTypes.func.isRequired,
    clearStudents: PropTypes.func.isRequired,
    students: PropTypes.array.isRequired

}

function mapStateToProps(state) {
    return {students: state.studentReducers}
}

export default connect(mapStateToProps, {
    addStudent,
    getStudents,
    getSchoolStudents,
    clearStudents,
    getSchoolCandidates
})(StudentsList)

