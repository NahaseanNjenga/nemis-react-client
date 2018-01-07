import React from 'react'
import PropTypes from 'prop-types'
import Teacher from "./Teacher"
import {addTeacher, getTeachers} from "../../actions/teacherActions"
import connect from "react-redux/es/connect/connect"
import Menu from "../Menu"
import NewTeacherForm from "./NewTeacherForm"
import ViewTeacher from "./ViewTeacher"
class TeachersList extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            showNewTeacherModal: false,
        }
        this.onShowNewTeacherModal = this.onShowNewTeacherModal.bind(this)
        this.onCloseNewTeacherModal = this.onCloseNewTeacherModal.bind(this)
    }
    componentDidMount() {
        this.props.getTeachers().then(teachers => {
            if (teachers) {
                teachers.data.map(teacher => {
                    this.props.addTeacher(teacher)
                })
            } else {
                //No schools message
            }
        })
    }

    onShowNewTeacherModal() {
        this.setState({showNewTeacherModal: true})

    }

    onCloseNewTeacherModal() {
        this.setState({showNewTeacherModal: false})
    }
    render(){
        const {teachers}=this.props
        const {showNewTeacherModal} = this.state
        let count=1
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <Menu/>
                    </div>
                    <div className="col-md-9">
                        <br/>
                        <br/>
                        <div className="row">
                            <div className="col-sm-6">
                                <form>
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Search Teacher TSC Number"
                                               aria-label="Search Teacher UPI" aria-describedby="basic-addon1"/>
                                        <span className="input-group-addon" id="basic-addon1"><i
                                            className="fa fa-search"></i></span>
                                    </div>
                                </form>
                            </div>
                            <div className="col-sm-2 offset-sm-1">
                                <button className="btn btn-sm btn-info" onClick={this.onShowNewTeacherModal}>Register new teacher</button>
                            </div>
                        </div>
                        <br/>
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">TSC Number</th>
                                <th scope="col">Surname</th>
                                <th scope="col">Firstname</th>
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
TeachersList.propTypes={
    addTeacher: PropTypes.func.isRequired,
    getTeachers: PropTypes.func.isRequired,
    teachers: PropTypes.array.isRequired
}
function mapStateToProps(state) {
    return {teachers: state.teacherReducers}
}

export default connect(mapStateToProps, {addTeacher, getTeachers})(TeachersList)

