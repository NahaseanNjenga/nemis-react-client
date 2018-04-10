import React from 'react'
import PropTypes from 'prop-types'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
class ViewPhoto extends React.Component {
    render() {
        const {photo,show,onClose}=this.props
        const src=`/uploads/${photo.path}`
        if (show) {
            return (<Modal isOpen={show} toggle={onClose} size="lg">
                <ModalHeader toggle={onClose}>Gallery</ModalHeader>
                <ModalBody>
                        <img src={src} alt="photo" width="700" height="500"/>
                    <br/>
                    {photo.description?<p>{photo.description}</p>:''}

                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={onClose}>Cancel</Button>{' '}
                </ModalFooter>
            </Modal>)
        }
        else return null

    }
}

ViewPhoto.propTypes = {
    photo: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired,
    onClose:PropTypes.func.isRequired
}

export default ViewPhoto