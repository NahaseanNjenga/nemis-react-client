import React from 'react'
import PropTypes from 'prop-types'
import SearchResultsStudents from "./SearchResultsStudents"
import SearchResultsTeachers from "./SearchResultsTeachers"
import SearchResultsSchools from "./SearchResultsSchools"

class SearchResults extends React.Component {
    constructor(props) {
        super(props)
        // this.state = {
        //     viewResults: false
        // }
        // this.viewResults = this.viewResults.bind(this)
        this.displayResults = this.displayResults.bind(this)
    }

    // componentDidMount() {
    //     this.setState({viewResults: false})
    // }
    //
    // viewResults(e) {
    //     e.preventDefault()
    //     this.setState({viewResults: true})
    // }

    displayResults() {
        switch (this.props.table) {
            case "students":
                return <SearchResultsStudents students={this.props.results}/>
            case "teachers":
                return <SearchResultsTeachers teachers={this.props.results}/>
            case "schools":
                return <SearchResultsSchools schools={this.props.results}/>
            default:
                return
        }
    }

    render() {
        return (<div>{this.displayResults()}</div>)

    }
}

SearchResults.propTypes = {
    results: PropTypes.array.isRequired,
    table: PropTypes.string.isRequired
}

export default SearchResults