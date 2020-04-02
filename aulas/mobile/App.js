//Instalar o pacote intl para formataçções
// npm install intl
import 'intl';
import 'intl/locale-data/jsonp/pt-BR'; //Importando ideio pt-br

import React from 'react';

//Importando as rotas
import Routes from './src/routes';

//No React native não temos as mesmas tags do html, então podemos utilizar <div></div> pra tudo
//Podemos utilizar a tag <View></View> em vez de div, header, footer, aside, container, section
//A tag <Text></Text> é utilizada para qualquer tipo de texto

export default function App() {
  return (
    <Routes />
  )
}

//Para estilização, sempre devemos passr a propriedade style={}, que receberá um objeto com a 
//estilização com o uso da classe StyleSheet e seu método create()
//Todos os elemntos possuem display: flex por padrão no react native. Não existem os outros tipos de display
//As propriedades não são separadas por hifén (-), como no css. As palavras posteriores começam com letra maiúsculas

//Não existe heranças de stilos no React Native
//Todo elemento deve possuir sua estilização própria