import { useState , useEffect } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

import Layout from '@/components/layout/layout'

import api2 from '@/pages/api/api2'
import styles from '../../styles/CadastroUsuarios.module.css'
import { AvaliacaoForm } from '@/components/forms/avaliacaoForm'

interface FormData {
    idBarragem: number;
    dataHora: string;
    grauRisco: string;
    alerta: string;
    origem: string;
}

export default function CadastroAvaliacao() {
    const router = useRouter()

    const [authChecked, setAuthChecked] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        idBarragem: 0,
        dataHora: '',
        grauRisco: '',
        alerta: '',
        origem: ''
    })

    async function handleNewAvaliacao(formData: FormData) {
        const token = localStorage.getItem('token')

        console.log(formData)

        const data = {
            dataHora: formData.dataHora,
            grauRisco: formData.grauRisco,
            alerta: formData.alerta,
            origem: formData.origem,
            idBarragem: formData.idBarragem,
        }

        await api2.post("api/v1/incidentes", data, {
            headers:{
                Authorization:  'Bearer ' + token
            }
        })
        .then(response => {
            if (response.status === 201) {
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Avaliação cadastrada com sucesso',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  })
    
                  router.push("/avaliacoes/listagem")
            }
        })
        .catch(error => {
            Swal.fire({
                title: 'Erro!',
                text: 'Ocorreu erro ao cadastrar a avaliação',
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
                    <span className={styles.text}>Cadastro de Avaliação</span> 
                </div>
                <div>
                    <AvaliacaoForm handleOnSubmitFunction={handleNewAvaliacao} avaliacaoFormData={formData} />
                </div>
            </Layout>  
        </div> 
    )
}