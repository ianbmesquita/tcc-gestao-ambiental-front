import styles from '../styles/Login.module.css'
import { LoginForm } from "@/components/forms/loginForm/loginForm"

export default function LoginPage() {
    return (
        <div className={styles.background}>
            <LoginForm title="Autenticação de Usuário" />
        </div>
    )
}