import React from 'react'
import PropTypes from 'prop-types'
import Teacher from "./Teacher"
import {
    addTeacher, clearTeachers, getSchoolTeachers, getDeceasedTeachers,
    getTransferredSchoolTeachers
} from "../../actions/teacherActions"
import connect from "react-redux/es/connect/connect"
import NewTeacherForm from "./NewTeacherForm"
import jwt from 'jsonwebtoken'
import DeceasedTeacher from "./DeceasedTeacher"
import TransferredTeacher from "./TransferredTeacher"

class TransferredTeachersList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showNewTeacherModal: false,
            role: '',
            teachers: '',
            upi: ''
        }
        const token = jwt.decode(localStorage.schoolAdminJwtToken)
        this.state.upi = token.school_upi
        this.props.clearTeachers()
        this.onChange = this.onChange.bind(this)

    }

    onChange(e) {
        const {teachers} = this.state
        let arr_results = []
        this.props.clearTeachers()
        for (let i = 0; i < teachers.length; i++) {
            let exp = new RegExp(e.target.value, 'i')
            if (teachers[i].tsc.match(exp)) {
                arr_results.push(teachers[i])
                this.props.addTeacher(teachers[i])
            }
        }
    }

    componentDidMount() {
        if (window.location.pathname === '/school_admin/teachers') {

            this.props.getTransferredSchoolTeachers(this.state.upi).then(teachers => {
        this.props.clearTeachers()
                if (teachers) {
                    teachers.data.map(teacher => {
                        this.props.addTeacher(teacher)
                    })
                    this.setState({role: 'school', teachers: teachers.data})
                } else {
                    //No schools message
                }
            })

        }
    }

    //
    // onShowNewTeacherModal() {
    //     this.setState({showNewTeacherModal: true})
    //
    // }
    //
    // onCloseNewTeacherModal() {
    //     this.setState({showNewTeacherModal: false})
    // }
    // addToTeachers(teacher){
    //     this.setState({teachers:teacher,...this.state.teachers})
    //
    // }
    // filter(e){
    //     e.preventDefault()
    // }

    render() {
        const {teachers} = this.props
        let count = 1
        return (
            <div>
                <h1>Transferred Teachers</h1>
                {teachers.length > 0 ?
                    <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">TSC Id</th>
                        <th scope="col">Picture</th>
                        <th scope="col">Surname</th>
                        <th scope="col">Date of Clearance</th>
                    </tr>
                    </thead>
                    <tbody>
                    {teachers.length > 0 ? teachers.map((teacher, i) => {
                        return <TransferredTeacher school_upi={this.state.upi} count={count++} teacher={teacher}
                                                   key={i}/>
                    }) : ''}
                    </tbody>
                </table> : 'No transferred teachers found'}
            </div>)
    }

}

TransferredTeachersList.propTypes = {
    addTeacher: PropTypes.func.isRequired,
    clearTeachers: PropTypes.func.isRequired,
    teachers: PropTypes.array.isRequired,
    getSchoolTeachers: PropTypes.func.isRequired,
    getTransferredSchoolTeachers: PropTypes.func.isRequired,


}

function mapStateToProps(state) {
    return {teachers: state.teacherReducers}
}

export default connect(mapStateToProps, {
    addTeacher,
    clearTeachers,
    getDeceasedTeachers,
    getSchoolTeachers,
    getTransferredSchoolTeachers
})(TransferredTeachersList)

