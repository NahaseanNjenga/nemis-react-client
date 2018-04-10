import React from 'react'
import PropTypes from 'prop-types'
import School from "../admin-dashboard/schools/School"


class SchoolList extends React.Component {

    render() {
        const {schools} = this.props
        let count = 1
        return (
            <div>
                {schools.length > 0 ? <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">UPI</th>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">County</th>
                    </tr>
                    </thead>
                    <tbody>
                    {schools.map((school, i) => {
                        return <School count={count++} school={school} key={i}/>
                    })}
                    </tbody>
                </table> : 'No school found'}
            </div>

        )
    }

}

SchoolList.propTypes = {
    schools: PropTypes.array.isRequired,
}
export default SchoolList
