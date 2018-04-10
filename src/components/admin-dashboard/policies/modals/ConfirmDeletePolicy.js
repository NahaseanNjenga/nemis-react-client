import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {deletePolicy} from "../../../../actions/policyActions"
import validator from "validator"
import {isEmpty} from "lodash"
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'

class UnublishModal extends React.Component {
    constructor(props) {
        super(props)
        this.onDelete = this.onDelete.bind(this)
    }

    onDelete(e) {
        e.preventDefault()
        this.props.deletePolicy(this.props.policy).then(
            (policy) => {
                this.props.onClose()
            }
        )

    }

    render() {
        const {show, onClose,} = this.props
        if (show) {
            return (<Modal isOpen={show} toggle={onClose} size="lg">
                <ModalHeader toggle={onClose}>Confirm deletion</ModalHeader>
                <ModalBody>
                    <h4>Are you sure you want to delete this policy? This operation cannot be undone</h4>
                    <button className="btn btn-danger btn-sm" onClick={this.onDelete}>Delete</button>&nbsp;
                    <button className="btn btn-dark btn-sm" onClick={onClose}>Cancel</button>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={onClose}>Cancel</Button>{' '}
                </ModalFooter>
            </Modal>)
        }
        else return null
    }

}

UnublishModal.propTypes = {
    policy: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired,
    deletePolicy: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
}
export default connect(null, {deletePolicy})(UnublishModal)
