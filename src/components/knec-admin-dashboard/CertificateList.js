import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {addCertificate, getCertificates} from "../../actions/certificateActions"
import Certificate from "./Certificate"
import jwt from "jsonwebtoken"
import UploadCertificateModal from './UploadCertficateModal'

class CertificateList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showUploadCertificateModal: false,
            role: '',
            certificateOptions: 'ALL'
        }
        const token = jwt.decode(localStorage.knecAdminJwtToken)
        if (token) {
            this.state.role = token.role
        }
        this.showUploadCertificateModal = this.showUploadCertificateModal.bind(this)
        this.closeUploadCertificateModal = this.closeUploadCertificateModal.bind(this)
    }

    showUploadCertificateModal(e) {
        e.preventDefault()
        this.setState({showUploadCertificateModal: true})
    }

    closeUploadCertificateModal() {
        this.setState({showUploadCertificateModal: false})
    }

    componentDidMount() {
        this.props.getCertificates(this.props.student_id).then(certificates => {
            if (certificates.data.performance.length > 0) {
                certificates.data.performance.map(certificate => {
                    this.props.addCertificate(certificate)
                    if (certificates.data.performance.length === 2) {
                        this.setState({certificateOptions: 'none'})
                    }
                    else if (certificate.type === 'KCPE') {
                        this.setState({certificateOptions: 'KCSE'})
                    }
                    else if (certificate.type === 'KCSE') {
                        this.setState({certificateOptions: 'KCPE'})
                    }
                })
            }
            else {
                //no certificates message
            }
        })
    }

    render() {
        let count = 1
        const {role, showUploadCertificateModal, certificateOptions} = this.state
        return (
            <div>
                {role === 'knec' ? <button className="btn btn-primary" onClick={this.showUploadCertificateModal}>Add
                    certificate</button> : ''}
                <br/>

                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.certificates.map(certificate => {
                        return <Certificate certificate={certificate} count={count++}/>
                    })}
                    </tbody>
                </table>
                <UploadCertificateModal show={showUploadCertificateModal} onClose={this.closeUploadCertificateModal}
                                        certificateOptions={certificateOptions}
                                        student_id={this.props.student_id}/>
            </div>
        )
    }
}

CertificateList
    .propTypes = {
    addCertificate: PropTypes.func.isRequired,
    getCertificates: PropTypes.func.isRequired,
    student_id: PropTypes.string.isRequired,
}

function

mapStateToProps(state) {
    return {
        certificates: state.certificateReducers
    }
}

export default connect(mapStateToProps, {getCertificates, addCertificate})

(
    CertificateList
)