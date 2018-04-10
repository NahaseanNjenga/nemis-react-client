"use strict"
import React from 'react'
import PropTypes from 'prop-types'
import Teacher from "../teachers/Teacher"
class SearchResultsTeachers extends React.Component{

    render() {
        const {teachers} = this.props
        let count = 1
        return (
            <div>
                {teachers.length > 0 ? <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Picture</th>
                        <th scope="col">TSC Id</th>
                        <th scope="col">Surname</th>
                        <th scope="col">First name</th>
                        <th scope="col">Date of Employment</th>
                    </tr>
                    </thead>
                    <tbody>
                    {teachers.map((teacher, i) => {
                        return <Teacher count={count++} teacher={teacher} key={i}/>
                    })}
                    </tbody>
                </table> : 'No teachers found'}

            </div>)
    }

}

SearchResultsTeachers.propTypes={
    teachers: PropTypes.array.isRequired,
}

export default SearchResultsTeachers

