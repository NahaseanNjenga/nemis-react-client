import React from 'react'
import PropTypes from 'prop-types'
import SchoolAdmin from "./SchoolAdmin"
import {addSchoolAdmin, getSchoolAdmins} from "../../actions/schoolAdminActions"
import connect from "react-redux/es/connect/connect"
import Menu from "../Menu"
import NewSchoolAdminForm from "./NewSchoolAdminForm"
import ViewSchoolAdmin from "./ViewSchoolAdmin"
class SchoolAdminList extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            showNewSchoolAdminModal: false,
        }
        this.onShowNewSchoolAdminModal = this.onShowNewSchoolAdminModal.bind(this)
        this.onCloseNewSchoolAdminModal = this.onCloseNewSchoolAdminModal.bind(this)
    }
    componentDidMount() {
        this.props.getSchoolAdmins().then(schoolAdmins => {
            if (schoolAdmins.data.length>0) {
                schoolAdmins.data.map(schoolAdmin => {
                    this.props.addSchoolAdmin(schoolAdmin)
                })
            } else {
                //No schoolAdmins message
            }
        })
    }

    onShowNewSchoolAdminModal() {
        this.setState({showNewSchoolAdminModal: true})

    }

    onCloseNewSchoolAdminModal() {
        this.setState({showNewSchoolAdminModal: false})
    }
    render(){
        const {schoolAdmins}=this.props
        const {showNewSchoolAdminModal} = this.state
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
                                        <input type="text" className="form-control" placeholder="Search SchoolAdmin UPI"
                                               aria-label="Search SchoolAdmin Username" aria-describedby="basic-addon1"/>
                                        <span className="input-group-addon" id="basic-addon1"><i
                                            className="fa fa-search"></i></span>
                                    </div>
                                </form>
                            </div>
                            <div className="col-sm-2 offset-sm-1">
                                <button className="btn btn-sm btn-info" onClick={this.onShowNewSchoolAdminModal}>Register new schoolAdmin</button>
                            </div>
                        </div>
                        <br/>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">School UPI</th>
                    <th scope="col">Username</th>
                </tr>
                </thead>
                <tbody>
                {schoolAdmins.map((schoolAdmin, i) => {
                    return <SchoolAdmin count={count++} schoolAdmin={schoolAdmin} key={i}/>
                })}
                </tbody>
            </table>
                    </div>
                </div>
                <NewSchoolAdminForm show={showNewSchoolAdminModal} onClose={this.onCloseNewSchoolAdminModal}
                               addSchoolAdmin={this.props.addSchoolAdmin}/>


            </div>)
    }

}
SchoolAdminList.propTypes={
    addSchoolAdmin: PropTypes.func.isRequired,
    getSchoolAdmins: PropTypes.func.isRequired,
    schoolAdmins: PropTypes.array.isRequired
}
function mapStateToProps(state) {
    return {schoolAdmins: state.schoolAdminReducers}
}

export default connect(mapStateToProps, {addSchoolAdmin, getSchoolAdmins})(SchoolAdminList)
