import React from 'react'
import PropTypes from 'prop-types'
import validator from 'validator'
import {isEmpty} from 'lodash'
import TextFieldGroup from '../../shared/TextFieldsGroup'
import {registerDeceased} from "./deathActions"
import {connect} from 'react-redux'

class DeathRegistration extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            dod: '',
            cod:'',
            nationalID: '',
            errors: {},
            isLoading: false,
            invalid: false

        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }


    validateInput(data) {
        let errors = {}
        // if (validator.isEmpty(data.name)) {
        //     errors.name = 'This field is required'
        // }
        if (validator.isEmpty(data.cod)) {
            errors.cod = 'This field is required'
        }
        if (validator.isEmpty(data.dod)) {
            errors.dod = 'This field is required'
        }
        if (!data.nationalID) {
            errors.nationalID = 'This field is required'
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
            this.props.registerDeceased(this.state).then(
                (teacher) => {
                    window.location.reload()
                },
                err => this.setState({errors: err.response.data, isLoading: false})
            )
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {errors, name, dod, nationalID,cod,} = this.state
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 offset-sm-2">
                        <br/>
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                                label="Name"
                                type="text"
                                name="name"
                                value={name}
                                onChange={this.onChange}
                                error={errors.name}
                            />

                            <TextFieldGroup
                                label="Date of death"
                                type="date"
                                name="dod"
                                value={dod}
                                onChange={this.onChange}
                                error={errors.dod}
                            />

                            <TextFieldGroup
                                label="National ID (adults)"
                                type="number"
                                name="nationalID"
                                value={nationalID}
                                onChange={this.onChange}
                                error={errors.nationalID}
                            />
                            <TextFieldGroup
                                label="Cause of death "
                                type="text"
                                name="cod"
                                value={cod}
                                onChange={this.onChange}
                                error={errors.cod}
                            />
                            <div className="form-group">
                                <TextFieldGroup
                                    label=""
                                    type="submit"
                                    name="save"
                                    value="Save"
                                    className="btn btn-sm btn-primary"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )

    }

}


DeathRegistration.propTypes = {
    registerDeceased: PropTypes.func.isRequired,
}

export default connect(null, {registerDeceased,})(DeathRegistration)

