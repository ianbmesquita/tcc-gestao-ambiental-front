import { useState , useEffect } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

import Layout from '@/components/layout/layout'

import api2 from '../api/api2'
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

export default function EdicaoHabitante() {
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

    const fetchHabitanteData = async (token: string | null) => {
        const { id } = router.query;

        await api2.get(`api/v1/habitantes/${id}`, {
            headers:{
                Authorization:  'Bearer ' + token
            }
        })
        .then(response => {
            setFormData(response.data);
        })
        .catch(error => {
            Swal.fire({
                title: 'Erro!',
                text: 'Ocorreu erro ao carregar a página',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
        });
    }

    async function handleEditHabitante(formData: FormData) {
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
                bairro: formData.endereco.bairro,
                municipio: formData.endereco.municipio,
                estado: formData.endereco.estado,
            }
        }

        const { id } = router.query;

        await api2.put(`api/v1/habitantes/${id}`, data, {
            headers:{
                Authorization:  'Bearer ' + token
            }
        })
        .then(response => {
            if (response.status === 200) {
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Habitante editado com sucesso',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  })
    
                  router.push("/habitantes/listagem")
            }
        })
        .catch(error => {
            Swal.fire({
                title: 'Erro!',
                text: 'Ocorreu erro ao editar o habitante',
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
            fetchHabitanteData(token)
        }
    }, []);

    if (!authChecked) {
        return null;
    }

    return (
        <div>
            <Layout>
                <div className="text-2xl lg:text-3xl font-bold text-gray-800 mb-10 mt-14 lg:mt-10 text-center lg:text-left">
                    <span className={styles.text}>Edição de Habitante</span> 
                </div>
                <div>
                    <HabitanteForm habitanteFormData={formData} handleOnSubmitFunction={handleEditHabitante} />
                </div>
            </Layout>  
        </div> 
    )
}