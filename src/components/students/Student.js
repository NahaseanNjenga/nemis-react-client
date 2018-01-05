import React from 'react'
import PropTypes from 'prop-types'
import ViewStudent from "./ViewStudent"

class Student extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showViewStudentModal: false,
        }
        this.onViewStudent = this.onViewStudent.bind(this)
        this.onCloseViewStudent = this.onCloseViewStudent.bind(this)

    }



    onViewStudent(e) {
        e.preventDefault()
        this.setState({showViewStudentModal: true})
    }

    onCloseViewStudent(e) {
        this.setState({showViewStudentModal: false})
    }

    render() {
        const { student,count} = this.props
        const {showViewStudentModal, showUpdateStudentModal} = this.state
        return (
            <tr>
                <th scope="row">{count}</th>
                <td>{student.upi}</td>
                <td><a href="" onClick={this.onViewStudent}>{student.surname}</a></td>
                <td>{student.first_name}</td>
                <td>{student.transfers.current_school}</td>

                <ViewStudent show={showViewStudentModal} onClose={this.onCloseViewStudent} student={this.props.student}/>
            </tr>

        )
    }
}

Student.propTypes = {
    student: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
}

export default Student