import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';


import api from '../../services/api';

import styles from './styles';

import logoImg from '../../assets/logo.png'; // não é necessario colocar o 2x ou 3x

export default function Incidents(){

    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);

    const navigation = useNavigation();
    
    const [page, setPage] = useState(1); //para fazer controle de paginação.
    const [loading, setLoading] = useState(false);

    async function loadIncidents(){
        if(loading){
            return;
        }

        if(total > 0 && incidents.length == total){
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', {
            params: {page} //envia a pagina atual como parametro
        });
        setIncidents([...incidents, ...response.data]); // anexando dois vetores, copiando dados (vao sobreencrever a pagina anterior)
        setTotal(response.headers['x-total-count']); // n total de caso que é passado atraves do header.
        setPage(page + 1);
        setLoading(false);

    }

    useEffect(() =>{
        loadIncidents();
    }, []);

    function navigateToDetail(incident){
        navigation.navigate('Detail', {incident});
    } 

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>   
        

            <FlatList  // FlatList é resposavel por fazer a barra de rolagem (Sem ele, a tela fica estatica).
                data={incidents}
                style={styles.incidentsList}
                keyExtractor={incident => String(incident.id)} //passa o id como parametro
                showsVerticalScrollIndicator={false} //elimina a barra de rolagem
                onEndReached={loadIncidents} //função que ira executar ao chegar no fim da lista
                onEndReachedThreshold={0.2} //quando estiver a 20% de finalizar a lista, ela sera carregada.
                renderItem={({item: incident}) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(incident.value)}
                        </Text>

                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() =>navigateToDetail(incident)} // função que ira executar ao ser pressionado
                        >

                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />

                        </TouchableOpacity>
                    </View>

                )}
            />
   
        </View>
    );
}