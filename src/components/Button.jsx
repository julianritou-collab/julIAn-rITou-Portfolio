function Button({
    children,
    variant = 'primary',
    size = 'medium',
    onClick,
    disabled = false,
    className = '',
    type = 'button',
    href,
    ...rest
}) {
    const buttonClass = `btn btn--${variant} btn--${size} ${className}`.trim()

    if (href) {
        return (
            <a href={href} className={buttonClass} {...rest}>
                {children}
            </a>
        )
    }

    return (
        <button type={type} className={buttonClass} onClick={onClick} disabled={disabled} {...rest}>
            {children}
        </button>
    )
}

export default Button
