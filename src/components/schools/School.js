import React from 'react'
import PropTypes from 'prop-types'
import ViewSchool from "./ViewSchool"
import UpdateSchoolDetails from "./UpdateSchoolDetails"

class School extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showViewSchoolModal: false,
        }
        this.onViewSchool = this.onViewSchool.bind(this)
        this.onCloseViewSchool = this.onCloseViewSchool.bind(this)

    }



    onViewSchool(e) {
        e.preventDefault()
        this.setState({showViewSchoolModal: true})
    }

    onCloseViewSchool(e) {
        this.setState({showViewSchoolModal: false})
    }

    render() {
        const { school,count} = this.props
        const {showViewSchoolModal, showUpdateSchoolModal} = this.state
        return (
            <tr>
                    <th scope="row">{count}</th>
                    <td>{school.upi}</td>
                    <td><a href="" onClick={this.onViewSchool}>{school.name}</a></td>
                    <td>{school.category}</td>
                    <td>{school.county ? school.county : 'N/A'}</td>

                    <ViewSchool show={showViewSchoolModal} onClose={this.onCloseViewSchool}
                                onUpdate={this.onUpdateSchool}
                                school={this.props.school}/>
                </tr>

        )
    }
}

School.propTypes = {
    school: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
}

export default School