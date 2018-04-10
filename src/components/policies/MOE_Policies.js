import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import MOE_Policy from "./MOE_Policy"
import {getKnecPolicies, getPublicPolicies, getSchoolPolicies} from "../../actions/policyActions"
import jwt from 'jsonwebtoken'

class MOE_Policies extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            policies: []
        }
    }

    componentDidMount() {
        if (jwt.decode(localStorage.schoolAdminJwtToken)){
            this.props.getSchoolPolicies().then(policies => {
                if (policies.data.length > 0) {
                    this.setState({policies: policies.data})
                }
            })
        }
        else if (jwt.decode(localStorage.knecAdminJwtToken)){
            this.props.getKnecPolicies().then(policies => {
                if (policies.data.length > 0) {
                    this.setState({policies: policies.data})
                }
            })
        }
        else {
            this.props.getPublicPolicies().then(policies => {
                if (policies.data.length > 0) {
                    this.setState({policies: policies.data})
                }
            })
        }
    }

    render() {
        let count = 1
        const { policies} = this.state

        return (
            <div className="container">
                <div className="row">
                        {policies.length > 0 ? <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Date</th>
                                </tr>
                                </thead>
                                <tbody>
                                {policies.map((policy, i) => {
                                    return (<MOE_Policy key={i} policy={policy} count={count++}/>)
                                })}
                                </tbody>
                            </table>
                            : 'No policies found'}
                    </div>
                </div>
        )
    }
}

MOE_Policies.propTypes = {
    getPublicPolicies: PropTypes.func.isRequired,
    getKnecPolicies: PropTypes.func.isRequired,
    getSchoolPolicies: PropTypes.func.isRequired,
}


export default connect(null, {getPublicPolicies,getKnecPolicies,getSchoolPolicies})(MOE_Policies)