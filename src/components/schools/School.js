import React from 'react'
import Menu from "../Menu"
import NewSchoolForm from "./NewSchoolForm"
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {addSchool, getSchools} from "../../actions/schoolActions"
import ViewSchool from "./ViewSchool"



class Schools extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showNewSchoolModal: false,
            showViewSchoolModal:false,
            school:'',
        }
        this.onShowNewSchoolModal = this.onShowNewSchoolModal.bind(this)
        this.onCloseNewSchoolModal = this.onCloseNewSchoolModal.bind(this)
        this.onViewSchool = this.onViewSchool.bind(this)
        this.onCloseViewSchool = this.onCloseViewSchool.bind(this)
        this.onEditSchool = this.onEditSchool.bind(this)
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
    onEditSchool(){

    }
    onViewSchool(e){
        e.preventDefault()
        this.setState({showViewSchoolModal:true})
    }
    onCloseViewSchool(e){
        e.preventDefault()
        this.setState({showViewSchoolModal:false})
    }

    onShowNewSchoolModal() {
        this.setState({showNewSchoolModal: true})

    }

    onCloseNewSchoolModal() {
        this.setState({showNewSchoolModal: false})
    }

    render() {
        const {showNewSchoolModal,showViewSchoolModal,school} = this.state
        const SchoolsList = ({schools,viewSchool}) => {
            let count = 1
            return (
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
                        this.setState({school:school})
                        return (<tr key={i}>
                            <th scope="row">{count++}</th>
                            <td>{school.upi}</td>
                            <td><a href="" onClick={viewSchool}>{school.name}</a></td>
                            <td>{school.category}</td>
                            <td>{school.location ? school.location : 'N/A'}</td>
                        </tr>)
                    })}
                    </tbody>

                </table>)

        }
        return (<div className="container-fluid">
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
                    <br/>
                    <SchoolsList schools={this.props.schools} viewSchool={this.onViewSchool}/>
                </div>
            </div>
            <NewSchoolForm show={showNewSchoolModal} onClose={this.onCloseNewSchoolModal}
                           addSchool={this.props.addSchool}/>
            <ViewSchool show={showViewSchoolModal} onClose={this.onCloseViewSchool} onEdit={this.onEditSchool} school={school}/>
        </div>)
    }

}
Schools.propTypes = {
    addSchool: PropTypes.func.isRequired,
    getSchools: PropTypes.func.isRequired,
    schools: PropTypes.array.isRequired
}

function mapStateToProps(state) {
    return {schools: state.schoolReducers}
}

export default connect(mapStateToProps, {addSchool, getSchools})(Schools)
