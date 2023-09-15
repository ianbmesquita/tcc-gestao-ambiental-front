import styles from '../styles/Login.module.css'
import { LoginForm } from "@/components/loginForm/loginForm"

export default function LoginPage() {
    return (
        <div className={styles.background}>
            <LoginForm title="Autenticação de usuário" />
        </div>
    )
}