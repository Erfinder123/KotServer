
export interface INavigationItem {
    className: string
    src: string
    alt: string
    url: string
}

interface IImageButtonProps {
    className: string,
    src: string,
    alt?: string,
    onClick?: () => void,
}
function BaseButtonComponent({className, src, alt="", onClick=() => {}}: IImageButtonProps) {
    return (
        <button
            className={className}
            style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer'
            }}
            onClick={onClick}
        >
            <img src={src} alt={alt} />
        </button>
        
    )
}

export default BaseButtonComponent
