import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from "@/components/layout/layout";

export default function HomePage() {
    const router = useRouter()
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token')
        
        if (!token) {
            router.push("/login")
        } else {
            setAuthChecked(true)
        }
    }, []);

    if (!authChecked) {
        return null;
    }

    return (
        <div>
            <Layout>
                <div>Seja bem vindo</div>
            </Layout>
        </div>
    )
}