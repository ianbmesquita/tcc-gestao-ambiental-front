import { useState , useEffect } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

import Layout from '@/components/layout/layout'

import api2 from '@/pages/api/api2'
import styles from '../../styles/CadastroUsuarios.module.css'
import { BarragemForm } from '@/components/forms/barragemForm'

interface FormData {
    nome: string;
    status: string;
    tipo: string;
    municipio: string;
    estado: string;
    latitude: string;
    longitude: string;
    risco: string;
}

export default function CadastroBarragem() {
    const router = useRouter()

    const [authChecked, setAuthChecked] = useState(false);

    const barragemFormData = {
        nome: '',
        status: '',
        tipo: '',
        municipio: '',
        estado: '',
        latitude: '',
        longitude: '',
        risco: ''
    }

    async function handleNewBarragem(formData: FormData) {
        const token = localStorage.getItem('token')

        const data = {
            nome: formData.nome,
            status: formData.status,
            tipo: formData.tipo,
            municipio: formData.municipio,
            estado: formData.estado,
            risco: formData.risco,
            latitude: formData.latitude,
            longitude: formData.longitude
        }

        await api2.post("api/v1/barragens", data, {
            headers:{
                Authorization:  'Bearer ' + token
            }
        })
        .then(response => {
            if (response.status === 201) {
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Barragem cadastrada com sucesso',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  })
    
                  router.push("/barragens")
            }
        })
        .catch(error => {
            Swal.fire({
                title: 'Erro!',
                text: 'Ocorreu erro ao cadastrar a barragem',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
        })
    }

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
                <div className="text-2xl lg:text-3xl font-bold text-gray-800 mb-10 mt-14 lg:mt-10 text-center lg:text-left">
                    <span className={styles.text}>Cadastro de Barragem</span> 
                </div>
                <div>
                    <BarragemForm handleOnSubmitFunction={handleNewBarragem} barragemFormData={barragemFormData}/>
                </div>
            </Layout>  
        </div> 
    )
}