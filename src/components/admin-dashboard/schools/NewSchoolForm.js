import React from 'react'
import PropTypes from 'prop-types'
import validator from 'validator'
import {isEmpty} from 'lodash'
import TextFieldGroup from '../../../shared/TextFieldsGroup'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import {isSchoolExists,registerSchool} from "../../../actions/schoolActions"
import {connect} from 'react-redux'
import {addFlashMessage} from "../../../actions/flashMessages"
import classnames from "classnames"


class NewSchoolForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            category: '',
            errors: {},
            county:'',
            isLoading: false,
            invalid: false
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.checkSchoolExists = this.checkSchoolExists.bind(this)
    }

    checkSchoolExists(e) {
        const field = e.target.name
        const val = e.target.value
        if (val !== '') {
            this.props.isSchoolExists(val).then(res => {
                if (res) {
                    let errors = this.state.errors
                    let invalid
                    if (res.data) {
                        invalid = true
                        errors[field] = 'There is school registered with such name'
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
        if (validator.isEmpty(data.name)) {
            errors.name = 'This field is required'
        }
        // if (data.name.length<3) {
        //     errors.name = 'School name must be at least 3 characters long'
        // }
        // if(typeof data.name!=='number'){
        //     errors.name = 'School name must be a string'
        // }
        if (validator.isEmpty(data.category)) {
            errors.category= 'This field is required'
        }
        if (validator.isEmpty(data.county)) {
            errors.county= 'This field is required'
        }
        return {
            errors,
            isValid: isEmpty(errors)
        }
    }

    isValid() {
        const {errors, isValid} = this.validateInput(this.state)
        if (!isValid) {
            this.setState({errors,invalid:true})
        }
        return isValid
    }

    onSubmit(e) {
        e.preventDefault()
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true})
            this.props.registerSchool({name:this.state.name,category:this.state.category,county:this.state.county}).then(
                (school) => {
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'You have signed up successfully. Please use the login in form below to access your account'
                    })
                    this.props.onClose()
                    this.props.addSchool(school.data)
                    this.setState({name:'',category:'',isLoading: false})
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

        const {errors, name, category,isLoading, invalid} = this.state
        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Register a new school</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                                label="Name"
                                type="name"
                                name="name"
                                value={name} autoFocus="true"
                                onChange={this.onChange}
                                errors={errors.name}
                                checkUserExists={this.checkSchoolExists}
                                autofocus={true}
                            />
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label" htmlFor="category">Category</label>
                                <div className="col-sm-9">

                            <select  className={classnames("form-control form-control-sm", {"is-invalid": errors.category})} name="category"
                                    required="true" onChange={this.onChange}>
                                <option>Select</option>
                                <option value="ECDE">ECDE</option>
                                <option value="primary">primary</option>
                                <option value="secondary">secondary</option>
                                <option value="tertiary">tertiary</option>
                            </select>
                                    {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label" htmlFor="county">County</label>
                                <div className="col-sm-9">

                            <select  className={classnames("form-control form-control-sm", {"is-invalid": errors.county})} id="county" name="county"
                                    required="true" onChange={this.onChange}>
                                <option>Select</option>
                                <option value="Nairobi">Nairobi</option>
                                <option value="Kisumu">Kisumu</option>
                                <option value="Kiambu">Kiambu</option>
                                <option value="Nakuru">Nakuru</option>
                                <option value="Bungoma">Bungoma</option>
                                <option value="Uasin Gishu">Uasin Gishu</option>
                                <option value="Kisii">Kisii</option>
                                <option value="Meru">Meru</option>
                                <option value="Muranga">Murang'a</option>
                                <option value="Narok">Narok</option>
                            </select>
                                    {errors.county && <div className="invalid-feedback">{errors.county}</div>}
                                </div>
                            </div>

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


NewSchoolForm.propTypes = {
    // userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    isSchoolExists: PropTypes.func.isRequired,
    registerSchool: PropTypes.func.isRequired,
    addSchool: PropTypes.func.isRequired,
}
NewSchoolForm.contextTypes = {
    router: PropTypes.object.isRequired
}


export default connect(null,{isSchoolExists,registerSchool,addFlashMessage})(NewSchoolForm)

