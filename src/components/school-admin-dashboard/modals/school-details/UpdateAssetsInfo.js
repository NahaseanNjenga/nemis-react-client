import React from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import PropTypes from 'prop-types'

import validator from "validator"
import {isEmpty} from "lodash"
import {connect} from 'react-redux'
import {updateSchoolAssetsInfo, updateSchoolList} from "../../../../actions/schoolActions"
import TextFieldGroup from "../../../../shared/TextFieldsGroup"

class UpdateAssetInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errors: {},
            isLoading: false,
            invalid: false,
            _id : this.props.school._id,
            buses : this.props.school.assets.buses,
            farming_land : this.props.school.assets.farming_land,
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
            this.props.updateSchoolAssetsInfo(this.state).then(
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
        if (!data.buses) {
            errors.buses = 'This field is required'
        }
        if (!data.farming_land) {
            errors.farming_land = 'This field is required'
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

        const { buses, farming_land} = this.state
        if (show) {
            return (<Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Update School information</ModalHeader>
                    <ModalBody>

                        <form onSubmit={this.onSubmit}>

                            <TextFieldGroup
                                label="Buses"
                                type="number"
                                name="buses"
                                value={buses}
                                onChange={this.onChange}
                                error={errors.buses}/>
                            <TextFieldGroup
                                label="Farming land (number of acres)"
                                type="number"
                                name="farming_land"
                                value={farming_land}
                                onChange={this.onChange}
                                error={errors.farming_land}/>

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

UpdateAssetInfo.propTypes = {
    show: PropTypes.bool.isRequired,
    school: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    updateSchoolAssetsInfo: PropTypes.func.isRequired,
    updateSchoolList: PropTypes.func,

}


export default connect(null, {updateSchoolAssetsInfo, updateSchoolList})(UpdateAssetInfo)