import React from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import PropTypes from 'prop-types'
import validator from "validator"
import {isEmpty} from "lodash"
import {connect} from 'react-redux'
import {updateSchoolBasicInfo, updateSchoolInfo, updateSchoolList} from "../../../../actions/schoolActions"
import TextFieldGroup from "../../../../shared/TextFieldsGroup"
import SchoolDetails from "../../SchoolDetails"

class UpdateBasicInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errors: {},
            isLoading: false,
            invalid: false,
            _id: this.props.school._id,
            name: this.props.school.name,
            upi: this.props.school.upi,
            county: this.props.school.county,
            category: this.props.school.category,
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
            this.props.updateSchoolBasicInfo(this.state).then(
                (school) => {
                    // this.props.addFlashMessage({
                    //     type: 'success',
                    //     text: 'You have signed up successfully. Please use the login in form below to access your account'
                    // })
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
        if (validator.isEmpty(data.name)) {
            errors.name = 'This field is required'
        }
        if (validator.isEmpty(data.category)) {
            errors.categogry = 'This field is required'
        }
        if (validator.isEmpty(data.county)) {
            errors.county = 'This field is required'
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

        const {name, upi, county, category} = this.state
        if (show) {
            return (<Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Update School information</ModalHeader>
                    <ModalBody>
                        <div className="alert alert-warning" role="alert">
                            <strong>The UPI is system generated and cannot be changed. The school UPI
                                is {upi}</strong>
                        </div>
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                                label="Name"
                                type="text"
                                name="name"
                                value={name} autoFocus={true}
                                onChange={this.onChange}
                                error={errors.name}/>
                            <div className="form-group">
                                <label htmlFor="category"> Category </label>
                                <select className="form-control form-control-sm" id="category" name="category"
                                        required="true" onChange={this.onChange} value={category}>
                                    <option>Select</option>
                                    <option value="ECDE">ECDE</option>
                                    <option value="primary">primary</option>
                                    <option value="secondary">secondary</option>
                                    <option value="tertiary">tertiary</option>
                                </select>
                            </div>
                            <TextFieldGroup
                                label="County"
                                type="text"
                                name="county"
                                value={county}
                                onChange={this.onChange}
                                error={errors.county}/>


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

UpdateBasicInfo.propTypes = {
    show: PropTypes.bool.isRequired,
    school: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    updateSchoolBasicInfo: PropTypes.func.isRequired,
    updateSchoolInfo: PropTypes.func.isRequired,

}


export default connect(null, {updateSchoolBasicInfo, updateSchoolInfo})(UpdateBasicInfo)