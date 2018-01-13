import React from 'react'
import SearchResults from "./search/SearchResults"
import TextFieldGroup from "../shared/TextFieldsGroup"
import {isEmpty} from "lodash"
import validator from "validator"
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {searchStudent} from "../actions/studentActions"


class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            results: '',

            upi: '',
            errors: {},
            isLoading: false,
            invalid: false
        }

        this.onChange = this.onChange.bind(this)
        this.isValid= this.isValid.bind(this)
        this.validateInput= this.validateInput.bind(this)
        this.onSearch= this.onSearch.bind(this)
    }

    validateInput(data) {
        let errors = {}
        if (validator.isEmpty(data.upi)) {
            errors.upi = 'This field is required'
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

    onChange(e) {
        e.preventDefault()
        this.setState({upi: e.target.value})
    }

    onSearch(e) {
        e.preventDefault()
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true})
            this.props.searchStudent(this.state.upi).then(
                (student) => {
                    if (student.data) {
                        this.setState({results: student.data})
                    }
                    else {
                        this.setState({results: 'No results found'})
                    }
                },
                err => this.setState({errors: err.response.data, isLoading: false})
            )
        }
    }



    render() {
        const {results,errors} = this.state
        return (
            <div className="container">
                <div className="col-sm-6 offset-sm-3 centered">
                    <form onSubmit={this.onSearch}>
                        <TextFieldGroup name="upi" label="Search student UPI" type="text" onChange={this.onChange}
                                        autofocus={true} errorr={errors.upi}/>
                    </form>
                    {results ? <SearchResults results={results}/> : ''}
                </div>
            </div>
        )

    }
}

HomePage.propTypes={
    searchStudent:PropTypes.func.isRequired
}
export default connect(null,{searchStudent})(HomePage)