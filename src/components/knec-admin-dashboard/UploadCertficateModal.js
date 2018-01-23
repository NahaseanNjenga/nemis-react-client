import React from 'react'
import PropTypes from 'prop-types'
import validator from 'validator'
import {isEmpty} from 'lodash'
import TextFieldGroup from '../../shared/TextFieldsGroup'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import {addStudent, registerStudent, uploadCertificate} from "../../actions/studentActions"
import {connect} from 'react-redux'
import {addFlashMessage} from "../../actions/flashMessages"
import jwt from "jsonwebtoken"
import {getSchoolCategory} from "../../actions/schoolActions"

class UploadCertficateModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            category: '',
            certificate: '',
            errors: {},
            selectedFile:'',
            isLoading: false,
            invalid: false
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onSelectDialog = this.onSelectDialog.bind(this)
        this.onSelectCertificate = this.onSelectCertificate.bind(this)
    }
    onSelectDialog(e) {
        e.preventDefault()
        document.getElementById('myFileInput').click()
    }
    onSelectCertificate(event) {
        event.preventDefault()
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader()
            let file = event.target.files[0]
            reader.onload = (e) => {
                this.setState({selectedFile: file})
            }
            reader.readAsDataURL(event.target.files[0])
        }
    }

    validateInput(data) {
        let errors = {}

        if (validator.isEmpty(data.category)) {
            errors.category = 'This field is required'
        }
        if (!data.selectedFile) {
            errors.selectedFile = 'This field is required'
        }

        return {
            errors,
            isValid: isEmpty(errors)
        }
    }

    isValid() {
        const {errors, isValid} = this.validateInput(this.state)
        if (!isValid) {
            this.setState({errors})
        }
        return isValid
    }

    onSubmit(e) {
        e.preventDefault()
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true})
            const data = new FormData()
            data.append('category', this.state.category)
            data.append('student_id', this.props.student_id)
            data.append('upload', this.state.selectedFile)
            this.props.uploadCertificate(data).then(
                (student) => {
                    // this.props.addFlashMessage({
                    //     type: 'success',
                    //     text: 'You have signed up successfully. Please use the login in form below to access your account'
                    // })
                    this.props.onClose()
                    this.setState({
                        category: '',
                        certificate: '',
                        errors: {},
                        isLoading: false,
                        invalid: false
                    })
                },
                err => this.setState({errors: err.response.data, isLoading: false})
            )
        }
    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {show, onClose,certificateOptions} = this.props

        const {errors, isLoading, invalid, surname,selectedFile, category} = this.state
        const KCPE = <div className="form-group">
            <label htmlFor="category">Level</label>
            <select className="form-control form-control-sm" id="category" name="category"
                    required="true" onChange={this.onChange}>
                <option>Select</option>
                <option value="KCPE">KCPE</option>
            </select>
        </div>
        const KCSE = <div className="form-group">
            <label htmlFor="category">Level</label>
            <select className="form-control form-control-sm" id="category" name="category"
                    required="true" onChange={this.onChange}>
                <option>Select</option>
                <option value="KCSE">KCSE</option>
            </select>
        </div>
        const ALL = <div className="form-group">
            <label htmlFor="category">Year of study</label>
            <select className="form-control form-control-sm" id="category" name="category"
                    required="true" onChange={this.onChange}>
                <option>Select</option>
                <option value="KCPE">KCPE</option>
                <option value="KCSE">KCSE</option>
            </select>
        </div>
        const year_of_study = () => {
            switch (certificateOptions) {
                case 'KCPE':
                    return KCPE
                case 'KCSE':
                    return KCSE
                case 'ALL':
                    return ALL
                default :
                    return ''
            }
        }

        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Upload a certificate</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onSubmit} encType="multipart/form-data">
                            <div className="form-group">
                                <label htmlFor="category">Year of study</label>
                                <select className="form-control form-control-sm" id="category" name="category"
                                        required="true" onChange={this.onChange}>
                                    <option>Select</option>
                                    <option value="KCPE">KCPE</option>
                                    <option value="KCSE">KCSE</option>
                                </select>
                            </div>
                            <div className="form-group">
                               <div className="custom-file">
                                   <input type="file" className="custom-file-input btn btn-success" id="customFile" accept=".pdf" onChange={this.onSelectCertificate}/>
                                       <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                           </div>
                            </div>
                            {year_of_study()}
                            <div className="form-group">
                                <button disabled={isLoading || invalid} className="btn btn-primary btn-sm"
                                        type="submit" onClick={this.onSubmit}>Upload
                                </button>
                            </div>
                        </form>
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


UploadCertficateModal.propTypes = {
    uploadCertificate: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    student_id:PropTypes.string.isRequired,
    certificateOptions:PropTypes.string.isRequired
}
UploadCertficateModal.contextTypes = {
    router: PropTypes.object.isRequired
}


export default connect(null, {uploadCertificate})(UploadCertficateModal)

