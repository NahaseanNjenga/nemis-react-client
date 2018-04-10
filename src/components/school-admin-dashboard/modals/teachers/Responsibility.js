import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {relieveResponsibility, updateResponsibility} from "../../../../actions/responsibilityActions"

class Responsibility extends React.Component {

    render() {
const {responsibility,count}=this.props
    return(
        <tr>
            <th scope="row">{count}</th>
            <td>{responsibility.responsibility}</td>
            <td>{responsibility.school_upi}</td>
            <td>{new Date(responsibility.date_assigned).toDateString()}</td>
            <td>{responsibility.date_relieved?new Date(responsibility.date_relieved).toDateString():'Active'}</td>
            <td>
                {responsibility.date_relieved?'':<button className="btn btn-sm btn-warning" onClick={this.props.onRelieve} data-id={this.props.responsibility._id} data-name={this.props.responsibility.responsibility} data-date={this.props.responsibility.date_assigned} >Relieve</button>}</td>
        </tr>
    )
    }
}

/**
 * <a className="btn btn-sm btn-primary" onClick={this.props.onEdit} data-id={this.props.responsibility._id} data-name={this.props.responsibility.responsibility} data-date={this.props.responsibility.date_assigned} href="">Edit</a>
 * @type {{responsibility: *, updateResponsibility: *, relieveResponsibility: *, count: *, onEdit: *, onRelieve: *, relieved: *}}
 */

Responsibility.propTypes = {
    responsibility: PropTypes.object.isRequired,
    updateResponsibility: PropTypes.func.isRequired,
    relieveResponsibility: PropTypes.func.isRequired,
    count:PropTypes.number.isRequired,
    onEdit:PropTypes.func.isRequired,
    onRelieve:PropTypes.func.isRequired,
    // relieved:PropTypes.bool.isRequired,
}

export default connect(null,{updateResponsibility,relieveResponsibility})(Responsibility)