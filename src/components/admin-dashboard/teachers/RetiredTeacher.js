import React from 'react'
import PropTypes from 'prop-types'
import ViewTeacher from "./ViewTeacher"

class RetiredTeacher extends React.Component {
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
        const {showViewTeacherModal} = this.state
        return (
            <tr>
                <th scope="row">{count}</th>
                <td>{teacher.teacher_id.tsc}</td>
                <td><a href="" onClick={this.onViewTeacher}>{teacher.teacher_id.surname}</a></td>
                <td>{teacher.teacher_id.first_name}</td>
                <td>{new Date(teacher.date_retired).toDateString()}</td>

                <ViewTeacher show={showViewTeacherModal} onClose={this.onCloseViewTeacher} teacher={this.props.teacher.teacher_id} deceased={false} retired={true}/>
            </tr>

        )
    }
}

RetiredTeacher.propTypes = {
    teacher: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
}

export default RetiredTeacher