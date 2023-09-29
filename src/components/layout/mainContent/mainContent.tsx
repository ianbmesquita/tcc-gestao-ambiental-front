import { ReactNode } from 'react'

import styles from './mainContent.module.css'

interface ContentProps {
    children: ReactNode
}

export function MainContent({ children }: ContentProps) {
    return (
        <main className={styles.mainContainer}>{ children }</main>
    )
}