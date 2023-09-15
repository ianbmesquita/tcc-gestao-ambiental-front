import styles from './image.module.css'

interface ImageProps {
    src: string;
    alt?: string;
}

export function Image({ ...props }: ImageProps) {
    return (
        <div className={styles.container}>
            <img className={styles.img} {...props} />
        </div>
    )
}