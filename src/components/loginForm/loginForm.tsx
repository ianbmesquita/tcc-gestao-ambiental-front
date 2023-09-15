import styles from './loginForm.module.css'
import { Image } from '../image/image'
import { Input } from '../input/input'
import { Button } from '../button/button'

interface LoginProps {
    title: string
}

export function LoginForm({ title }: LoginProps) {
    return (
        <div className={styles.card}>
            <Image src="/img/logo.png" alt="Logomarca SIGAM" />
            <h2 className={styles.title}>{ title }</h2>
            <form action="/home" className={styles.form}>
                <Input type="text" placeholder="Login"/>
                <Input type="password" placeholder="Senha"/>
                <Button>Acessar</Button>
            </form>
        </div>
    )
}