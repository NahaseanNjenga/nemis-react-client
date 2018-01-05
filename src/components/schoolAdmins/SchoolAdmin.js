import React from 'react'
import PropTypes from 'prop-types'
import ViewSchoolAdmin from "./ViewSchoolAdmin"
import UpdateSchoolAdminDetails from "./UpdateSchoolAdminDetails"

class SchoolAdmin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showViewSchoolAdminModal: false,
        }
        this.onViewSchoolAdmin = this.onViewSchoolAdmin.bind(this)
        this.onCloseViewSchoolAdmin = this.onCloseViewSchoolAdmin.bind(this)
    }

    onViewSchoolAdmin(e) {
        e.preventDefault()
        this.setState({showViewSchoolAdminModal: true})
    }

    onCloseViewSchoolAdmin(e) {
        this.setState({showViewSchoolAdminModal: false})
    }

    render() {
        const { schoolAdmin,count} = this.props
        const {showViewSchoolAdminModal} = this.state
        return (
            <tr>
                <th scope="row">{count}</th>
                <td>{schoolAdmin.school_upi}</td>
                <td><a href="" onClick={this.onViewSchoolAdmin}>{schoolAdmin.username}</a></td>

                <ViewSchoolAdmin show={showViewSchoolAdminModal} onClose={this.onCloseViewSchoolAdmin}
                            schoolAdmin={this.props.schoolAdmin}/>
            </tr>

        )
    }
}

SchoolAdmin.propTypes = {
    schoolAdmin: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
}

export default SchoolAdmin