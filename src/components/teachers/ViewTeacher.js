import React from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import PropTypes from 'prop-types'
import UpdateTeacherDetails from "./UpdateTeacherDetails"

import validator from "validator"
import {isEmpty} from "lodash"
import {connect} from "react-redux"
import {updateTeacherContact, updateTeacherOnList} from "../../actions/teacherActions"
import ResponsibilitiesList from "../school-admin-dashboard/modals/teachers/ResponsibilitiesList"
import TextFieldGroup from "../../shared/TextFieldsGroup"
import ClearTeacher from "../school-admin-dashboard/modals/teachers/ClearTeacher"
import UpdateContact from "../school-admin-dashboard/modals/teachers/UpdateContact"
import Retire from "../school-admin-dashboard/modals/teachers/Retire"
import Deceased from "../school-admin-dashboard/modals/teachers/Deceased"

class ViewTeacher extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showUpdateTeacherModal: false,
            showUpdateContactForm: false,
            retireModal:false,
            deceasedModal:false,
            successMessage: '',
            errors: {},
            isLoading: false,
            invalid: false, showClearTeacherModal: false
        }
        this.onUpdateTeacher = this.onUpdateTeacher.bind(this)
        this.onCloseUpdateTeacher = this.onCloseUpdateTeacher.bind(this)
        this.onCloseUpdateTeacher = this.onCloseUpdateTeacher.bind(this)
        this.showUpdateContactForm = this.showUpdateContactForm.bind(this)
        this.closeUpdateContactForm = this.closeUpdateContactForm.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onSuccess = this.onSuccess.bind(this)
        this.onClearTeacher = this.onClearTeacher.bind(this)
        this.onCloseClearTeacherModal = this.onCloseClearTeacherModal.bind(this)
        this.showRetireModal = this.showRetireModal.bind(this)
        this.closeRetireModal = this.closeRetireModal.bind(this)
        this.showDeceasedModal = this.showDeceasedModal.bind(this)
        this.closeDeceasedModal = this.closeDeceasedModal.bind(this)

    }

    onUpdateTeacher(e) {
        e.preventDefault()
        this.setState({showUpdateTeacherModal: true})
    }

    showUpdateContactForm(e) {
        e.preventDefault()
        this.setState({showUpdateContactForm: true})
    }

    closeUpdateContactForm() {
        this.setState({showUpdateContactForm: false})
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onCloseUpdateTeacher(e) {
        this.props.onClose()
        this.setState({showUpdateTeacherModal: false})
    }

    onClearTeacher(e) {
        e.preventDefault()
        this.setState({showClearTeacherModal: true})
    }

    onCloseClearTeacherModal() {
        this.setState({showClearTeacherModal: false})
        this.props.onClose()
    }
    onRetire(e) {
        e.preventDefault()
    }
    showRetireModal(e){
        e.preventDefault()
        this.setState({retireModal:true})
    }
    closeRetireModal(e){
        this.setState({retireModal:false})
        this.props.onClose()
    }
    showDeceasedModal(e){
        e.preventDefault()
        this.setState({deceasedModal:true})
    }
    closeDeceasedModal(e){
        this.setState({deceasedModal:false})

    }
onSuccess(){
        this.closeUpdateContactForm()
        this.setState({successMessage: <div className="alert alert-success" role="alert">
                Successfully updated contact information. You may need to refresh your browser to view the
                updates.
            </div>})
}

    componentWillMount(){
        this.setState({phone1:this.props.teacher.contact.phone1,email:this.props.teacher.contact.email})
    }

    render() {
        const {showUpdateTeacherModal, showUpdateContactForm, email,phone1,successMessage,retireModal, showClearTeacherModal,deceasedModal} = this.state
        const {show, onClose, teacher} = this.props
        if (show) {
            let count=1
            return (<Modal isOpen={show} toggle={onClose} size="lg">
                <ModalHeader toggle={onClose}>Teacher info</ModalHeader>
                <ModalBody>
                    <span className="dropdown">
                        <button className="btn btn-sm btn-secondary dropdown-toggle" type="button"
                                id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                            Mark teacher as
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="" onClick={this.showDeceasedModal}>Deceased</a>
                            <a className="dropdown-item" href="" onClick={this.showRetireModal}>Retired</a>
                        </div>
                    </span>
                    <br/>
                    <br/>
                    <nav>
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home"
                               role="tab" aria-controls="nav-home" aria-selected="true">Basic info</a>
                            <a className="nav-item nav-link" id="nav-responsibilities-tab" data-toggle="tab"
                               href="#nav-responsibilities" role="tab" aria-controls="nav-responsibilities"
                               aria-selected="false">Responsibilities</a>
                            <a className="nav-item nav-link" id="nav-transfer-tab" data-toggle="tab"
                               href="#nav-transfer" role="tab" aria-controls="nav-transfer" aria-selected="false">Transfer
                                history</a>
                            <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact"
                               role="tab" aria-controls="nav-contact" aria-selected="false">Contact info</a>
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-home" role="tabpanel"
                             aria-labelledby="nav-home-tab">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">Category</th>
                                    <th scope="col">Value</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th scope="row">TSC Number:</th>
                                    <td>{teacher.tsc}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Surname:</th>
                                    <td>{teacher.surname}</td>
                                </tr>
                                <tr>
                                    <th scope="row">First name:</th>
                                    <td>{teacher.first_name}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Last name:</th>
                                    <td>{teacher.last_name ? teacher.last_name : 'N/A'}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Gender:</th>
                                    <td>{teacher.gender}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Date of birth</th>
                                    <td>{new Date(teacher.birthdate).toDateString()}</td>
                                </tr>
                                <tr>
                                    <th scope="row">National ID:</th>
                                    <td>{teacher.nationalID}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Working status:</th>
                                    <td>{teacher.life}</td>
                                </tr>
                                <tr>
                                    <th scope="row"></th>
                                    <td> <button className="btn btn-sm btn-info" onClick={this.onUpdateTeacher}>Edit</button></td>
                                </tr>


                                </tbody>
                            </table>
                        </div>
                        <div className="tab-pane fade" id="nav-transfer" role="tabpanel"
                             aria-labelledby="nav-transfer-tab">
                            <button className="btn btn-sm btn-info" onClick={this.onClearTeacher}>Clear teacher from
                                school
                            </button>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">School</th>
                                    <th scope="col">Date Employed</th>
                                    <th scope="col">Date Cleared</th>
                                    {/*<th scope="col">Actions</th>*/}
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th scope="row">{count++}</th>
                                    {/*<td>{teacher.posting_history.current_school ? teacher.posting_history.current_school : 'N/A'}</td>*/}
                                    <td>{teacher.posting_history.current_school}</td>
                                    <td>{new Date(teacher.posting_history.reporting_date).toDateString()}</td>
                                    <td><p>Still Working</p></td>
                                </tr>
                                {teacher.posting_history.previous_school.length > 0 ?
                                    teacher.posting_history.previous_school.map(
                                        posting=>{
                                        return (<tr>
                                            <th scope="row">{count++}</th>
                                            <td>{posting.school_upi}</td>
                                            <td>{new Date(posting.reporting_date).toDateString()}</td>
                                            <td>{new Date(posting.clearance_date).toDateString()}</td>
                                        </tr> )
                                        }): ''}
                                </tbody>
                            </table>
                        </div>
                        <div className="tab-pane fade" id="nav-responsibilities" role="tabpanel"
                             aria-labelledby="nav-responsibilities-tab">

                                <ResponsibilitiesList teacher_id={teacher._id}/>
                        </div>
                        <div className="tab-pane fade" id="nav-contact" role="tabpanel"
                             aria-labelledby="nav-contact-tab">
                            {/*{showUpdateContactForm ? updateContactForm : ''}*/}
                            {successMessage ? successMessage : ''}
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">Category</th>
                                    <th scope="col">Value</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th scope="row"> Email</th>
                                    <td>{teacher.contact.email ? teacher.contact.email : 'N/A'}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Telephone</th>
                                    <td>{teacher.contact.phone1 ? teacher.contact.phone1 : 'N/A'}</td>
                                </tr>
                                <tr>
                                    <th scope="row"></th>
                                    <td>
                                        <button className="btn btn-sm btn-info"
                                                onClick={this.showUpdateContactForm}>Edit
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <UpdateTeacherDetails show={showUpdateTeacherModal} onClose={this.onCloseUpdateTeacher}
                                          teacher={this.props.teacher}/>
                    <ClearTeacher show={showClearTeacherModal} onClose={this.onCloseClearTeacherModal}
                                  teacher_id={this.props.teacher._id}/>
                  <UpdateContact show={showUpdateContactForm} onClose={this.closeUpdateContactForm} teacher={teacher} onSuccesss={this.onSuccess}/>
                    <Retire teacher={teacher}
                            show={retireModal}
                            onClose={this.closeRetireModal}/>
                    <Deceased teacher={teacher}
                            show={deceasedModal}
                            onClose={this.closeDeceasedModal}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={onClose}>Cancel</Button>{' '}
                </ModalFooter>
            </Modal>)
        }
        else return null
    }
}

ViewTeacher.propTypes = {
    show: PropTypes.bool.isRequired,
    teacher: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    updateTeacherOnList: PropTypes.func.isRequired,
    updateTeacherContact: PropTypes.func.isRequired,

}
export default connect(null, {updateTeacherOnList, updateTeacherContact})(ViewTeacher)