import { useState , useEffect } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

import Layout from '@/components/layout/layout'

import api2 from '@/pages/api/api2'
import styles from '../../styles/CadastroUsuarios.module.css'
import { HabitanteForm } from '@/components/forms/habitanteForm'

interface Endereco {
    cep: string;
    logradouro: string;
    numero?: string;
    bairro: string;
    municipio: string;
    estado: string;
}

interface FormData {
    nome: string;
    nascimento: string;
    telefone: string;
    email: string;
    idBarragem: string;
    endereco: Endereco;
}

export default function CadastroHabitante() {
    const router = useRouter()

    const [authChecked, setAuthChecked] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        nome: '',
        nascimento: '',
        telefone: '',
        email: '',
        idBarragem: '',
        endereco: {
            cep: '',
            logradouro: '',
            numero: '',
            bairro: '',
            municipio: '',
            estado: '',
        }
    })

    async function handleNewHabitante(formData: FormData) {
        const token = localStorage.getItem('token')

        const data = {
            nome: formData.nome,
            nascimento: formData.nascimento,
            telefone: formData.telefone,
            email: formData.email,
            idBarragem: formData.idBarragem,
            endereco: {
                cep: formData.endereco.cep,
                logradouro: formData.endereco.logradouro,
                numero: formData.endereco.numero,
                municipio: formData.endereco.municipio,
                bairro: formData.endereco.bairro,
                estado: formData.endereco.estado,
            }
        }

        await api2.post("api/v1/habitantes", data, {
            headers:{
                Authorization:  'Bearer ' + token
            }
        })
        .then(response => {
            if (response.status === 201) {
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Habitante cadastrado com sucesso',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  })
    
                  router.push("/habitantes/listagem")
            }
        })
        .catch(error => {
            Swal.fire({
                title: 'Erro!',
                text: 'Ocorreu erro ao cadastrar o habitante',
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
                    <span className={styles.text}>Cadastro de Habitante</span> 
                </div>
                <div>
                    <HabitanteForm handleOnSubmitFunction={handleNewHabitante} habitanteFormData={formData} />
                </div>
            </Layout>  
        </div> 
    )
}