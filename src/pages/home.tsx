import styles from '../styles/Home.module.css'
import { SideNavBar } from "@/components/sideNavBar/sideNavBar"

export default function HomePage() {
    return (
        <div className={styles.background}>
            <SideNavBar />
        </div>
    )
}