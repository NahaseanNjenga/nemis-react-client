import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import jwt from "jsonwebtoken"
import UploadPictureModal from "./modals/school-details/UploadPictureModal"
import SchoolAdminMenu from "./SchoolAdminMenu"
import {addPhoto, clearGallery, getGallery, uploadPhoto} from "../../actions/galleryActions"
import Photo from "./Photo"

let upload = null

class Gallery extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            description: '',
            showPictureModal: false,
            picture: null,
            selectedFile: '',
            school_upi: ''
        }
        const token = jwt.decode(localStorage.schoolAdminJwtToken)
        this.state.school_upi = token.school_upi
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onSelectImage = this.onSelectImage.bind(this)
        this.onSelectDialog = this.onSelectDialog.bind(this)
        this.onClose = this.onClose.bind(this)

    }

    onChange(e) {
        this.setState({description: e.target.value})
    }

    componentDidMount() {
        this.props.getGallery(this.state.school_upi).then(photos => {
            if (photos.data.gallery.length > 0) {
                photos.data.gallery.map(photo => {
                    this.props.addPhoto(photo)
                })
            }
        })
    }

    onSubmit(e) {
        e.preventDefault()
        const {description, selectedFile, school_upi} = this.state
        if (selectedFile !== '') {
            let profile
            const data = new FormData()
            data.append('body', description)
            data.append('school_upi', school_upi)
            data.append('upload', selectedFile)

            this.props.uploadPhoto(data).then(
                photos => {
                    this.props.clearGallery()
                    upload.files = undefined
                    photos.data.gallery.map(photo => {
                        this.props.addPhoto(photo)
                    })
                    this.setState({selectedFile: '', description: '', showPictureModal: false})
                }
            )
        }
    }

    onSelectDialog(e) {
        e.preventDefault()
        document.getElementById('myFileInput').click()
    }

    onSelectImage(event) {
        event.preventDefault()
        if (event.target.files && event.target.files[0]) {
            this.setState({showPictureModal: true})
            let reader = new FileReader()
            let file = event.target.files[0]
            reader.onload = (e) => {
                this.setState({picture: e.target.result, selectedFile: file})
            }
            reader.readAsDataURL(event.target.files[0])
        }
    }



    onClose() {
        this.setState({showPictureModal: false})
    }

    render() {
        const {picture, showPictureModal} = this.state
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <SchoolAdminMenu/>
                    </div>
                    <div className="col-md-9">
                        <br/>
                        {/*<h1>Luku but you don't touch</h1>*/}
                        <form encType="multipart/form-data">
                            <div className="row">
                                <div className="col-lg-6">
                                    <ul className="list-inline">
                                        <li className="list-inline-item">
                                            <input type="file" id="myFileInput" name="upload" style={{display: 'none'}}
                                                   onChange={this.onSelectImage}
                                                   accept=".jpg,.gif,.png,.jpeg" ref={node => {
                                                upload = node
                                            }}/>
                                            <a href="" className="btn btn-primary" onClick={this.onSelectDialog}>
                                                <i className="fa fa-picture-o"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {picture !== null &&
                            <UploadPictureModal show={showPictureModal} onClose={this.onClose} picture={picture}
                                                onUpload={this.onSubmit} onChange={this.onChange}/>}
                        </form>
                        {this.props.photos.length > 0 ?
                            <div className="row">
                                {this.props.photos.map(photo => {
                                    return <Photo onViewPhoto={this.onViewPhoto} photo={photo}/>

                                })} </div> : 'No gallery found'}
                    </div>
                </div>
            </div>

        )
    }
}

Gallery.propTypes = {
    uploadPhoto: PropTypes.func.isRequired,
    addPhoto: PropTypes.func.isRequired,
    getGallery: PropTypes.func.isRequired,
    clearGallery: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        photos: state.galleryReducers
    }
}

export default connect(mapStateToProps, {uploadPhoto, getGallery, clearGallery, addPhoto})(Gallery)
