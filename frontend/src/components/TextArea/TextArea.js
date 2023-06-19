const TextArea = ({placeholder, value, onChange, className}) => {
    const classes = className ? `resize-none border-2 rounded-xl p-2.5 ${className}` : "resize-none border-2 rounded-xl p-2.5"
    return(
        <textarea rows={4} className={classes} class="resize-none border-2 rounded-xl p-2.5" onChange={onChange} placeholder={placeholder}>{value}</textarea>
    )
}

export default TextArea;