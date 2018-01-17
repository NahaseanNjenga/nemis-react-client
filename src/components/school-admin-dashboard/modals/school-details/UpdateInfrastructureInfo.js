import React from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import PropTypes from 'prop-types'

import validator from "validator"
import {isEmpty} from "lodash"
import {updateSchoolInfrastructureInfo, updateSchoolList} from "../../../../actions/schoolActions"
import TextFieldGroup from "../../../../shared/TextFieldsGroup"
import {connect} from "react-redux"

class UpdateInfrastructureInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errors: {},
            isLoading: false,
            invalid: false,
            _id : this.props.school._id,
            classes: this.props.school.infrastructure.classes,
            playing_fields: this.props.school.infrastructure.playing_fields,
            halls : this.props.school.infrastructure.halls,
            dormitories : this.props.school.infrastructure.dormitories
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
            this.props.updateSchoolInfrastructureInfo(this.state).then(
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
        if (!data.classes) {
            errors.classes = 'This field is required'
        }
        if (!data.playing_fields){
            errors.playing_fields = 'This field is required'
        }
        if (!data.halls) {
            errors.halls = 'This field is required'
        }
        if (!data.dormitories) {
            errors.dormitories = 'This field is required'
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

        const {classes, playing_fields, halls, dormitories} = this.state
        if (show) {
            return (<Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Update School information</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onSubmit}>

                            <TextFieldGroup
                                label="Classes"
                                type="number"
                                name="classes"
                                value={classes}
                                onChange={this.onChange}
                                error={errors.classes}/>
                            <TextFieldGroup
                                label="Playing fields"
                                type="number"
                                name="playing_fields"
                                value={playing_fields}
                                onChange={this.onChange}
                                error={errors.playing_fields}/>
                            <TextFieldGroup
                                label="Halls"
                                type="number"
                                name="halls"
                                value={halls}
                                onChange={this.onChange}
                                error={errors.halls}/>
                            <TextFieldGroup
                                label="Dormitories"
                                type="number"
                                name="dormitories"
                                value={dormitories}
                                onChange={this.onChange}
                                error={errors.dormitories}/>


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

UpdateInfrastructureInfo.propTypes = {
    show: PropTypes.bool.isRequired,
    school: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    updateSchoolInfrastructureInfo: PropTypes.func.isRequired,
    updateSchoolList: PropTypes.func,

}


export default connect(null, {updateSchoolInfrastructureInfo, updateSchoolList})(UpdateInfrastructureInfo)