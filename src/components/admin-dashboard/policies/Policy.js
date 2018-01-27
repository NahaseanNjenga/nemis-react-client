import React from 'react'
import PropTypes from 'prop-types'
import UpdatePolicyModal from "./modals/UpdatePolicyModal"
import PublishModal from "./modals/PublishModal"
import UnpublishModal from "./modals/UnpublishModal"
import ConfirmDeletePolicy from "./modals/ConfirmDeletePolicy"

class Policy extends React.Component {
constructor(props){
    super(props)
    this.state= {
        publish: false,
        unpublish: false,
        editPolicy: false,
        deletePolicy: false
    }
        this.showPublishModal = this.showPublishModal.bind(this)
    this.closePublishModal = this.closePublishModal.bind(this)
    this.showUnpublishModal = this.showUnpublishModal.bind(this)
    this.closeUnpublishModal = this.closeUnpublishModal.bind(this)
    this.showEditModal = this.showEditModal.bind(this)
    this.closeEditModal = this.closeEditModal.bind(this)
    this.showDeleteModal = this.showDeleteModal.bind(this)
    this.closeDeleteModal = this.closeDeleteModal.bind(this)
    }
    showPublishModal(e) {
        e.preventDefault()
        this.setState({publish: true})

    }

    closePublishModal() {
        this.setState({publish: false})
        this.props.componentDidMount()
    }

    showUnpublishModal(e) {
        e.preventDefault()
        this.setState({unpublish: true})
    }

    closeUnpublishModal() {
        this.setState({unpublish: false})
        this.props.componentDidMount()
    }

    showEditModal(e) {
        e.preventDefault()
        this.setState({editPolicy: true})
    }

    closeEditModal() {
        this.setState({editPolicy: false})
        this.props.componentDidMount()
    }

    showDeleteModal(e) {
        e.preventDefault()
        this.setState({deletePolicy: true})
    }

    closeDeleteModal() {
        this.setState({deletePolicy: false})
        this.props.componentDidMount()
    }

    render() {
        const { publish,editPolicy, deletePolicy,unpublish} = this.state
        const {policy, count,}=this.props

        const policyPath = policy ? `http://localhost:3002/uploads/${policy.path}` : ''
        const edit = <button className="btn btn-primary btn-sm" onClick={this.showEditModal} name={policy.title}>edit</button>
        const deleteButton = <button className="btn btn-danger btn-sm" onClick={this.showDeleteModal}>delete</button>
        const publishing = policy.scope !== 'unpublished' ?
            <button className="btn btn-sm btn-warning" onClick={this.showUnpublishModal}>unpublish</button> :
            <button className="btn btn-sm btn-info " onClick={this.showPublishModal}>publish</button>
        const actions =
            <div className="btn-group" role="group" aria-label="Basic example">
                {edit}
                {deleteButton}
                {publishing}
            </div>

        return (
            <tr>
                <th scope="row">{count}</th>
                <td><a href="" onClick={e => {
                    e.preventDefault()
                    window.open(policyPath, '_blank').focus()
                }
                }>{policy.title}</a></td>
                <td>{policy.scope}</td>
                <td>{actions}</td>
                <UpdatePolicyModal show={editPolicy} onClose={this.closeEditModal} policy={policy}/>
                <PublishModal show={publish} policy={policy} onClose={this.closePublishModal}/>
                <UnpublishModal show={unpublish} policy={policy} onClose={this.closeUnpublishModal}/>
                <ConfirmDeletePolicy show={deletePolicy} policy={policy} onClose={this.closeDeleteModal}/>
            </tr>
        )
    }
}

Policy.propTypes = {
    policy: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    componentDidMount: PropTypes.func.isRequired,
}

export default Policy