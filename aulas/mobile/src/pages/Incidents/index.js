import React, { useState, useEffect } from 'react';

//importando icones
import {Feather} from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native' 

import { View, FlatList, Image, Text, TouchableOpacity} from 'react-native';

import api from '../../services/api';

//importando a logo
import logoImg from '../../assets/logo.png';

//Importando os estilos 
import styles from './styles';

export default function Incidents(){

    const [incidents, setIncidents] = useState([]);
    const [total,setTotal] = useState(0); //Para mostrat total de casos
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false); //Para gara garantir que não busque os mesmos dados mais de uma vez e garantir que seja carregado apenas uma página por vez.
    
    const navigation = useNavigation();

    function navigateToDetail(incident){
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents(){

        if(loading){
            return; //Para evitar que mais de uma requisição aconteça
        }

        //Se o total de registros for maior que 0 e a quantidade de registros for igual ao total de registros mostrados
        if(total > 0 && incidents.length === total){
            return;
        }

        setLoading(true);

        const response = await api.get('incidents',{ //Envia o numero da página que está sendo carregada
            params: {page}
        });

        //fim da requisição
        //setIncidents(response.data);
        setIncidents([ ...incidents, ...response.data]); //forkma de anexar dois vetores
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {

        loadIncidents();
        
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            {/* FlatList para scroll da página */}
            <FlatList 
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents} //Aceita uma função que será disparada quando o usuário chegar ao final da lista
                onEndReachedThreshold={0.2} //|Diz em qual % do fim da lista é preciso chegar, para que se carregue novos itens
                renderItem={({ item: incident }) => (

                    <View style={styles.incident}>

                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR',
                            { style: 'currency', 
                              currency: 'BRL' 
                        }).format(incident.value)}
                        </Text>

                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041"/>
                        </TouchableOpacity>

                        
                    </View>

                )}
            />

        </View>
    );
} //Instalar o pacote intl para formataçções
// npm install intl