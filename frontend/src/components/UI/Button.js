import * as styles from "./Button.module.css"

const Button = ({children, className, variant, disabled, onClick}) => {
    const classNames = variant === 'grey' ? `transition-all ${styles.button} ${styles.grey} px-5 rounded-lg ${className}` : `transition-all ${styles.button} ${styles.green} px-5 rounded-lg ${className}`; 
    
    return (
        <button disabled={disabled} onClick={() => onClick()} className={classNames}>
            {children}
        </button>
    )
}

export default Button;