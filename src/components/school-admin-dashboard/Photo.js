import React from 'react'
import PropTypes from 'prop-types'
import ViewPhoto from "./modals/ViewPhoto"

class Photo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            viewPictureModal: false,
        }
        this.onViewPhoto = this.onViewPhoto.bind(this)
        this.closeViewPicture = this.closeViewPicture.bind(this)
    }

    onViewPhoto(e) {
        e.preventDefault()
        this.setState({viewPictureModal: true})
    }

    closeViewPicture(e) {
        this.setState({viewPictureModal: false})
    }

    render() {
        const {photo} = this.props
        const {viewPictureModal} = this.state
        const src = `/uploads/${photo.path}`
        return (<div className="col-sm-4">
            <img src={src} alt="photo" width="350" height="200" className="rounded-top gallery" onClick={this.onViewPhoto}/>
            &nbsp;
            <ViewPhoto photo={photo} show={viewPictureModal} onClose={this.closeViewPicture}/>
        </div>)
    }
}

Photo.propTypes = {
    photo: PropTypes.object.isRequired,
}

export default Photo