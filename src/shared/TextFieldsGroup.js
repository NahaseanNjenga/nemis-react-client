import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const TextFieldGroup = ({name,value,valueNumber, label, error, type, onChange, checkUserExists, autofocus,disabled}) => {
    return (
        <div className="form-group row">
            <label className="col-sm-3 col-form-label">{label}</label>

            <div className="col-sm-9">
                <input type={type} name={name}
                       className={classnames("form-control", {"is-invalid": error})}
                       value={value?value:valueNumber}
                       autoFocus={autofocus}
                       onChange={onChange}
                       onBlur={checkUserExists}
                       disabled={disabled?disabled:false}
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    )
}
TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    valueNumber: PropTypes.number,
    value: PropTypes.any,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    checkUserExists: PropTypes.func,
    autofocus: PropTypes.bool,
    disabled: PropTypes.bool,


}
TextFieldGroup.defaultTypes = {
    type: 'text'
}
export default TextFieldGroup