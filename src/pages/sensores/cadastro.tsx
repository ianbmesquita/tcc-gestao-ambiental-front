import { useState , useEffect } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

import Layout from '@/components/layout/layout'

import api2 from '@/pages/api/api2'
import styles from '../../styles/CadastroUsuarios.module.css'
import { SensorForm } from '@/components/forms/sensorForm'

interface FormData {
    nome: string;
    fabricante: string;
    tipo: string;
    idBarragem: string;
}

interface Barragem {
    id: number;
    nome: string;
}

interface TipoSensor {
    valor: string;
    tipo: string;
}

interface InfoPage {
    tiposSensores: TipoSensor[];
    barragens: Barragem[];
}

export default function CadastroSensor() {
    const router = useRouter()

    const [authChecked, setAuthChecked] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        nome: '',
        fabricante: '',
        tipo: '',
        idBarragem: ''
    })

    async function handleNewSensor(formData: FormData) {
        const token = localStorage.getItem('token')

        console.log(formData)

        const data = {
            nome: formData.nome,
            fabricante: formData.fabricante,
            tipo: formData.tipo,
            idBarragem: formData.idBarragem,
        }

        await api2.post("api/v1/sensores", data, {
            headers:{
                Authorization:  'Bearer ' + token
            }
        })
        .then(response => {
            if (response.status === 201) {
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Sensor cadastrado com sucesso',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  })
    
                  router.push("/sensores/listagem")
            }
        })
        .catch(error => {
            Swal.fire({
                title: 'Erro!',
                text: 'Ocorreu erro ao cadastrar o sensor',
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
                    <span className={styles.text}>Cadastro de Sensor</span> 
                </div>
                <div>
                    <SensorForm handleOnSubmitFunction={handleNewSensor} sensorFormData={formData} />
                </div>
            </Layout>  
        </div> 
    )
}