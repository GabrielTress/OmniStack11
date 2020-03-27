import React, {useState} from 'react';
import {FiLogIn} from 'react-icons/fi'; // importa os icones com npm install react-icons
import {Link, useHistory} from 'react-router-dom'; // substitui o a do href (para não recarregar toda a pagina)
import './styles.css';
import '../../pages/global.css';
import api from '../../services/api';


import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';


export default function Logon(){

    const history = useHistory(); // para redirecionamento de pagina

    const [id, setId] = useState('');

   async function handerLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('sessions', {id}); // retorna os dados da ONG caso o id exista

            localStorage.setItem('ongId', id); //faz a gravação do id e nome, no localStorage.
            localStorage.setItem('ongName', response.data.name);

        history.push('/profile');  //redirecionando apos validação
        
        } catch(err){
            alert('Falha no login, tente novamente');
        }

    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>
            <form onSubmit={handerLogin}>
                <h1>Faça seu logon</h1>

                <input 
                    placeholder="Sua ID"
                    value = {id}
                    onChange={e => setId(e.target.value)}
                />

                <button className="button" type="submit">Entrar</button>

                <Link className="back-link" to="/register"> 
                    <FiLogIn size={16} color="#E02041"/>
                    Não tenho cadastro
                </Link>
            </form>
            </section>

            <img src={heroesImg} alt="Heroes"/>
        </div>
    )
}