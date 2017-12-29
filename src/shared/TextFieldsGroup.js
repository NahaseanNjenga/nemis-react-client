import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const TextFieldGroup = ({name,value,valueNumber, label, error, type, onChange, checkUserExists, autofocus}) => {
    return (
        <div className="form-group">
            <label className="control-label">{label}</label>
            <input type={type} name={name}
                   className={classnames("form-control", {"is-invalid": error})}
                   value={value?value:valueNumber}
                   autoFocus={autofocus}
                   onChange={onChange}
                   onBlur={checkUserExists}/>

            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}
TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    valueNumber: PropTypes.number,
    value: PropTypes.string,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    checkUserExists: PropTypes.func,
    autofocus: PropTypes.bool

}
TextFieldGroup.defaultTypes = {
    type: 'text'
}
export default TextFieldGroup