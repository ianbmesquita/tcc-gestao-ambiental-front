import { ReactNode } from "react"
import { SideNavBar } from "@/components/sideNavBar/sideNavBar"

import styles from '../styles/Home.module.css'
import CadastroUsuario from "./cadastro-usuario";

interface HomePageProps {
    children: ReactNode;
}

export default function HomePage({ children }: HomePageProps) {
    return (
        <div className={styles.background}>
            <SideNavBar />
            <main className={styles.mainContainer}>
                <CadastroUsuario />
            </main>
        </div>
    )
}