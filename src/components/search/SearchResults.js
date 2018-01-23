import React from 'react'
import PropTypes from 'prop-types'

const AllResults = ({student}) => {
    return (<table className="table">
        <thead>
        <tr>
            <th scope="col">Category</th>
            <th scope="col">Value</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <th scope="row">UPI:</th>
            <td>{student.upi}</td>
        </tr>
        <tr>
            <th scope="row">Surname:</th>
            <td>{student.surname}</td>
        </tr>
        <tr>
            <th scope="row">First name:</th>
            <td>{student.first_name}</td>
        </tr>
        <tr>
            <th scope="row">Last name:</th>
            <td>{student.last_name ? student.last_name : 'N/A'}</td>
        </tr>
        <tr>
            <th scope="row">Gender:</th>
            <td>{student.gender}</td>
        </tr>
        <tr>
            <th scope="row">Date of birth</th>
            <td>{new Date(student.birthdate).toDateString()}</td>
        </tr>

        <tr>
            <th scope="row">Current school:</th>
            <td>{student.transfers ? student.transfers.current_school : ''}</td>
        </tr>
        </tbody>
    </table>)
}

class SearchResults extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            viewResults: false
        }
        this.viewResults = this.viewResults.bind(this)
    }

    componentDidMount() {
        this.setState({viewResults: false})
    }

    viewResults(e) {
        e.preventDefault()
        this.setState({viewResults: true})

    }

    render() {
        const {results} = this.props
        const {viewResults} = this.state
        return (<div>
            {results === 'No results found' ? <p>No results found. Make sure your search is in the format AA-BB-00</p> :
                <AllResults student={results}/>}

            {/*{viewResults ?  : ''}*/}
        </div>)
    }
}

SearchResults.propTypes = {
    results: PropTypes.object.isRequired
}

export default SearchResults