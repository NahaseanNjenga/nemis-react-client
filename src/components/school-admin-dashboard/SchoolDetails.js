import React from 'react'
import SchoolAdminMenu from "./SchoolAdminMenu"
import PropTypes from 'prop-types'
import UpdateSchoolDetails from "../admin-dashboard/schools/UpdateSchoolDetails"
import {connect} from 'react-redux'
import {displaySchoolInfo, getSchoolDetails} from "../../actions/schoolActions"
import jwt from 'jsonwebtoken'
import UpdateBasicInfo from "./modals/school-details/UpdateBasicInfo"
import UpdateInfrastructureInfo from "./modals/school-details/UpdateInfrastructureInfo"
import UpdateAssetsInfo from "./modals/school-details/UpdateAssetsInfo"
import UpdateContactInfo from "./modals/school-details/UpdateContactInfo"
import UpdateLearningMaterialsInfo from "./modals/school-details/UpdateLearningMaterialsInfo"

class SchoolDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showUpdateBasicInfoModal: false,
            showUpdateInfrastructureInfoModal: false,
            showUpdateAssetsInfoModal: false,
            showUpdateContactInfoModal: false,
            showUpdateLearningMaterialsInfoModal: false,
            school: ''
        }
        this.onUpdateSchool = this.onUpdateSchool.bind(this)
        this.onCloseUpdateSchool = this.onCloseUpdateSchool.bind(this)
        this.showUpdateBasicInfoModal = this.showUpdateBasicInfoModal.bind(this)
        this.closeUpdateBasicInfoModal = this.closeUpdateBasicInfoModal.bind(this)
        this.showUpdateInfrastructureInfoModal = this.showUpdateInfrastructureInfoModal.bind(this)
        this.showUpdateInfrastructureInfoModal = this.showUpdateInfrastructureInfoModal.bind(this)
        this.closeUpdateInfrastructureInfoModal = this.closeUpdateInfrastructureInfoModal.bind(this)
        this.showUpdateAssetsInfoModal = this.showUpdateAssetsInfoModal.bind(this)
        this.showUpdateContactInfoModal = this.showUpdateContactInfoModal.bind(this)
        this.closeUpdateContactInfoModal = this.closeUpdateContactInfoModal.bind(this)
        this.showUpdateLearningMaterialsInfoModal = this.showUpdateLearningMaterialsInfoModal.bind(this)
        this.closeUpdateLearningMaterialsInfoModal = this.closeUpdateLearningMaterialsInfoModal.bind(this)
    }

    showUpdateBasicInfoModal(e) {
        e.preventDefault()
        this.setState({showUpdateBasicInfoModal: true})
    }

    closeUpdateBasicInfoModal(e) {
        this.setState({showUpdateBasicInfoModal: false})
    }

    showUpdateLearningMaterialsInfoModal(e) {
        e.preventDefault()
        this.setState({showUpdateLearningMaterialsInfoModal: true})
    }

    closeUpdateLearningMaterialsInfoModal(e) {
        this.setState({showUpdateLearningMaterialsInfoModal: false})
    }

    showUpdateContactInfoModal(e) {
        e.preventDefault()
        this.setState({showUpdateContactInfoModal: true})
    }

    closeUpdateContactInfoModal(e) {
        this.setState({showUpdateContactInfoModal: false})
    }

    showUpdateInfrastructureInfoModal(e) {
        e.preventDefault()
        this.setState({showUpdateInfrastructureInfoModal: true})
    }

    closeUpdateInfrastructureInfoModal(e) {
        this.setState({showUpdateInfrastructureInfoModal: false})
    }

    showUpdateAssetsInfoModal(e) {
        e.preventDefault()
        this.setState({showUpdateAssetsInfoModal: true})
    }

    closeUpdateAssetsInfoModal(e) {
        this.setState({showUpdateAssetsInfoModal: false})
    }

    componentDidMount() {
        const token = jwt.decode(localStorage.schoolAdminJwtToken)
        this.props.getSchoolDetails(token.school_upi).then(school => {
            this.props.displaySchoolInfo({school: school.data})
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
        const {showUpdateBasicInfoModal, showUpdateInfrastructureInfoModal, showUpdateAssetsInfoModal, showUpdateContactInfoModal, showUpdateLearningMaterialsInfoModal} = this.state
        let {school} = this.props

        school = school.school
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <SchoolAdminMenu/>
                    </div>
                    <div className="col-md-9">
                        <br/>

                        <br/>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                                 aria-labelledby="pills-home-tab">
                                <nav className="nav flex-column">
                                    <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                        <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab"
                                           href="#nav-home" role="tab" aria-controls="nav-home"
                                           aria-selected="true">Home</a>
                                        <a className="nav-item nav-link" id="nav-infrastructure-tab" data-toggle="tab"
                                           href="#nav-infrastructure" role="tab" aria-controls="nav-infrastructure"
                                           aria-selected="false">Infrastructure</a>
                                        <a className="nav-item nav-link" id="nav-learning-materials-tab"
                                           data-toggle="tab" href="#nav-learning-materials" role="tab"
                                           aria-controls="nav-learning-materials" aria-selected="false">Learning
                                            Materials</a>
                                        <a className="nav-item nav-link" id="nav-assets-tab" data-toggle="tab"
                                           href="#nav-assets" role="tab" aria-controls="nav-assets"
                                           aria-selected="false">Assets</a>
                                        <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab"
                                           href="#nav-contact" role="tab" aria-controls="nav-contact"
                                           aria-selected="false">Contact Info</a>
                                    </div>
                                </nav>
                                <div className="tab-content" id="nav-tabContent">
                                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel"
                                         aria-labelledby="nav-home-tab">
                                        <table className="table">
                                            <tbody>
                                            <tr>
                                                <th scope="row">UPI:</th>
                                                <td>{school ? school.upi : ''}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Name:</th>
                                                <td>{school ? school.name : ''}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Category:</th>
                                                <td>{school ? school.category : ''}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">County:</th>
                                                <td>{school ? school.county : 'N/A'}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"></th>
                                                <td>
                                                    <button className="btn btn-sm btn-info"
                                                            onClick={this.showUpdateBasicInfoModal}>Edit
                                                    </button>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="tab-pane fade" id="nav-infrastructure" role="tabpanel"
                                         aria-labelledby="nav-infrastructure-tab">
                                        <table className="table">
                                            <tbody>
                                            <tr>
                                                <th scope="row">Classes:</th>
                                                <td>{school ? school.infrastructure.classes : 'N/A'}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Playing Fields:</th>
                                                <td>{school ? school.infrastructure.playing_fields : 'N/A'}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Halls:</th>
                                                <td>{school ? school.infrastructure.halls : 'N/A'}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Dormitories:</th>
                                                <td>{school ? school.infrastructure.dormitories : 'N/A'}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"></th>
                                                <td>
                                                    <button className="btn btn-sm btn-info"
                                                            onClick={this.showUpdateInfrastructureInfoModal}>Edit
                                                    </button>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="tab-pane fade" id="nav-learning-materials" role="tabpanel"
                                         aria-labelledby="nav-learning-materials-tab">
                                        <table className="table">

                                            <tbody>
                                            <tr>
                                                <th scope="row">Science Labs</th>
                                                <td>{school ? school.learning_materials.science_labs : 'N/A'}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Book ratio (books:students)</th>
                                                <td>{school ? school.learning_materials.book_ratio : 'N/A'}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"></th>
                                                <td>
                                                    <button className="btn btn-sm btn-info"
                                                            onClick={this.showUpdateLearningMaterialsInfoModal}>Edit
                                                    </button>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="tab-pane fade" id="nav-assets" role="tabpanel"
                                         aria-labelledby="nav-assets-tab">
                                        <table className="table">
                                            <tbody>
                                            <tr>
                                                <th scope="row">Buses:</th>
                                                <td>{school ? school.assets.buses : 'N/A'}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Farming Land (acres):</th>
                                                <td>{school ? school.assets.farming_land : 'N/A'}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"></th>
                                                <td>
                                                    <button className="btn btn-sm btn-info"
                                                            onClick={this.showUpdateAssetsInfoModal}>Edit
                                                    </button>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="tab-pane fade" id="nav-contact" role="tabpanel"
                                         aria-labelledby="nav-contact-tab">
                                        <table className="table">

                                            <tbody>
                                            <tr>
                                                <th scope="row">School Email</th>
                                                <td>{school ? school.contact.email : 'N/A'}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Telephone 1</th>
                                                <td>{school ? school.contact.phone1 : 'N/A'}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Telephone 2</th>
                                                <td>{school ? school.contact.phone2 : 'N/A'}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"></th>
                                                <td>
                                                    <button className="btn btn-sm btn-info"
                                                            onClick={this.showUpdateContactInfoModal}>Edit
                                                    </button>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-students" role="tabpanel"
                                 aria-labelledby="pills-students-tab">...
                            </div>
                            <div className="tab-pane fade" id="pills-employees" role="tabpanel"
                                 aria-labelledby="pills-employees-tab">...
                            </div>
                            <div className="tab-pane fade" id="pills-performance" role="tabpanel"
                                 aria-labelledby="pills-performance-tab">...
                            </div>
                            <div className="tab-pane fade" id="pills-gallery" role="tabpanel"
                                 aria-labelledby="pills-gallery-tab">...
                            </div>
                            <div className="tab-pane fade" id="pills-history" role="tabpanel"
                                 aria-labelledby="pills-history-tab">...
                            </div>
                        </div>
                        {showUpdateBasicInfoModal ? <UpdateBasicInfo show={showUpdateBasicInfoModal} school={school}
                                                                     onClose={this.closeUpdateBasicInfoModal}/> : ''}
                        {showUpdateInfrastructureInfoModal ?
                            <UpdateInfrastructureInfo show={showUpdateInfrastructureInfoModal} school={school}
                                                      onClose={this.closeUpdateInfrastructureInfoModal}/> : ''}
                        {showUpdateAssetsInfoModal ? <UpdateAssetsInfo show={showUpdateAssetsInfoModal} school={school}
                                                                       onClose={this.closeUpdateAssetsInfoModal}/> : ''}
                        {showUpdateContactInfoModal ?
                            <UpdateContactInfo show={showUpdateContactInfoModal} school={school}
                                               onClose={this.closeUpdateContactInfoModal}/> : ''}
                        {showUpdateLearningMaterialsInfoModal ?
                            <UpdateLearningMaterialsInfo show={showUpdateLearningMaterialsInfoModal} school={school}
                                               onClose={this.closeUpdateLearningMaterialsInfoModal}/> : ''}

                    </div>

                </div>
            </div>)
    }
}

SchoolDetails.propTypes = {
    getSchoolDetails: PropTypes.func.isRequired,
    displaySchoolInfo: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        school: state.schoolDetailsReducers
    }
}

export default connect(mapStateToProps, {getSchoolDetails, displaySchoolInfo})(SchoolDetails)