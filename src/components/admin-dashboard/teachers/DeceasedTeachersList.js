import React from 'react'
import PropTypes from 'prop-types'
import Teacher from "./Teacher"
import {
    addTeacher, clearTeachers, getSchoolTeachers, getDeceasedTeachers,
    getDeceasedSchoolTeachers
} from "../../../actions/teacherActions"
import connect from "react-redux/es/connect/connect"
import NewTeacherForm from "./NewTeacherForm"
import jwt from 'jsonwebtoken'
import DeceasedTeacher from "./DeceasedTeacher"

class DeceaseedTeachersList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showNewTeacherModal: false,
            role:'',
            teachers:''
        }
        this.props.clearTeachers()
        this.onChange = this.onChange.bind(this)

    }
    onChange(e) {
        const {teachers}= this.state
        let arr_results = []
        this.props.clearTeachers()
        for (let i = 0; i <teachers.length; i++) {
            let exp = new RegExp(e.target.value, 'i')
            if (teachers[i].tsc.match(exp)) {
                arr_results.push(teachers[i])
                this.props.addTeacher(teachers[i])
            }
        }
    }
    componentDidMount() {
        this.props.clearTeachers()
        if (window.location.pathname === '/admin/teachers') {
            this.props.getDeceasedTeachers().then(teachers => {
                if (teachers) {
                    teachers.data.map(teacher => {
                        this.props.addTeacher(teacher)
                    })
                    this.setState({role:'system',teachers:teachers.data})
                } else {
                    //No schools message
                }
            })
        }
        else if (window.location.pathname === '/school_admin/teachers') {
            const token = jwt.decode(localStorage.schoolAdminJwtToken)
            const upi = token.school_upi
            this.props.getDeceasedSchoolTeachers(upi).then(teachers=>{
                if (teachers) {
                    teachers.data.map(teacher => {
                        this.props.addTeacher(teacher)
                    })
                    this.setState({role:'school',teachers:teachers.data})
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
                        {teachers.length>0?<table className="table">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">TSC Id</th>
                                <th scope="col">Surname</th>
                                <th scope="col">First name</th>
                                <th scope="col">Date of Death</th>
                            </tr>
                            </thead>
                            <tbody>
                            {teachers.map((teacher, i) => {
                                return <DeceasedTeacher count={count++} teacher={teacher} key={i}/>
                            })}
                            </tbody>
                        </table>:'No deceased teachers found'}
            </div>)
    }

}
DeceaseedTeachersList.propTypes = {
    addTeacher: PropTypes.func.isRequired,
    getDeceasedTeachers: PropTypes.func.isRequired,
    clearTeachers: PropTypes.func.isRequired,
    teachers: PropTypes.array.isRequired,
    getSchoolTeachers: PropTypes.func.isRequired,
    getDeceasedSchoolTeachers: PropTypes.func.isRequired,


}

function mapStateToProps(state) {
    return {teachers: state.teacherReducers}
}

export default connect(mapStateToProps, {addTeacher, clearTeachers, getDeceasedTeachers, getSchoolTeachers,getDeceasedSchoolTeachers})(DeceaseedTeachersList)

