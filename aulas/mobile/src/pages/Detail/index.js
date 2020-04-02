import React from 'react';

//importando icones
import {Feather} from '@expo/vector-icons';

import { useNavigation, useRoute } from '@react-navigation/native';
//useRoute - serve para obter informações específicas da págin atual da aplicação

import { View, Image, TouchableOpacity, Text, Linking} from 'react-native';

import styles from './styles';

//Importando dependências para envio de email - MailComposer
import * as MailComposer from 'expo-mail-composer';

//Importando depêndencias para envio de mensagem no whatapp - DeepLinking
//import { Linking } from '@react-navigation/native';

//importando a logo
import logoImg from '../../assets/logo.png';

export default function Details(){

    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    const message = `Olá, ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR',
    { style: 'currency', 
      currency: 'BRL' 
}).format(incident.value)}`

    //função de navegação de voltar para página anterior
    //Instalar pacote do expo: expo install expo-mail-composer
    function navigateBack(){
        navigation.goBack();
    }

    //Função para envio de email
    function sendMail(){
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}.`,
            recipients: [incident.email],
            body: message,
        });
    }

    //Função para envio de WhatsApp
    function sendWhatsApp(){
        //Linking.openURL(`whatsapp://send?phone=3291005069text=${message}`);
        Linking.openURL(`https://wa.me/553${incident.whatsapp}?text=${message}`);
    }

    return (
        <View style={styles.container}>

                    <View style={styles.header}>
                        <Image source={logoImg} />

                        <TouchableOpacity onPress={navigateBack}>

                            <Feather name="arrow-left" size={28} color="#E82041" />

                        </TouchableOpacity>
                    </View>

                        <View style={styles.incident}>

                            <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG:</Text>
                            <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf} </Text>

                            <Text style={styles.incidentProperty}>CASO:</Text>
                            <Text style={styles.incidentValue}>{incident.title}</Text>

                            <Text style={styles.incidentProperty}>VALOR:</Text>
                            <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR',
                            { style: 'currency', 
                              currency: 'BRL' 
                        }).format(incident.value)}
                        </Text>

                        </View>

                        <View style={styles.contactBox}>

                            <Text style={styles.heroTitle}>Salve o dia!</Text>
                            <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
                            <Text style={styles.heroDescription}>Entre em contato:</Text>

                            <View style={styles.actions}>

                                <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>

                                    <Text style={styles.actionText}>WhatsApp</Text>

                                </TouchableOpacity>

                                <TouchableOpacity style={styles.action} onPress={sendMail}>

                                    <Text style={styles.actionText}>Email</Text>

                                </TouchableOpacity>

                            </View>

                        </View>

        </View>
    );
}