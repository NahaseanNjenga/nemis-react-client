import React from 'react'
import PropTypes from 'prop-types'
import ViewTeacher from "./ViewTeacher"
import ViewPhoto from "../school-admin-dashboard/modals/ViewPhoto"

class TransferredTeachers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showViewTeacherModal: false,
            viewPhoto:false
        }
        this.onViewTeacher = this.onViewTeacher.bind(this)
        this.onCloseViewTeacher = this.onCloseViewTeacher.bind(this)
        this.onViewPhoto = this.onViewPhoto.bind(this)
        this.onCloseViewPhoto = this.onCloseViewPhoto.bind(this)
    }

    onViewTeacher(e) {
        e.preventDefault()
        this.setState({showViewTeacherModal: true})
    }

    onCloseViewTeacher(e) {
        this.setState({showViewTeacherModal: false})
    }
    onViewPhoto(e) {
        e.preventDefault()
        this.setState({viewPhoto: true})
    }

    onCloseViewPhoto(e) {
        this.setState({viewPhoto: false})
    }
    render() {
        const {teacher, count} = this.props
        const {showViewTeacherModal,viewPhoto} = this.state
        return (
            <tr>
                <th scope="row">{count}</th>
                <td>{teacher.picture? <img src={`/uploads/${teacher.picture.path}`} alt="Profile picture" className="rounded-circle photo" onClick={this.onViewPhoto} width="45" height="45"/>: <img src={`/uploads/default.png`} alt="Profile picture" className="rounded-circle" width="45" height="45"/>}</td>
                <td>{teacher.tsc}</td>
                <td><a href="" onClick={this.onViewTeacher}>{teacher.surname}</a></td>
                {
                    teacher.posting_history.previous_school.map(school => {
                        if (school.school_upi === this.props.school_upi) {
                            return <td>{new Date(school.clearance_date).toDateString()}</td>
                        }
                    })
                }
                <ViewTeacher show={showViewTeacherModal} onClose={this.onCloseViewTeacher} teacher={teacher}
                             deceased={true}/>
                {teacher.picture? <ViewPhoto photo={teacher.picture} show={viewPhoto} onClose={this.onCloseViewPhoto}/>:''}
            </tr>

        )
    }
}

TransferredTeachers.propTypes = {
    teacher: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    school_upi: PropTypes.string.isRequired
}

export default TransferredTeachers