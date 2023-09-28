import { useState , useEffect } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

import Layout from '@/components/layout/layout'

import api2 from '../api/api2'
import styles from '../../styles/CadastroUsuarios.module.css'
import { SensorForm } from '@/components/forms/sensorForm'

interface FormData {
    nome: string;
    fabricante: string;
    tipo: string;
    idBarragem: string;
}

export default function EdicaoSensor() {
    const router = useRouter()

    const [authChecked, setAuthChecked] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        nome: '',
        fabricante: '',
        tipo: '',
        idBarragem: ''
    })

    const fetchSensorData = async (token: string | null) => {
        const { id } = router.query;

        await api2.get(`api/v1/sensores/${id}`, {
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

    async function handleEditSensor(formData: FormData) {
        const token = localStorage.getItem('token')

        console.log("FD: ", formData)

        const data = {
            nome: formData.nome,
            fabricante: formData.fabricante,
            tipo: formData.tipo,
            idBarragem: formData.idBarragem
        }

        const { id } = router.query;

        await api2.put(`api/v1/sensores/${id}`, data, {
            headers:{
                Authorization:  'Bearer ' + token
            }
        })
        .then(response => {
            if (response.status === 200) {
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Sensor editado com sucesso',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  })
    
                  router.push("/sensores/listagem")
            }
        })
        .catch(error => {
            Swal.fire({
                title: 'Erro!',
                text: 'Ocorreu erro ao editar o sensor',
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
            fetchSensorData(token)
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
                    <SensorForm sensorFormData={formData} handleOnSubmitFunction={handleEditSensor} />
                </div>
            </Layout>  
        </div> 
    )
}