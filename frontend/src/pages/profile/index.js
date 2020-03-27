import React, { useEffect, useState } from 'react'; 
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function Profile(){

    //armazenamento de cada incidente
    const [incidents, setIncidents] = useState([]); //variavel incidents, sera atualizada pela função setIncidents
    const history = useHistory(); //para pagina de retorno
    const ongName = localStorage.getItem('ongName'); //busca o nome da ong logada, atraves do localstorage
    const ongId = localStorage.getItem('ongId');

    useEffect(() =>{   //utilizada para exibir ou alterar casos, passando funções como parametro
        api.get('profile', {
            headers:{
                Authorization: ongId, //passando a ong logada
            }
        }).then(response => { // grava os dados da resposta, com useState
            setIncidents(response.data);
        })
    }, [ongId]); //caso o id seja alterado, toda função sera recalculada.
    
    async function hendleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`,{
                headers:{
                    Authorization: ongId,
                }
            })
            setIncidents(incidents.filter(incident => incident.id !== id)); // atualiza para pegar os ids <do que foi excluido>
        } catch(err){
            alert('Erro ao deletar caso, tente novamente');
        }
    }

    function handleLogout(){
        localStorage.clear(); // limpa a ong que esta logada
        history.push('/'); // redireciona a pagina
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vindo, {ongName}</span>

                <Link className="button" to="/incidents/new">
                    Cadastrar novo caso
                </Link>
                
                <button type="button" onClick={handleLogout}> 
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
            {/* map percorre cada um deles, retornando alguma coisa */}
                 {incidents.map(incident =>(      
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        {/* chamando a arrow function, (para não executar a function e deletar todos os casos) */}
                        <button type="button" onClick={() => hendleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8a3"/>
                        </button>
                    </li>   
                 ))}  
            </ul>
        </div>
    );
}