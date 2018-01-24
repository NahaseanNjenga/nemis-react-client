import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {relieveResponsibility, updateResponsibility} from "../../../../actions/responsibilityActions"
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import TextFieldGroup from "../../../../shared/TextFieldsGroup"
import {clearTeacher, removeTeacher} from "../../../../actions/teacherActions"

class ClearTeacher extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date_cleared: '',
            errors: {},
            isLoading: false,
            invalid: false

        }
        this.onClear = this.onClear.bind(this)
        this.onChange = this.onChange.bind(this)

    }

    onClear(e) {
        e.preventDefault()
        let {date_cleared,} = this.state
        if (!date_cleared)
            date_cleared = new Date()
        const teacher = {
            teacher_id: this.props.teacher_id,
            date_cleared: date_cleared
        }
        this.props.clearTeacher(teacher).then(teacher => {
            this.props.removeTeacher(teacher.data)
            this.props.onClose()
        })
    }

    onChange(e) {
        this.setState({date_cleared: e.target.value})
    }

    render() {
        const {show, onClose} = this.props
        const {date_cleared, errors, isLoading, invalid} = this.state
        if (show) {
            return (<Modal isOpen={show} toggle={onClose} size="lg">
                <ModalHeader toggle={onClose}>Clear Teacher</ModalHeader>
                <ModalBody>
                    <form onSubmit={this.onClear}>
                        <div className="alert alert-primary" role="alert">
                            Leave blank to automatically take today's date
                        </div>
                        <TextFieldGroup
                            label="Date of clearance."
                            type="date"
                            name="dob" max={new Date()}
                            value={date_cleared}
                            onChange={this.onChange}
                            error={errors.dob}
                        />
                        <div className="form-group">
                            <button disabled={isLoading || invalid} className="btn btn-warning btn-sm"
                                    type="submit">Clear
                            </button>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={onClose}>Cancel</Button>{' '}
                </ModalFooter>
            </Modal>)
        }
        else return null

    }
}

ClearTeacher.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    teacher_id: PropTypes.string.isRequired,
    clearTeacher: PropTypes.func.isRequired,
    removeTeacher: PropTypes.func.isRequired,
}
export default connect(null, {clearTeacher, removeTeacher})(ClearTeacher)