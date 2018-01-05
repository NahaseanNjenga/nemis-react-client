import React from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import PropTypes from 'prop-types'
import UpdateTeacherDetails from "./UpdateTeacherDetails"

class ViewTeacher extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showUpdateTeacherModal: false
        }
        this.onUpdateTeacher = this.onUpdateTeacher.bind(this)
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

    render() {
        const {showUpdateTeacherModal} = this.state
        const {show, onClose, teacher} = this.props
        if (show) {
            return (<Modal isOpen={show} toggle={onClose} size="lg">
                <ModalHeader toggle={onClose}>Teacher info</ModalHeader>
                <ModalBody>
                    <button className="btn btn-sm btn-info" onClick={this.onUpdateTeacher}>Edit</button>
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
                            <td>{teacher.birthdate}</td>
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
                            <td>{teacher.posting_history.previous_school.length>0 ? teacher.posting_history.previous_school: 'N/A'}</td>
                        </tr>

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
    onClose: PropTypes.func.isRequired
}
export default ViewTeacher