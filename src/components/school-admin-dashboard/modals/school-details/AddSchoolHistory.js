import React from 'react'
import PropTypes from 'prop-types'
import validator from 'validator'
import {isEmpty} from 'lodash'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import {connect} from 'react-redux'
import {addSchoolHistory} from "../../../../actions/schoolActions"

class AddSchoolHistory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: '',
            errors: {},
            isLoading: false,
            invalid: false
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({history:e.target.value})
    }

    validateInput(data) {
        let errors = {}
        if (validator.isEmpty(data.history)) {
            errors.history = 'This field is required'
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
            this.props.addSchoolHistory({school_upi: this.props.school_upi, history: this.state.history}).then(
                (school) => {
                    // this.props.addFlashMessage({
                    //     type: 'success',
                    //     text: 'You have signed up successfully. Please use the login in form below to access your account'
                    // })
                    this.props.onClose()
                    this.setState({history:'', isLoading: false})
                },
                err => this.setState({errors: err.response.data, isLoading: false})
            )
        }
    }

    render() {
        const {show, onClose} = this.props

        const {errors, isLoading, invalid} = this.state
        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Add school History</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <textarea name="history" onChange={this.onChange} className="form-control" rows="6" cols="20"/>
                            </div>
                            <div className="form-group">
                                <button disabled={isLoading || invalid} className="btn btn-primary btn-sm"
                                        type="submit" onClick={this.onSubmit}>Save
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


AddSchoolHistory.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    addSchoolHistory: PropTypes.func.isRequired,
    school_upi:PropTypes.string.isRequired
   }

export default connect(null, {addSchoolHistory})(AddSchoolHistory)

