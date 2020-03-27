import React, { useState } from 'react';
import {FiArrowLeft} from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import '../../pages/global.css';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';


export default function Register(){

    const history = useHistory(); // utilizado para apos o cadastro, retorno  o usuario para pagina de login

    const [name, setName] = useState(''); //estados
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    async function handleRegister(e){  
        e.preventDefault(); // faz com que a pagina nao recarreque a cada requisição

        const data = { // dados sendo passados dentro de uma constante
            name,
            email,
            whatsapp,
            city,
            uf
        };

        if(data.name && data.email && data.whatsapp && data.city && data.uf !== ""){

            try{
                const response = await api.post('ongs', data); //chama a API, com metodo post de envio (passando os dados)

                alert(`Seu ID de acesso: ${response.data.id}`); // informando ID atraves do alert

                history.push('/'); // caso cadastro OK, sera redirecionado para pagina inicial

            }catch(err){    
                alert('Erro no cadastro, tente novamente');
        }

        } else {
              alert('Todos os campos precisam ser preenchidos');
        }

    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos de sua ONG.</p>

                    <Link className="back-link" to="/"> 
                        <FiArrowLeft size={16} color="#E02041" />
                         Voltar para o logon
                    </Link>
                </section>  
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)} // armazenando o valor do input em uma variavel
                    />

                    <input type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input 
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input 
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />

                        <input 
                            placeholder="UF" style={{ width:80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}