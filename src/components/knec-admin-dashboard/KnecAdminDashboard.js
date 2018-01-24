import React from 'react'
import KnecSchoolList from "./KnecSchoolList"

class KnecAdminDashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            students: []
        }
    }

    componentDidMount() {

    }

    render() {
        return (<div>
            <KnecSchoolList/>
        </div>)
    }
}

export default KnecAdminDashboard