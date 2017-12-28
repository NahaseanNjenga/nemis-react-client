import React from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import PropTypes from 'prop-types'
import validator from 'validator'
import {isEmpty} from 'lodash'
import TextFieldGroup from "../shared/TextFieldsGroup"

class SchoolAdminLogin extends React.Component{
    constructor(props){
        super(props)
        this.state={
            upi:'',
            username: '',
            password: '',
            errors: {},
            isLoading: false,
            invalid: false
        }
        this.onChange=this.onChange.bind(this)
        this.checkSchoolExists=this.checkSchoolExists.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
    }
    onChange(e){
        this.setState({[e.target.name]: e.target.value})
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
            console.log(this.state)
            this.props.login(this.state).then(
                (res) => {
                    // this.props.addFlashMessage({type: 'success', text: 'You have signed up successfully'})
                    this.context.router.history.push('/')
                },
                err => this.setState({errors: err.response.data.errors, isLoading: false})
            )
        }
    }

checkSchoolExists(e){
    const field = e.target.name
    const val = e.target.value
    if (val !== '') {
        this.props.isSchoolExists(val).then(res => {
            if (res) {
                let errors = this.state.errors
                let invalid
                if (res.data) {
                    invalid = true
                    errors[field] = 'There is user with such ' + field
                } else {
                    invalid = false
                    errors[field] = ''
                }
                this.setState({errors, invalid})
            }
        })
    }
}

    validateInput(data) {
        let errors = {}

        if (validator.isEmpty(data.email)) {
            errors.email = 'This field is required'
        }
        if (!validator.isEmail(data.email)) {
            errors.email = 'This field must be an email'
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
    render(){
        const {show, onClose} = this.props
        const {username,password,upi,isLoading,invalid,errors}=this.state
        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="sm">
                    <ModalHeader toggle={onClose}>Login</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <form onSubmit={this.onSubmit}>
                                {errors.form && <div className="alert alert-danger">{errors.form}</div>}
                                <TextFieldGroup
                                    label="School UPI"
                                    type="upi"
                                    name="upi"
                                    value={upi}
                                    onChange={this.onChange}
                                    error={errors.upi}
                                    checkUserExists={this.checkSchoolExists}
                                />
                                <TextFieldGroup
                                    label="Username"
                                    type="username"
                                    name="username"
                                    value={username}
                                    onChange={this.onChange}
                                    error={errors.username}
                                />
                                <TextFieldGroup
                                    label="Password"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={this.onChange}
                                    error={errors.password}
                                />
                                <div className="form-group">
                                    <button disabled={isLoading ||invalid} className="btn btn-primary btn-sm"
                                            type="submit">Login
                                    </button>
                                </div>
                            </form>
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
SchoolAdminLogin.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    // isSchoolExists: PropTypes.func.isRequired,
}
export default SchoolAdminLogin