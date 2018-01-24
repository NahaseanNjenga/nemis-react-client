import React from 'react'
import PropTypes from 'prop-types'
import {addSchool, clearSchools, getSchools} from "../../actions/schoolActions"
import connect from "react-redux/es/connect/connect"
import KnecSchool from "./KnecSchool"

class KnecSchoolList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showNewSchoolModal: false,
            schools: ''
        }
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
        this.props.clearSchools()
        this.props.getSchools().then(schools => {
            if (schools) {
                schools.data.map(school => {
                    this.props.addSchool(school)
                })
                this.setState({schools: schools.data})
            } else {
                //No schools message
            }
        })
    }

    onChange(e) {
        const {schools} = this.state
        let arr_results = []
        this.props.clearSchools()
        for (let i = 0; i < schools.length; i++) {
            let exp = new RegExp(e.target.value, 'i')
            if (schools[i].upi.match(exp)) {
                arr_results.push(schools[i])
                this.props.addSchool(schools[i])
            }
        }
    }

    render() {
        const {schools} = this.props
        let count = 1
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12" >
                        <br/>
                        <h1>Knec admin Dashboard</h1>
                        <br/>
                        <h4>List of all seconday and primary schools</h4>
                        <div className="row">
                            <div className="col-sm-6">
                                <form>
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Search School UPI"
                                               aria-label="Search School UPI" aria-describedby="basic-addon1"
                                               onChange={this.onChange}/>
                                        <span className="input-group-addon" id="basic-addon1"><i
                                            className="fa fa-search"></i></span>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <br/>
                        {schools.length > 0 ? <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">UPI</th>
                                <th scope="col">Name</th>
                                <th scope="col">Category</th>
                                <th scope="col">County</th>
                            </tr>
                            </thead>
                            <tbody>
                            {schools.map((school, i) => {
                                if (school.category === 'secondary' || school.category === 'primary')
                                    return <KnecSchool count={count++} school={school} key={i}/>
                            })}
                            </tbody>
                        </table> : 'No school found'}
                    </div>
                </div>
            </div>)
    }

}

KnecSchoolList.propTypes = {
    addSchool: PropTypes.func.isRequired,
    getSchools: PropTypes.func.isRequired,
    schools: PropTypes.array.isRequired,
    clearSchools: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {schools: state.schoolReducers}
}

export default connect(mapStateToProps, {addSchool, getSchools, clearSchools})(KnecSchoolList)
