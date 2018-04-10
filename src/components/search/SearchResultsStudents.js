import React from 'react'
import PropTypes from 'prop-types'
import Student from "../students/Student"

class SearchResultsStudents extends React.Component {

    render() {
        const {students} = this.props
        let count = 1
        return (
            <div>
                        <br/>
                        {students.length > 0 ? <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Picture</th>
                                <th scope="col">UPI</th>
                                <th scope="col">Surname</th>
                                <th scope="col">Firstname</th>
                                <th scope="col">School UPI</th>
                            </tr>
                            </thead>
                            <tbody>
                            {students.map((student, i) => {
                                return <Student count={count++} student={student} key={i}/>
                            })}
                            </tbody>
                        </table> : 'No stude found'}
               </div>
    )
    }
}

SearchResultsStudents.propTypes = {
    // addStudent: PropTypes.func.isRequired,
    students: PropTypes.array.isRequired

}

// function mapStateToProps(state) {
//     return {students: state.studentReducers}
// }

export default SearchResultsStudents

