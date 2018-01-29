import React from 'react';
import { Router, Scene} from 'react-native-router-flux';

import FormLogin from './components/FormLogin';
import Principal from './components/Principal';


export default props => (
    <Router navigationBarStyle={{ 
        backgroundColor: '#115E54'}}
        titleStyle={{ color: '#FFF'}}
    >
        <Scene key="root">
            <Scene key='formLogin' component={FormLogin} title="Login" initial hideNavBar={true}  initial/>
            <Scene key='principal' component={Principal} title="Tela Principal" hideNavBar={true}  />
        </Scene>
    </Router>
);


