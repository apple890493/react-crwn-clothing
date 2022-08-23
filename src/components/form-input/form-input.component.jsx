import './form-input.styles.scss'

const FormInput = ({ label, ...inputProps }) => {
  return (
    <div className="group">
      <input className="form-input" {...inputProps} />
      {/* if label exsits render label otehrwise none */}
      {label && (
        <label className={`${inputProps.value ? 'shrink' : ''} form-input-label`} >{label}</label>
      )}
    </div>
  )
};

export default FormInput;