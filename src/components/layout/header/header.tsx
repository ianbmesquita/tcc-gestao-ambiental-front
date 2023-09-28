import { useEffect, useState } from 'react'
import { MdExitToApp } from "react-icons/md";
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

export function Header() {
    const router = useRouter()

    const [userName, setUserName] = useState('')

    const handleLogoutUser = async () => {
        const { isConfirmed } = await Swal.fire({
            title: 'Tem certeza?',
            text: 'Você realmente deseja encerrar a sessão?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar',
        });
    
        if (isConfirmed) {
            localStorage.removeItem("userRole")
            localStorage.removeItem("userName")
            localStorage.removeItem("token")
            localStorage.removeItem("ally-supports-cache")
            setUserName('')
    
            router.push("/login")
        }
    }

    useEffect(() => {
        const userName = localStorage.getItem('userName')
        
        if (userName) {
            setUserName(userName)
        }
    }, []);

    return (
        <div className="fixed top-0 right-0 bg-gray-200 p-4 flex items-center w-full md:p-8">
            <div className="ml-auto flex items-center">
                {userName && (
                    <div className="mr-4 text-emerald-700 text-lg font-semibold">
                        Bem vindo, {userName}
                    </div>
                )}
                <div onClick={handleLogoutUser}>
                    <MdExitToApp size={30} className="text-emerald-700" />
                </div>
            </div>
        </div>
    );
}
