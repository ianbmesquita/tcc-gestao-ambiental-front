import { useState } from 'react'
import { useRouter } from 'next/router';
import Swal from 'sweetalert2'

import { Image } from '../image/image'
import { Input } from '../input/input'
import { Button } from '../button/button'

import api from '@/pages/api/api'
import styles from './loginForm.module.css'

interface LoginProps {
    title: string
}

export function LoginForm({ title }: LoginProps) {
    const router = useRouter()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    async function handleLogin(event: React.FormEvent) {
        event.preventDefault();

        const data = {
            login,
            password
        }

        try {
            const response = await api.post("api/v1/auth/login", data)

            if (response.status === 200 && response.data.token !== null) {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('userName', response.data.name)
                localStorage.setItem('userRole', response.data.role )
     
                router.push("/home")
            }
        } catch {
            Swal.fire({
                title: 'Erro!',
                text: 'Login ou senha incorretos',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
        }
    }

    return (
        <div className={styles.card}>
            <Image src="/img/logo.png" alt="Logomarca SIGAM" />
            <h2 className={styles.title}>{ title }</h2>
            <form className={styles.form} onSubmit={handleLogin}>
                <Input type="text" placeholder="Login" onChange={e=>setLogin(e.target.value)} />
                <Input type="password" placeholder="Senha" onChange={e=>setPassword(e.target.value)} />
                <Button>Acessar</Button>
            </form>
        </div>
    )
}