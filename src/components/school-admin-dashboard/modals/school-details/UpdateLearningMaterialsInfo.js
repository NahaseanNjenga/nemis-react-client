import React from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import PropTypes from 'prop-types'

import validator from "validator"
import {isEmpty} from "lodash"
import {connect} from 'react-redux'
import {updateSchoolLearningMaterialsInfo, updateSchoolLearningMaterialsInfoList} from "../../../../actions/schoolActions"
import TextFieldGroup from "../../../../shared/TextFieldsGroup"

class UpdateLearningMetarials extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errors: {},
            isLoading: false,
            invalid: false,
            _id : this.props.school._id,

            science_labs:this.props.school.learning_materials.science_labs,
            book_ratio : this.props.school.learning_materials.book_ratio,
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
            this.props.updateSchoolLearningMaterialsInfo(this.state).then(
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
        if (!data.science_labs) {
            errors.science_labs = 'This field is required'
        }
        if (validator.isEmpty(data.book_ratio)) {
            errors.book_ratio = 'This field is required'
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

        const {science_labs, book_ratio} = this.state
        if (show) {
            return (<Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Update School information</ModalHeader>
                    <ModalBody>

                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                                label="Number of Science Labs"
                                type="number"
                                name="science_labs"
                                value={science_labs}
                                onChange={this.onChange}
                                error={errors.science_labs}/>
                            <TextFieldGroup
                                label="Book ratio (books:students)"
                                type="text"
                                name="book_ratio"
                                value={book_ratio}
                                onChange={this.onChange}
                                error={errors.book_ratio}/>
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

UpdateLearningMetarials.propTypes = {
    show: PropTypes.bool.isRequired,
    school: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    updateSchoolLearningMaterialsInfo: PropTypes.func.isRequired,

}


export default connect(null, {updateSchoolLearningMaterialsInfo, })(UpdateLearningMetarials)