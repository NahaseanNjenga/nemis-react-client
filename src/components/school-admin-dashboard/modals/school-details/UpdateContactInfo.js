import React from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import PropTypes from 'prop-types'

import validator from "validator"
import {isEmpty} from "lodash"
import {connect} from 'react-redux'
import {updateSchoolContactInfo, updateSchoolList} from "../../../../actions/schoolActions"
import TextFieldGroup from "../../../../shared/TextFieldsGroup"

class UpdateContactInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errors: {},
            isLoading: false,
            invalid: false,
            _id : this.props.school._id,
            email : this.props.school.contact.email,
            phone1 : this.props.school.contact.phone1,
            phone2 : this.props.school.contact.phone2,
            address : this.props.school.contact.address,
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    // componentDidMount(){
    //     this.setState(this.props.school)
    // }

    onSubmit(e) {
        e.preventDefault()
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true})
            this.props.updateSchoolContactInfo(this.state).then(
                (school) => {
                    // this.props.addFlashMessage({
                    //     type: 'success',
                    //     text: 'You have signed up successfully. Please use the login in form below to access your account'
                    // })
                    this.props.onClose()
                   window.location.reload()
                    this.setState({isLoading: false})
                },
                err => this.setState({errors: err.response.data, isLoading: false})
            )
        }
    }

    isValid() {
        const {errors, isValid} = this.validateInput(this.state)
        if (!isValid) {
            this.setState({errors})
        }
        return isValid
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
        this.setState({_id: this.props.school._id})
    }

    validateInput(data) {
        let errors = {}
        if (validator.isEmpty(data.email)) {
            errors.email = 'This field is required'
        }
        if (!data.phone1) {
            errors.phone1 = 'This field is required'
        }
        if (!data.phone2) {
            errors.phone2 = 'This field is required'
        }
        if (validator.isEmpty(data.address)) {
            errors.address = 'This field is required'
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

    render() {
        const {show, onClose} = this.props
        const {errors, invalid, isLoading} = this.state

        const { email, phone1, phone2, address,} = this.state
        if (show) {
            return (<Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Update School Contact information</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                                label="School Email"
                                type="email"
                                name="email"
                                value={email}
                                onChange={this.onChange}
                                error={errors.email}/>
                            <TextFieldGroup
                                label="Telephone 1"
                                type="number"
                                name="phone1"
                                value={phone1}
                                onChange={this.onChange}
                                error={errors.phone1}/>
                            <TextFieldGroup
                                label="Telephone 2"
                                type="number"
                                name="phone2"
                                value={phone2}
                                onChange={this.onChange}
                                error={errors.phone2}/>
                            <TextFieldGroup
                                label="Postal Address"
                                type="text"
                                name="address"
                                value={address}
                                onChange={this.onChange}
                                error={errors.address}/>

                            <div className="form-group">
                                <button disabled={isLoading || invalid} className="btn btn-primary btn-sm"
                                        type="submit">Save
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

UpdateContactInfo.propTypes = {
    show: PropTypes.bool.isRequired,
    school: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    updateSchoolContactInfo: PropTypes.func.isRequired,
    updateSchoolList: PropTypes.func,

}


export default connect(null, {updateSchoolContactInfo, updateSchoolList})(UpdateContactInfo)