import React from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import PropTypes from 'prop-types'
import UpdateTeacherDetails from "./UpdateTeacherDetails"

import validator from "validator"
import {isEmpty} from "lodash"
import {connect} from "react-redux"
import { updateTeacherOnList} from "../../actions/teacherActions"
import ResponsibilitiesList from "../school-admin-dashboard/modals/teachers/ResponsibilitiesList"

class ViewTeacher extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showUpdateTeacherModal: false,
        }
        this.onUpdateTeacher = this.onUpdateTeacher.bind(this)
        this.onCloseUpdateTeacher = this.onCloseUpdateTeacher.bind(this)
        this.onCloseUpdateTeacher = this.onCloseUpdateTeacher.bind(this)
    }
    onUpdateTeacher(e) {
        e.preventDefault()
        this.setState({showUpdateTeacherModal: true})
    }

    onCloseUpdateTeacher(e) {
        this.props.onClose()
        this.setState({showUpdateTeacherModal: false})
    }

    onRetire(e) {
        e.preventDefault()
    }

    render() {
        const {showUpdateTeacherModal} = this.state
        const {show, onClose, teacher} = this.props
        if (show) {
            return (<Modal isOpen={show} toggle={onClose} size="lg">
                <ModalHeader toggle={onClose}>Teacher info</ModalHeader>
                <ModalBody>
                    <button className="btn btn-sm btn-info" onClick={this.onUpdateTeacher}>Edit</button>
                    &nbsp;
                    <span className="dropdown">
                        <button className="btn btn-sm btn-secondary dropdown-toggle" type="button"
                                id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                            Mark teacher as
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="">Deceased</a>
                            <a className="dropdown-item" href="">Retired</a>
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
                                    <th scope="row">Current school:</th>
                                    <td>{teacher.posting_history.current_school ? teacher.posting_history.current_school : 'N/A'}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Posting history</th>
                                    <td>{teacher.posting_history.previous_school.length > 0 ? teacher.posting_history.previous_school : 'N/A'}</td>
                                </tr>


                                </tbody>
                            </table>
                        </div>
                        <div className="tab-pane fade" id="nav-transfer" role="tabpanel"
                             aria-labelledby="nav-transfer-tab">
                            <button className="btn btn-sm btn-info">Clear teacher from school</button>
                            current school is
                        </div>
                        <div className="tab-pane fade" id="nav-responsibilities" role="tabpanel"
                             aria-labelledby="nav-responsibilities-tab">


                            {teacher.responsibilities.length > 0 ?
                                <ResponsibilitiesList teacher_id={teacher._id}/> : ''}
                        </div>
                        <div className="tab-pane fade" id="nav-contact" role="tabpanel"
                             aria-labelledby="nav-contact-tab">
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
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <UpdateTeacherDetails show={showUpdateTeacherModal} onClose={this.onCloseUpdateTeacher}

                                          teacher={this.props.teacher}/>
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

}
export default connect(null, { updateTeacherOnList})(ViewTeacher)