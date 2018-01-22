import React from 'react'
import PropTypes from 'prop-types'
import ViewTeacher from "./ViewTeacher"

class Teacher extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showViewTeacherModal: false,
        }
        this.onViewTeacher = this.onViewTeacher.bind(this)
        this.onCloseViewTeacher = this.onCloseViewTeacher.bind(this)

    }

    onViewTeacher(e) {
        e.preventDefault()
        this.setState({showViewTeacherModal: true})
    }

    onCloseViewTeacher(e) {
        this.setState({showViewTeacherModal: false})
    }

    render() {
        const { teacher,count} = this.props
        const {showViewTeacherModal, showUpdateTeacherModal} = this.state
        return (
            <tr>
                <th scope="row">{count}</th>
                <td>{teacher.tsc}</td>
                <td><a href="" onClick={this.onViewTeacher}>{teacher.surname}</a></td>
                <td>{teacher.first_name}</td>
                <td>{teacher.posting_history? new Date(teacher.posting_history.reporting_date).toDateString() : 'N/A'}</td>

                <ViewTeacher show={showViewTeacherModal} onClose={this.onCloseViewTeacher} teacher={this.props.teacher} deceased={false}/>
            </tr>

        )
    }
}

Teacher.propTypes = {
    teacher: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
}

export default Teacher