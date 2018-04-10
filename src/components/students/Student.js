import React from 'react'
import PropTypes from 'prop-types'
import ViewStudent from "./ViewStudent"
import ViewPhoto from "../school-admin-dashboard/modals/ViewPhoto"

class Student extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showViewStudentModal: false,
            viewPhoto:false
        }
        this.onViewStudent = this.onViewStudent.bind(this)
        this.onCloseViewStudent = this.onCloseViewStudent.bind(this)
        this.onViewPhoto = this.onViewPhoto.bind(this)
        this.onCloseViewPhoto = this.onCloseViewPhoto.bind(this)

    }



    onViewStudent(e) {
        e.preventDefault()
        this.setState({showViewStudentModal: true})
    }

    onCloseViewStudent(e) {
        this.setState({showViewStudentModal: false})
    }
    onViewPhoto(e) {
        e.preventDefault()
        this.setState({viewPhoto: true})
    }

    onCloseViewPhoto(e) {
        this.setState({viewPhoto: false})
    }

    render() {
        const { student,count} = this.props
        const {showViewStudentModal, showUpdateStudentModal,viewPhoto} = this.state
        return (
            <tr>
                <th scope="row">{count}</th>
                <td>{student.picture? <img src={`/uploads/${student.picture.path}`} alt="Profile picture" className="rounded-circle photo" onClick={this.onViewPhoto} width="55" height="55"/>: <img src={`/uploads/default.png`} alt="Profile picture" className="rounded-circle" width="55" height="55"/>}</td>
                <td>{student.upi}</td>
                <td><a href="" onClick={this.onViewStudent}>{student.surname}</a></td>
                <td>{student.first_name}</td>
                <td>{student.transfers?student.transfers.current_school:'N/A'}</td>

                <ViewStudent show={showViewStudentModal} onClose={this.onCloseViewStudent} student={this.props.student}/>
                {student.picture? <ViewPhoto photo={student.picture} show={viewPhoto} onClose={this.onCloseViewPhoto}/>:''}
            </tr>

        )
    }
}

Student.propTypes = {
    student: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
}

export default Student