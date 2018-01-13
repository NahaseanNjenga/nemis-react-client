import React from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import PropTypes from 'prop-types'
import UpdateStudentDetails from "./UpdateStudentDetails"

class ViewStudent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showUpdateStudentModal: false
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
            return (<Modal isOpen={show} toggle={onClose} size="lg">
                <ModalHeader toggle={onClose}>Student info</ModalHeader>
                <ModalBody>
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
                            <td>{student.birthdate}</td>
                        </tr>

                        <tr>
                            <th scope="row">Current school:</th>
                            <td>{student.transfers?student.transfers.current_school:''}</td>
                        </tr>
                        </tbody>
                    </table>
                    <UpdateStudentDetails show={showUpdateStudentModal} onClose={this.onCloseUpdateStudent}
                                          student={this.props.student}/>
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