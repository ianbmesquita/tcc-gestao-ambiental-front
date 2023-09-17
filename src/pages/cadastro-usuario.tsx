import styles from '../styles/CadastroUsuarios.module.css'

export default function CadastroUsuario() {
    const inputClass = "border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white focus:outline-none mb-3 sm:w-1/2 lg:w-11/12"
    const selectBoxClass = "border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none mb-3 sm:w-1/2 lg:w-11/12"
    const buttonClass = "bg-emerald-950 transition duration-200 text-white px-4 py-2 rounded hover:bg-emerald-700 font-semibold mt-5 sm:w-1/2 lg:w-1/12 ml-auto"

    async function handleNewUser(event: React.FormEvent) {
        event.preventDefault();
        
        console.log("Cadastrei!!!")
    } 
    
    return (
        <div>
            <div className="text-3xl font-bold text-gray-800 mb-10 mt-10">
                <span className={styles.text}>Cadastro de Usuário</span> 
            </div>
            <div>
                <form className="grid grid-cols-2 gap-4" onSubmit={handleNewUser}>
                    <div className="col-span-1">
                        <label htmlFor="name" className="block text-gray-700 font-semibold">Nome:</label>
                        <input className={inputClass} type="text" name="name" placeholder="Nome completo" />

                        <label htmlFor="password" className="block text-gray-700 font-semibold">Senha:</label>
                        <input className={inputClass} type="password" name="password" placeholder="Senha" />
                    </div>

                    <div className="col-span-1">
                        <label htmlFor="login" className="block text-gray-700 font-semibold">Login:</label>
                        <input className={inputClass} type="text" name="login" placeholder="E-mail" />

                        <label htmlFor="role" className="block text-gray-700 font-semibold">Categoria:</label>
                        <select className={selectBoxClass} name="role">
                            <option>Selecione</option>
                            <option value="ADMIN">Administrador</option>
                            <option value="USER">Operador</option>
                            <option value="RESIDENT">Morador</option>
                            <option value="OUTSOURCED">Técnico</option>
                        </select>
                    </div>

                    <div className="col-span-2">
                        <button className={buttonClass}>Cadastrar</button>
                    </div>
                </form>
            </div>
        </div> 
    )
}