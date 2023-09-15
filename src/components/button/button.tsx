import React, { ButtonHTMLAttributes } from 'react'
import styles from './button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

}

export function Button({ children, ...props }: ButtonProps) {
    return (
        <button className={styles.button}  {...props}>
            { children }
        </button>
    );
}