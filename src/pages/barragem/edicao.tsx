import { useState , useEffect } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

import Layout from '@/components/layout/layout'

import api2 from '../api/api2'
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

export default function EdicaoBarragem() {
    const router = useRouter()

    const [authChecked, setAuthChecked] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        nome: '',
        status: '',
        tipo: '',
        municipio: '',
        estado: '',
        latitude: '',
        longitude: '',
        risco: ''
    });
    
    const fetchBarragemData = async (token: string | null) => {
        const { id } = router.query;

        await api2.get(`api/v1/barragens/${id}`, {
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
                text: 'Ocorreu erro ao editar a barragem',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
        });
    }

    async function handleEditBarragem(formData: FormData) {
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

        const { id } = router.query;

        await api2.put(`api/v1/barragens/${id}`, data, {
            headers:{
                Authorization:  'Bearer ' + token
            }
        })
        .then(response => {
            if (response.status === 200) {
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Barragem editada com sucesso',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  })
    
                  router.push("/barragens")
            }
        })
        .catch(error => {
            Swal.fire({
                title: 'Erro!',
                text: 'Ocorreu erro ao editar a barragem',
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
            fetchBarragemData(token)
        }
    }, []);

    if (!authChecked) {
        return null;
    }

    return (
        <div>
            <Layout>
                <div className="text-2xl lg:text-3xl font-bold text-gray-800 mb-10 mt-14 lg:mt-10 text-center lg:text-left">
                    <span className={styles.text}>Edição de Barragem</span> 
                </div>
                <div>
                    <BarragemForm barragemFormData={formData} handleOnSubmitFunction={handleEditBarragem}/>
                </div>
            </Layout>  
        </div> 
    )
}