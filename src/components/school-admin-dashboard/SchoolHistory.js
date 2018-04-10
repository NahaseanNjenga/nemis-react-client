import React from 'react'
import SchoolAdminMenu from './SchoolAdminMenu'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getSchoolHistory} from "../../actions/schoolActions"
import jwt from 'jsonwebtoken'
import AddSchoolHistory from "./modals/school-details/AddSchoolHistory"
import UpdateSchoolHistory from "./modals/school-details/UpdateSchoolHistory"

class SchoolHistory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            school_history: '',
            addHistoryModal: false,
            updateHistoryModal: false,
            school_upi: ''
        }
        const token = jwt.decode(localStorage.schoolAdminJwtToken)
        if (token) {
            this.state.school_upi = token.school_upi
        }
        this.addHistory = this.addHistory.bind(this)
        this.closeAddHistory = this.closeAddHistory.bind(this)
        this.onShowUpdateHistoryModal = this.onShowUpdateHistoryModal.bind(this)
        this.closeUpdateHistoryModal = this.closeUpdateHistoryModal.bind(this)
    }

    onShowUpdateHistoryModal(e) {
        this.setState({updateHistoryModal: true})
    }

    closeUpdateHistoryModal() {
        this.setState({updateHistoryModal: false})
        this.componentDidMount()
    }

    addHistory(e) {
        e.preventDefault()
        this.setState({addHistoryModal: true})
    }

    closeAddHistory() {
        this.setState({addHistoryModal: false})
        this.componentDidMount()
    }

    componentDidMount() {
        this.props.getSchoolHistory(this.state.school_upi).then(school_history => {
            this.setState({school_history: school_history.data.history})
        })
    }

    render() {
        const {school_history, addHistoryModal, school_upi, updateHistoryModal} = this.state
        const addHistory = <div>
            <h3>There is no history found</h3>
            <button className="btn btn-primary" onClick={this.addHistory}>Add History</button>
        </div>
        const schoolHistory = <div>
            <h1>School history</h1>
            <button className="btn btn-sm btn-success" onClick={this.onShowUpdateHistoryModal}> Update school history
            </button>
            <p>{school_history}</p>
        </div>
        return (<div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-2'>
                        <SchoolAdminMenu/>
                    </div>
                    <div className='col-md-9'>
                        <br/>
                        {school_history ? schoolHistory : addHistory}
                    </div>
                    <AddSchoolHistory show={addHistoryModal} onClose={this.closeAddHistory} school_upi={school_upi}/>
                    {school_history? <UpdateSchoolHistory school_upi={school_upi} onClose={this.closeUpdateHistoryModal}
                                         show={updateHistoryModal} history={school_history}/>:''}
                </div>
            </div>
        )

    }
}

SchoolHistory.propType = {
    getSchoolHistory: PropTypes.func.isRequired
}

export default connect(null, {getSchoolHistory})(SchoolHistory)