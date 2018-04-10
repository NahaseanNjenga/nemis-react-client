import React from 'react'
import PropTypes from 'prop-types'
class MOE_Policy extends React.Component {

    render() {
        const {policy, count,}=this.props

        const policyPath = policy ? `http://localhost:3002/uploads/${policy.path}` : ''

        return (
            <tr>
                <th scope="row">{count}</th>
                <td><a href="" onClick={e => {
                    e.preventDefault()
                    window.open(policyPath, '_blank').focus()
                }
                }>{policy.title}</a></td>
                <td>{new Date(policy.timestamp).toDateString()}</td>

            </tr>
        )
    }
}

MOE_Policy.propTypes = {
    policy: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,

}

export default MOE_Policy