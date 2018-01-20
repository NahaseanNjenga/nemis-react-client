import React from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import PropTypes from 'prop-types'
import TextFieldGroup from "../../shared/TextFieldsGroup"
import validator from "validator"
import {isEmpty} from "lodash"
import {connect} from 'react-redux'
import {updateSchoolAdmin, updateSchoolAdminList} from "../../actions/schoolAdminActions"

class UpdateSchoolAdminDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errors: {},
            isLoading: false,
            invalid: false,
            _id : this.props.schoolAdmin._id,
            username : this.props.schoolAdmin.username,
            school_upi : this.props.schoolAdmin.school_upi,
            password: this.props.schoolAdmin.password,
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    // componentDidMount(){
    //     this.setState(this.props.schoolAdmin)
    // }

    onSubmit(e) {
        e.preventDefault()
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true})
            this.props.updateSchoolAdmin(this.state).then(
                (schoolAdmin) => {
                    if(schoolAdmin){

                    // console.log(schoolAdmin)
                    // this.props.addFlashMessage({
                    //     type: 'success',
                    //     text: 'You have signed up successfully. Please use the login in form below to access your account'
                    // })
                    this.props.onClose()
                    this.props.updateSchoolAdminList(schoolAdmin.data)
                    this.setState({isLoading: false})
                    }
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
        this.setState({_id: this.props.schoolAdmin._id})
    }

    validateInput(data) {
        let errors = {}
        if (validator.isEmpty(data.username)) {
            errors.username = 'This field is required'
        }
        if (validator.isEmpty(data.school_upi)) {
            errors.school_upi = 'This field is required'
        }
        if (validator.isEmpty(data.password)) {
            errors.password = 'This field is required'
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

        const {school_upi,username,password} = this.state
        if (show) {
            return (<Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Update School Admin information</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                                label="Username"
                                type="username"
                                name="username"
                                value={username} autoFocus={true}
                                onChange={this.onChange}
                                error={errors.username}/>
                            <TextFieldGroup
                                label="Password"
                                type="password"
                                name="password"
                                value={password}
                                onChange={this.onChange}
                                error={errors.password}/>
                            <TextFieldGroup
                                label="School UPI"
                                type="text"
                                name="school_upi"
                                value={school_upi}
                                onChange={this.onChange}
                                error={errors.school_upi}/>

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

UpdateSchoolAdminDetails.propTypes = {
    show: PropTypes.bool.isRequired,
    schoolAdmin: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    updateSchoolAdmin: PropTypes.func.isRequired,
    updateSchoolAdminList: PropTypes.func.isRequired,

}


export default connect(null, {updateSchoolAdmin, updateSchoolAdminList})(UpdateSchoolAdminDetails)