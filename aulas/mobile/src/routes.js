import React from 'react';
import { NavigationContainer } from '@react-navigation/native' //Importando NavigationContainer
import { createStackNavigator } from '@react-navigation/stack' //Importando módulo de navegação

const AppStack = createStackNavigator(); //Navegação criada

//Importando páginas
import Incidents from './pages/Incidents';
import Detail from './pages/Detail'

//headerShow: false - Desabilita o cabeçalho pra criação de cabeçalho próprio

export default function Routes() {
    return(
        //NavigationContainer circunda todas as rotas
        <NavigationContainer >
            <AppStack.Navigator screenOptions={{ headerShown: false }}> 
                <AppStack.Screen  name="Incidents" component={Incidents} />
                <AppStack.Screen  name="Detail" component={Detail} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}