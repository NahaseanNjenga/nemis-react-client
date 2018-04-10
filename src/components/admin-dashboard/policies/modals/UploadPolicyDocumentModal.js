import React from 'react'
import PropTypes from 'prop-types'
import validator from 'validator'
import {isEmpty} from 'lodash'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import {connect} from 'react-redux'
import { uploadPolicy} from "../../../../actions/policyActions"
import TextFieldGroup from "../../../../shared/TextFieldsGroup"

class UploadPolicyDocumentModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            errors: {},
            selectedFile: '',
            isLoading: false,
            invalid: false
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onSelectDialog = this.onSelectDialog.bind(this)
        this.onSelectPolicy = this.onSelectPolicy.bind(this)
    }

    onSelectDialog(e) {
        e.preventDefault()
        document.getElementById('myFileInput').click()
    }

    onSelectPolicy(event) {
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

        if (validator.isEmpty(data.title)) {
            errors.title = 'This field is required'
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
            data.append('title', this.state.title)
            data.append('upload', this.state.selectedFile)
            this.props.uploadPolicy(data).then(
                (policy) => {
                    // this.props.addFlashMessage({
                    //     type: 'success',
                    //     text: 'You have signed up successfully. Please use the login in form below to access your account'
                    // })

                    this.props.onClose()
                    this.setState({
                        title: '',
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
        const {show, onClose} = this.props

        const {errors, isLoading, invalid, title} = this.state

        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Upload a certificate</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onSubmit} encType="multipart/form-data">
                            <TextFieldGroup label="Title" value={title} type="text" name="title" error={errors.title}
                                            onChange={this.onChange}/>
                            <div className="form-group">
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input btn btn-success" id="customFile"
                                           accept=".pdf" onChange={this.onSelectPolicy}/>
                                    <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                                </div>
                            </div>

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


UploadPolicyDocumentModal.propTypes = {
    uploadPolicy: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,


}
export default connect(null, {uploadPolicy,})(UploadPolicyDocumentModal)

