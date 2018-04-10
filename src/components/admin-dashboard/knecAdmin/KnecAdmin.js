import React from 'react'
import NewKnecAdminForm from "./NewKnecAdminForm"
import Menu from "../Menu"
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getKnecAdmin} from "../../../actions/knecAdminActions"
import UpdateKnecAdminDetails from "./UpdateKnecAdminDetails"

class KnecAdmin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showNewKnecAdminModal: false,
            updateKnecAdmin: false,
            knecAdmin: {}
        }
        this.showNewKnecAdminModal = this.showNewKnecAdminModal.bind(this)
        this.closeKnecAdminModal = this.closeKnecAdminModal.bind(this)
        this.updateKnecAdmin = this.updateKnecAdmin.bind(this)
        this.closeUpdateKnecAdminModal = this.closeUpdateKnecAdminModal.bind(this)
    }

    updateKnecAdmin(e) {
        e.preventDefault()
        this.setState({updateKnecAdmin: true})

    }

    closeUpdateKnecAdminModal() {
        this.setState({updateKnecAdmin: false})
        this.componentDidMount()
    }

    showNewKnecAdminModal(e) {
        e.preventDefault()
        this.setState({showNewKnecAdminModal: true})
    }

    closeKnecAdminModal() {
        this.setState({showNewKnecAdminModal: false})
        this.componentDidMount()
    }

    componentDidMount() {
        this.props.getKnecAdmin().then(knecAdmin => {
            if (knecAdmin) {
                this.setState({knecAdmin: knecAdmin.data})
            }
        })
    }

    render() {
        const {showNewKnecAdminModal, knecAdmin, updateKnecAdmin} = this.state
        // console.log(knecAdmin)
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <Menu/>
                    </div>
                    <div className="col-md-9">
                        <br/>
                        <br/>
                        {!knecAdmin ? <div className="col-sm-2 offset-sm-1">
                            <button className="btn btn-sm btn-info"
                                    onClick={this.showNewKnecAdminModal}>Register Knec Admin
                            </button>
                        </div> : <div>
                            {knecAdmin.email}
                            <br/>
                            <button className="btn btn-sm btn-info" onClick={this.updateKnecAdmin}> edit</button>
                            <UpdateKnecAdminDetails onClose={this.closeUpdateKnecAdminModal} show={updateKnecAdmin}
                                                    knecAdmin={knecAdmin}/>
                        </div>
                        }
                    </div>
                </div>
                <NewKnecAdminForm onClose={this.closeKnecAdminModal} show={showNewKnecAdminModal}/>

            </div>
        )
    }
}

KnecAdmin.propTypes = {
    getKnecAdmin: PropTypes.func.isRequired
}
// function mapStateToProps(state) {
//     knecAdmin:state.knecAdminLoginReducers
// }
export default connect(null, {getKnecAdmin})(KnecAdmin)