import React from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import PropTypes from 'prop-types'
import UpdateStudentDetails from "./UpdateStudentDetails"
import ResponsibilitiesList from "../school-admin-dashboard/modals/teachers/ResponsibilitiesList"
import CertificateList from "../knec-admin-dashboard/CertificateList"

class ViewStudent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showUpdateStudentModal: false,
        }
        this.onUpdateStudent = this.onUpdateStudent.bind(this)
        this.onCloseUpdateStudent = this.onCloseUpdateStudent.bind(this)
    }

    onUpdateStudent(e) {
        e.preventDefault()
        this.setState({showUpdateStudentModal: true})
    }

    onCloseUpdateStudent(e) {
        this.props.onClose()
        this.setState({showUpdateStudentModal: false})
    }

    render() {
        const {showUpdateStudentModal} = this.state
        const {show, onClose, student} = this.props
        if (show) {
            let count = 1
            return (<Modal isOpen={show} toggle={onClose} size="lg">
                <ModalHeader toggle={onClose}>Student info</ModalHeader>
                <ModalBody>
                    <span className="dropdown">
                        <button className="btn btn-sm btn-secondary dropdown-toggle" type="button"
                                id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                            Mark student as
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="">Deceased</a>
                        </div><br/>
                    <br/>
                    </span>
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
                            <a className="nav-item nav-link" id="nav-academics-tab" data-toggle="tab"
                               href="#nav-academics"
                               role="tab" aria-controls="nav-academics" aria-selected="false">Performance and
                                academics</a>
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-home" role="tabpanel"
                             aria-labelledby="nav-home-tab">
                            <button className="btn btn-sm btn-info" onClick={this.onUpdateStudent}>Edit</button>
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
                                    <td>{student.upi}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Surname:</th>
                                    <td>{student.surname}</td>
                                </tr>
                                <tr>
                                    <th scope="row">First name:</th>
                                    <td>{student.first_name}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Last name:</th>
                                    <td>{student.last_name ? student.last_name : 'N/A'}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Gender:</th>
                                    <td>{student.gender}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Date of birth</th>
                                    <td>{new Date(student.birthdate).toDateString()}</td>
                                </tr>

                                <tr>
                                    <th scope="row">Year of Study</th>
                                    <td>{student.year}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="tab-pane fade" id="nav-transfer" role="tabpanel"
                             aria-labelledby="nav-transfer-tab">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">School</th>
                                    <th scope="col">Date Admitted</th>
                                    <th scope="col">Date Cleared</th>
                                    {/*<th scope="col">Actions</th>*/}
                                </tr>
                                </thead>
                                <tbody>
                                {student.transfers.current_school ? <tr>
                                    <th scope="row">{count++}</th>
                                    {/*<td>{student.transfers.current_school ? student.transfers.current_school : 'N/A'}</td>*/}
                                    <td>{student.transfers.current_school}</td>
                                    <td>{new Date(student.transfers.reporting_date).toDateString()}</td>
                                    <td><p>Active</p></td>
                                </tr> : ''}
                                {student.transfers.previous_school.length > 0 ?
                                    student.transfers.previous_school.map(
                                        posting => {
                                            return (<tr>
                                                <th scope="row">{count++}</th>
                                                <td>{posting.school_upi}</td>
                                                <td>{new Date(posting.reporting_date).toDateString()}</td>
                                                <td>{new Date(posting.clearance_date).toDateString()}</td>
                                            </tr>)
                                        }) : ''}
                                </tbody>
                            </table>
                        </div>
                        <div className="tab-pane fade" id="nav-responsibilities" role="tabpanel"
                             aria-labelledby="nav-responsibilities-tab">
                            {/*<ResponsibilitiesList teacher_id={student._id} deceased={this.props.deceased} retired={this.props.retired}/>*/}
                        </div>
                        <div className="tab-pane fade" id="nav-contact" role="tabpanel"
                             aria-labelledby="nav-contact-tab">
                            {/*{showUpdateContactForm ? updateContactForm : ''}*/}
                            {/*{successMessage ? successMessage : ''}*/}
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">Contact information of parent/guardian</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th scope="row"> Email</th>
                                    <td>{student.contact ? student.contact.email : 'N/A'}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Telephone</th>
                                    <td>{student.contact ? student.contact.phone1 : 'N/A'}</td>
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
                        <div className="tab-pane fade" id="nav-academics" role="tabpanel"
                             aria-labelledby="nav-academics-tab">

                                <CertificateList student_id={student._id}/>


                        </div>
                    </div>
                    <UpdateStudentDetails show={showUpdateStudentModal} onClose={this.onCloseUpdateStudent}
                                          student={student}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={onClose}>Cancel</Button>{' '}
                </ModalFooter>
            </Modal>)
        }
        else return null
    }
}

ViewStudent.propTypes = {
    show: PropTypes.bool.isRequired,
    student: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
}
export default ViewStudent