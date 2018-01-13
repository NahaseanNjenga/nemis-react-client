import React from 'react'
import SchoolAdminMenu from "./SchoolAdminMenu"
import PropTypes from 'prop-types'
import UpdateSchoolDetails from "../schools/UpdateSchoolDetails"
import {connect} from 'react-redux'
import {getSchoolDetails} from "../../actions/schoolActions"
import jwt from 'jsonwebtoken'

class SchoolDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showUpdateSchoolModal: false,
            school: ''
        }
        this.onUpdateSchool = this.onUpdateSchool.bind(this)
        this.onCloseUpdateSchool = this.onCloseUpdateSchool.bind(this)
    }

    componentDidMount() {
        const token = jwt.decode(localStorage.schoolAdminJwtToken)
        console.log(token)
        this.props.getSchoolDetails(token.school_upi).then(school => {
            console.log(school)
            this.setState({school:school.data})
        })
    }

    onUpdateSchool(e) {
        e.preventDefault()
        this.setState({showUpdateSchoolModal: true})
    }

    onCloseUpdateSchool(e) {
        this.setState({showUpdateSchoolModal: false})
    }

    render() {
        const {showUpdateSchoolModal} = this.state
        const {school} = this.state
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <SchoolAdminMenu/>
                    </div>
                    <div className="col-md-9">
                        <button className="btn btn-sm btn-info" onClick={this.onUpdateSchool}>Edit</button>
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">Category</th>
                                <th scope="col">Value</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">UPI:</th>
                                <td>{school.upi}</td>
                            </tr>
                            <tr>
                                <th scope="row">Name:</th>
                                <td>{school.name}</td>
                            </tr>
                            <tr>
                                <th scope="row">Category:</th>
                                <td>{school.category}</td>
                            </tr>
                            <tr>
                                <th scope="row">County:</th>
                                <td>{school.county ? school.county : 'N/A'}</td>
                            </tr>
                            <tr>
                                <th scope="row">Classes:</th>
                                <td>{school.infrastructure ? school.infrastructure.classes : 'N/A'}</td>
                            </tr>
                            <tr>
                                <th scope="row">Playing Fields:</th>
                                <td>{school.infrastructure ? school.infrastructure.playing_fields : 'N/A'}</td>
                            </tr>
                            <tr>
                                <th scope="row">Halls:</th>
                                <td>{school.infrastructure? school.infrastructure.halls : 'N/A'}</td>
                            </tr>
                            <tr>
                                <th scope="row">Dormitories:</th>
                                <td>{school.infrastructure ? school.infrastructure.dormitories : 'N/A'}</td>
                            </tr>
                            <tr>
                                <th scope="row">Buses:</th>
                                <td>{school.assets ? school.assets.buses : 'N/A'}</td>
                            </tr>
                            <tr>
                                <th scope="row">Farming Land (acres):</th>
                                <td>{school.assets? school.assets.farming_land : 'N/A'}</td>
                            </tr>
                            <tr>
                                <th scope="row">Science Labs</th>
                                <td>{school.learning_materials? school.learning_materials.science_labs : 'N/A'}</td>
                            </tr>
                            <tr>
                                <th scope="row">Book ratio (books:students)</th>
                                <td>{school.learning_materials ? school.learning_materials.book_ratio : 'N/A'}</td>
                            </tr>

                            <tr>
                                <th scope="row">School Email</th>
                                <td>{school.contact ? school.contact.email : 'N/A'}</td>
                            </tr>
                            <tr>
                                <th scope="row">Telephone 1</th>
                                <td>{school.contact? school.contact.phone1 : 'N/A'}</td>
                            </tr>
                            <tr>
                                <th scope="row">Telephone 2</th>
                                <td>{school.contact ? school.contact.phone2 : 'N/A'}</td>
                            </tr>
                            </tbody>
                        </table>
                        {school?<UpdateSchoolDetails show={showUpdateSchoolModal} onClose={this.onCloseUpdateSchool}
                                             school={school}/>:''}

                    </div>
                </div>
            </div>)
    }
}

SchoolDetails.propTypes = {
    getSchoolDetails: PropTypes.func.isRequired
}
export default connect(null, {getSchoolDetails})(SchoolDetails)