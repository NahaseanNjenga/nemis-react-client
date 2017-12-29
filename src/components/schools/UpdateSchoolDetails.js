import React from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import PropTypes from 'prop-types'
import TextFieldGroup from "../../shared/TextFieldsGroup"
import validator from "validator"
import {isEmpty} from "lodash"
import {connect} from 'react-redux'
import {updateSchool, updateSchoolList} from "../../actions/schoolActions"

class UpdateSchoolDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errors: {},
            isLoading: false,
            invalid: false,
            _id : this.props.school._id,
            name : this.props.school.name,
            upi : this.props.school.upi,
            county: this.props.school.county,
            category: this.props.school.category,
            email : this.props.school.contact.email,
            phone1 : this.props.school.contact.phone1,
            phone2 : this.props.school.contact.phone2,
            address : this.props.school.contact.address,
            science_labs:this.props.school.learning_materials.science_labs,
            book_ratio : this.props.school.learning_materials.book_ratio,
            buses : this.props.school.assets.buses,
            farming_land : this.props.school.assets.farming_land,
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
            this.props.updateSchool(this.state).then(
                (school) => {
                    // this.props.addFlashMessage({
                    //     type: 'success',
                    //     text: 'You have signed up successfully. Please use the login in form below to access your account'
                    // })
                    this.props.onClose()
                    this.props.updateSchoolList(school.data)
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

        // const _id = this.props.school._id,
        //     name = this.state.name,
        //     upi = this.props.school.upi,
        //     county = this.state.county,
        //     category = this.props.school.category,
        //     email = this.props.school.contact.email,
        //     phone1 = this.props.school.contact.phone1,
        //     phone2 = this.props.school.contact.phone2,
        //     address = this.props.school.contact.address,
        //     science_labs = this.props.school.learning_materials.science_labs,
        //     book_ratio = this.props.school.learning_materials.book_ratio,
        //     buses = this.props.school.assets.buses,
        //     farming_land = this.props.school.assets.farming_land,
        //     classes = this.props.school.infrastructure.classes,
        //     playing_fields = this.props.school.infrastructure.playing_fields,
        //     halls = this.props.school.infrastructure.halls,
        //     dormitories = this.props.school.infrastructure.dormitories
        const {name, upi, assets, county, category, infrastructure, email, phone1, phone2, address, science_labs, book_ratio, buses, farming_land, classes, playing_fields, halls, dormitories} = this.state
        if (show) {
            return (<Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Update School information</ModalHeader>
                    <ModalBody>
                        <strong>The UPI is system generated and cannot be changed. The school UPI
                            is {upi}</strong>

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
                                label="Telephone 1"
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
                                error={errors.phone2}/>

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

UpdateSchoolDetails.propTypes = {
    show: PropTypes.bool.isRequired,
    school: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    updateSchool: PropTypes.func.isRequired,
    updateSchoolList: PropTypes.func.isRequired,

}


export default connect(null, {updateSchool, updateSchoolList})(UpdateSchoolDetails)