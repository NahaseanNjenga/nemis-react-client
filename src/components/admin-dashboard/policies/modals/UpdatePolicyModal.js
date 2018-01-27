import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {updatePolicyOnDB, } from "../../../../actions/policyActions"
import validator from "validator"
import {isEmpty} from "lodash"
import TextFieldGroup from "../../../../shared/TextFieldsGroup"
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'

class UpdatePolicyModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title:this.props.policy.title,
            policy_id: this.props.policy._id,
            scope:'unpublished',
            errors: {},
            isLoading: false,
            invalid: false
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    validateInput(data) {
        let errors = {}
        if (validator.isEmpty(data.title)) {
            errors.title = 'This field is required'
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

    // componentDidMount() {
    //     this.setState({title: this.props.policy.title})
    // }

    onSubmit(e) {
        e.preventDefault()
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true})
            this.props.updatePolicyOnDB(this.state).then(
                (policy) => {
                    // this.props.addFlashMessage({
                    //     type: 'success',
                    //     text: 'You have signed up successfully. Please use the login in form below to access your account'
                    // })
                    this.setState({
                        // title: '',
                        // policy_id: '',
                        errors: {},
                        isLoading: false,
                        invalid: false
                    })
                    this.props.onClose()
                    // this.props.(policy.data)
                },
                err => this.setState({errors: err.response.data, isLoading: false})
            )
        }
    }

    render() {
        const {show, onClose,} = this.props
        // let {policy}=this.props
        const { errors, isLoading, invalid,title} = this.state
        if (show) {
            return (<Modal isOpen={show} toggle={onClose} size="lg">
                <ModalHeader toggle={onClose}>Update Policy Title</ModalHeader>
                <ModalBody>
                    <form onSubmit={this.onSubmit}>
                        <TextFieldGroup
                            label="Title"
                            type="text"
                            name="title"
                            value={title}
                            onChange={this.onChange}
                            error={errors.title}
                        />
                        {this.props.policy.scope!=='unpublished'?<div className="form-group row">
                            <label className="col-sm-3 col-form-label" htmlFor="scope">Scope</label>
                            <div className="col-sm-9">
                                <select className="form-control form-control-sm" id="scope" name="scope"
                                        required="true" onChange={this.onChange}>
                                    <option>Select</option>
                                    <option value="public">public</option>
                                    <option value="school">school</option>
                                    <option value="knec">knec</option>
                                </select>
                            </div>
                        </div>:''}
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
            </Modal>)
        }
        else return null
    }

}

UpdatePolicyModal.propTypes = {
    policy: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired,
    updatePolicyOnDB: PropTypes.func.isRequired,

    onClose: PropTypes.func.isRequired,
}
export default connect(null, {updatePolicyOnDB, })(UpdatePolicyModal)
