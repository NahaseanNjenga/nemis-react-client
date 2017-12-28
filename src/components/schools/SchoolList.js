import React from 'react'
import PropTypes from 'prop-types'
import School from "./School"
import {addSchool, getSchools} from "../../actions/schoolActions"
import connect from "react-redux/es/connect/connect"
import Menu from "../Menu"
import NewSchoolForm from "./NewSchoolForm"
import ViewSchool from "./ViewSchool"
class SchoolList extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            showNewSchoolModal: false,
        }
        this.onShowNewSchoolModal = this.onShowNewSchoolModal.bind(this)
        this.onCloseNewSchoolModal = this.onCloseNewSchoolModal.bind(this)
    }
    componentDidMount() {
        this.props.getSchools().then(schools => {
            if (schools) {
                schools.data.map(school => {
                    this.props.addSchool(school)
                })
            } else {
                //No schools message
            }
        })
    }

    onShowNewSchoolModal() {
        this.setState({showNewSchoolModal: true})

    }

    onCloseNewSchoolModal() {
        this.setState({showNewSchoolModal: false})
    }
    render(){
        const {schools}=this.props
        const {showNewSchoolModal} = this.state
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
                                        <input type="text" className="form-control" placeholder="Search School UPI"
                                               aria-label="Search School UPI" aria-describedby="basic-addon1"/>
                                        <span className="input-group-addon" id="basic-addon1"><i
                                            className="fa fa-search"></i></span>
                                    </div>
                                </form>
                            </div>
                            <div className="col-sm-2 offset-sm-1">
                                <button className="btn btn-sm btn-info" onClick={this.onShowNewSchoolModal}>Register new school</button>
                            </div>
                        </div>
                        <br/>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">UPI</th>
                    <th scope="col">Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">County</th>
                </tr>
                </thead>
                <tbody>
                {schools.map((school, i) => {
                    console.log(school)
                    return <School count={count++} school={school} key={i}/>
                })}
                </tbody>
            </table>
                    </div>
                </div>
                <NewSchoolForm show={showNewSchoolModal} onClose={this.onCloseNewSchoolModal}
                               addSchool={this.props.addSchool}/>

            </div>)
    }

}
SchoolList.propTypes={
    addSchool: PropTypes.func.isRequired,
    getSchools: PropTypes.func.isRequired,
    schools: PropTypes.array.isRequired
}
function mapStateToProps(state) {
    return {schools: state.schoolReducers}
}

export default connect(mapStateToProps, {addSchool, getSchools})(SchoolList)
