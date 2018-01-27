import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Policy from "./Policy"
import { getPolicies} from "../../../actions/policyActions"
import UploadPolicyDocumentModal from "./modals/UploadPolicyDocumentModal"
import Menu from "../Menu"

class Policies extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showUploadPolicyModal: false,
            policies:[]
        }
        this.showUploadPolicyModal = this.showUploadPolicyModal.bind(this)
        this.closeUploadPolicyModal = this.closeUploadPolicyModal.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)

    }



    showUploadPolicyModal(e) {
        e.preventDefault()
        this.setState({showUploadPolicyModal: true})
    }

    closeUploadPolicyModal() {
        this.componentDidMount()
        this.setState({showUploadPolicyModal: false})
    }

    componentDidMount() {
        this.props.getPolicies().then(policies => {
            if (policies.data.length > 0) {
                this.setState({policies:policies.data})
                // policies.data.map(policy => {
                //     this.props.addPolicy(policy)
                // })
            }
            else {
                //no policies message
            }
        })
    }

    render() {
        let count = 1
        const {showUploadPolicyModal, policyOptions,policies} = this.state

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <Menu/>
                    </div>
                    <div className="col-md-9">
                        <br/>
                        <button className="btn btn-primary btn-sm" onClick={this.showUploadPolicyModal}>Add
                            policy
                        </button>
                        <br/>

                        {policies.length > 0 ? <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Scope</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {policies.map((policy,i) => {
                                    return (<Policy key={i} policy={policy} count={count++} componentDidMount={this.componentDidMount}/>)
                                })}
                                </tbody>
                            </table>
                            : 'No policies found'}
                        <UploadPolicyDocumentModal show={showUploadPolicyModal}
                                                   onClose={this.closeUploadPolicyModal}/>
                    </div>
                </div>
            </div>
        )
    }
}

Policies.propTypes = {
    // addPolicy: PropTypes.func.isRequired,
    getPolicies: PropTypes.func.isRequired,
    // clearPolicies: PropTypes.func.isRequired,
    // policies:PropTypes.array.isRequired
}

// function mapStateToProps(state) {
//     return {
//         policies: state.policyReducers
//     }
// }

export default connect(null, {getPolicies,})(Policies)