import React from 'react'
import PropTypes from 'prop-types'

class Certificate extends React.Component {
    render() {
        const { certificate,count} = this.props
        const certificatePath=certificate? `http://localhost:3002/uploads/${certificate.path}` :''

        return (
            <tr>
                <th scope="row">{count}</th>
                {/*<td>{certificate.name}</td>*/}
                <td><a href="" onClick={e=>{
                    e.preventDefault()
                    window.open(certificatePath,'_blank').focus()
                }
                }>{certificate.type}</a></td>
            </tr>

        )
    }
}

Certificate.propTypes = {
    certificate: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
}

export default Certificate