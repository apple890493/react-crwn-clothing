import './button.styles.scss';

/* common style for default / invention / inverted , but default no need to build */
const BUTTON_TYPE_CLASS = {
  google: 'google-sign-in',
  inverted: 'inverted'
};

const Button = ({ buttonTitle, buttonType, ...inputProps }) => {
  return (
    <button className={`button-container ${BUTTON_TYPE_CLASS[buttonType]}`} {...inputProps}>
      {buttonTitle}
    </button>
  )
};

export default Button;