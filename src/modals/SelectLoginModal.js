import React from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import PropTypes from 'prop-types'

class SelectLoginModal extends React.Component {


    render() {
        const {show, onClose, onSchoolAdmin,onKnecAdmin} = this.props
        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="sm">
                    <ModalHeader toggle={onClose}>Log in as</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <ol>
                                <li><a href="" onClick={onSchoolAdmin}>School Admin</a></li>
                                <li><a href="" onClick={onKnecAdmin}>Knec Admin</a></li>
                            </ol>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={onClose}>Cancel</Button>{' '}
                    </ModalFooter>
                </Modal>
            )
        }
        else return null
    }
}

SelectLoginModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSchoolAdmin: PropTypes.func.isRequired,
    onKnecAdmin: PropTypes.func.isRequired,
}
SelectLoginModal.contextTypes = {
    router: PropTypes.object.isRequired
}

export default SelectLoginModal