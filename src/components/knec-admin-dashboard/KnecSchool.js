import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from "react-router-dom"

class School extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showCandidates: false,
            candidates: []
        }
        this.onCandidates = this.onCandidates.bind(this)
        this.onCloseCandidates = this.onCloseCandidates.bind(this)
    }

    onCandidates(e) {
        e.preventDefault()
        this.context.router.history.push(`/knec_admin/${e.target.name}`)
    }

    onCloseCandidates(e) {
        this.setState({showCandidates: false})
    }

    render() {
        const {school, count} = this.props
        const route=`/knec_admin/${school.upi}`
        return (
            <tr>
                <th scope="row">{count}</th>
                <td>{school.upi}</td>
                <td><Link to={route}>{school.name}</Link></td>
                <td>{school.category}</td>
                <td>{school.county ? school.county : 'N/A'}</td>
            </tr>
        )
    }
}

School.propTypes = {
    school: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
}
School.contextTypes = {
    router: PropTypes.object.isRequired
}
export default connect(null,{})(School)