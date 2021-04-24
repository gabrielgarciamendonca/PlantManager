
<h1>Plant Manager</h1>

<p>Este é um projeto para demostrar tudo que aprendi na semana da NLW, isso envolve notificações, gestos de deslizar elementos na tela, tratamentos de datas e ótimas dicas de UX para replicar as telas do figma, além disso, revemos conceitos importantes sobre o React Native, refatoração de código, e ótimas dicas de como utilizar o typescript para desenvolver esse incrivel app, ou qualquer outro app que possa vir a ser desenvolvido. Nesse projeto, foi usado uma ótima ferramenta de desenvolvimento, chamada expo, que agiliza processos e transforma o prazer em felicidade na hora de desenvolver. É incrivel como é fácil e simples de usar o </p>

<div align="center">
   <img src="https://github.com/gabrielgarciamendonca/Nubank-Animated/blob/main/NubankDemostrate.gif" width="250" />
</div>

## Desenvolvido por: 
 
<a href="https://cutt.ly/SlOQcBf" target="_blank"> 
<img src="https://cutt.ly/1lOlfra" width="90"/></a>

<a href="https://cutt.ly/SlOQcBf" rel="nofollow">Gabriel M.</a> 

## Libs

- React Native
- Typescript
- react-native-gesture-handler
- styled-components
- react-native-iphone-x-helper
- react-native-svg
- expo
- expo-notifications
- lottie-react-native
- expo-status-bar
- expo-font
- expo-app-loading
- axios

## Arquitetura de pastas

```
├── src
│   ├── @types
│   ├── assets
│   ├── libs
|   |   ├── storage
|   ├── components
|   |   ├── Button
|   |   ├── EnviromentButton
|   |   ├── Header
|   |   ├── Load
|   |   ├── PlantCardPrimary
|   |   ├── PlantCardSecondary
|   ├── pages
|   |   ├── Confirmation
|   |   ├── MyPlants
|   |   ├── PlantSave
|   |   ├── PlantSelect
|   |   ├── UserIdentification
|   |   ├── Welcome
|   ├── routes
|   |   ├── index
|   |   ├── stack.routes
|   |   ├── tab.routes
|   ├── services
|   |   ├── api
```

## Como Usar

#### Clonando o repositório

```bash
git clone git@github.com:gabrielgarciamendonca/Nubank-Animated.git
```

#### Entrando no diretório do projeto

```bash
cd plantmanager
```

#### Instalando as Dependências

```bash
yarn
```

#### Iniciando o Json server

```bash
json-server ./src/services/server.json --host 192.168.0.105 --port 3333 --delay 700
```

#### Iniciando a Aplicação

```bash
expo start or yarn start
```

