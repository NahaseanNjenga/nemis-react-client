import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {unpublishPolicy} from "../../../../actions/policyActions"
import validator from "validator"
import {isEmpty} from "lodash"
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'

class UnublishModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            policy_id: this.props.policy._id,
        }
        this.unpublish = this.unpublish.bind(this)
    }

    unpublish(e) {
        e.preventDefault()
        this.props.unpublishPolicy(this.state).then(
            (policy) => {
                this.props.onClose()
            }
        )

    }

    render() {
        const {show, onClose,} = this.props

        if (show) {
            return (<Modal isOpen={show} toggle={onClose} size="lg">
                <ModalHeader toggle={onClose}>Select scope of the policy</ModalHeader>
                <ModalBody>
                    <h4>Are you sure you want to unpublish this policy?</h4>
                    <button className="btn btn-danger btn-sm" onClick={this.unpublish}>Unpublish</button>
                    &nbsp;
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
    unpublishPolicy: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
}
export default connect(null, {unpublishPolicy})(UnublishModal)
