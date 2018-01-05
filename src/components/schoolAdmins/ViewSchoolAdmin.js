import React from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import PropTypes from 'prop-types'
import UpdateSchoolAdminDetails from "./UpdateSchoolAdminDetails"

class ViewSchoolAdmin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showUpdateSchoolAdminModal: false
        }
        this.onUpdateSchoolAdmin = this.onUpdateSchoolAdmin.bind(this)
        this.onCloseUpdateSchoolAdmin = this.onCloseUpdateSchoolAdmin.bind(this)
    }

    onUpdateSchoolAdmin(e) {
        e.preventDefault()
        this.setState({showUpdateSchoolAdminModal: true})
    }

    onCloseUpdateSchoolAdmin(e) {
        this.props.onClose()
        this.setState({showUpdateSchoolAdminModal: false})
    }

    render() {
        const {showUpdateSchoolAdminModal}=this.state
        const {show,onClose,schoolAdmin}=this.props
        if (show) {
            return (<Modal isOpen={show} toggle={onClose} size="lg">
                <ModalHeader toggle={onClose}>SchoolAdmin info</ModalHeader>
                <ModalBody>
                    <button className="btn btn-sm btn-info" onClick={this.onUpdateSchoolAdmin}>Edit</button>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Category</th>
                            <th scope="col">Value</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">School UPI:</th>
                            <td>{schoolAdmin.school_upi}</td>
                        </tr>
                        <tr>
                            <th scope="row">Username:</th>
                            <td>{schoolAdmin.username}</td>
                        </tr>
                        <tr>
                            <th scope="row">Password:</th>
                            <td>{schoolAdmin.password}</td>
                        </tr>

                        </tbody>
                    </table>
                    <UpdateSchoolAdminDetails show={showUpdateSchoolAdminModal} onClose={this.onCloseUpdateSchoolAdmin} schoolAdmin={this.props.schoolAdmin}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={onClose}>Cancel</Button>{' '}
                </ModalFooter>
            </Modal>)
        }
        else return null
    }
}

ViewSchoolAdmin.propTypes = {
    show: PropTypes.bool.isRequired,
    schoolAdmin: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
}
export default ViewSchoolAdmin