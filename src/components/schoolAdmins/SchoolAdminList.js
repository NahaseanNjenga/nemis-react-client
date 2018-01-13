import React from 'react'
import PropTypes from 'prop-types'
import SchoolAdmin from "./SchoolAdmin"
import {addSchoolAdmin, clearSchoolAdmins, getSchoolAdmins} from "../../actions/schoolAdminActions"
import connect from "react-redux/es/connect/connect"
import Menu from "../Menu"
import NewSchoolAdminForm from "./NewSchoolAdminForm"
import ViewSchoolAdmin from "./ViewSchoolAdmin"

class SchoolAdminList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showNewSchoolAdminModal: false,
            schoolAdmins:''
        }
        this.onShowNewSchoolAdminModal = this.onShowNewSchoolAdminModal.bind(this)
        this.onCloseNewSchoolAdminModal = this.onCloseNewSchoolAdminModal.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
        this.props.clearSchoolAdmins()
        this.props.getSchoolAdmins().then(schoolAdmins => {
            if (schoolAdmins.data.length > 0) {
                schoolAdmins.data.map(schoolAdmin => {
                    this.props.addSchoolAdmin(schoolAdmin)
                })
                this.setState({schoolAdmins:schoolAdmins.data})
            } else {
                //No schoolAdmins message
            }
        })
    }
    onChange(e) {
        const {schoolAdmins}= this.state
        let arr_results = []
        console.log(schoolAdmins.length)
        this.props.clearSchoolAdmins()
        for (let i = 0; i <schoolAdmins.length; i++) {
            let exp = new RegExp(e.target.value, 'i')
            if (schoolAdmins[i].school_upi.match(exp)) {
                arr_results.push(schoolAdmins[i])
                this.props.addSchoolAdmin(schoolAdmins[i])
            }
        }
    }

    onShowNewSchoolAdminModal() {
        this.setState({showNewSchoolAdminModal: true})

    }

    onCloseNewSchoolAdminModal() {
        this.setState({showNewSchoolAdminModal: false})
    }

    render() {
        const {schoolAdmins} = this.props
        const {showNewSchoolAdminModal} = this.state
        let count = 1
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
                                        <input type="text" className="form-control" placeholder="Search School UPI"
                                               aria-label="Search School"
                                               aria-describedby="basic-addon1" onChange={this.onChange}/>
                                        <span className="input-group-addon" id="basic-addon1"><i
                                            className="fa fa-search"></i></span>
                                    </div>
                                </form>
                            </div>
                            <div className="col-sm-2 offset-sm-1">
                                <button className="btn btn-sm btn-info"
                                        onClick={this.onShowNewSchoolAdminModal}>Register new schoolAdmin
                                </button>
                            </div>
                        </div>
                        <br/>
                        {schoolAdmins.length>0?   <table className="table">
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
                        </table>:'No school admins found'}
                    </div>
                </div>
                <NewSchoolAdminForm show={showNewSchoolAdminModal} onClose={this.onCloseNewSchoolAdminModal}
                                    addSchoolAdmin={this.props.addSchoolAdmin}/>


            </div>)
    }

}

SchoolAdminList.propTypes = {
    addSchoolAdmin: PropTypes.func.isRequired,
    getSchoolAdmins: PropTypes.func.isRequired,
    clearSchoolAdmins: PropTypes.func.isRequired,
    schoolAdmins: PropTypes.array.isRequired
}

function mapStateToProps(state) {
    return {schoolAdmins: state.schoolAdminReducers}
}

export default connect(mapStateToProps, {addSchoolAdmin, getSchoolAdmins, clearSchoolAdmins})(SchoolAdminList)
