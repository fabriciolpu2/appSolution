import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import Base64 from 'base-64';

import { LOADING_CADASTRO, CADASTRO_TECNICO_SUCESSO, CADASTRO_TECNICO_ERRO } from './types';

export const cadastroTeste = (nome) => {
    console.log(nome);
}

export const cadastraUsuarioCliente = (nome, email, senha) => {
    console.log(email);
    return dispatch => {
        dispatch({ type: LOADING_CADASTRO});
        firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then(user => {
                let emailB64 = Base64.encode(email);
                firebase.database().ref('/clientes/'+emailB64)
                    .push({ nome })
                    .then(value => cadastraUsuarioTecnicoSucesso(dispatch))
            })
            .catch(erro => cadastraUsuarioTecnicoErro(erro, dispatch));
    }
}

export const cadastraUsuarioTecnico = (nome, email, senha) => {
    console.log(email);    
    return dispatch => {
        dispatch({ type: LOADING_CADASTRO });
        firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then(user => {
                let emailB64 = Base64.encode(email);
                firebase.database().ref('/tecnicos/'+emailB64)
                    .push({ nome })
                    .then(value => cadastraUsuarioTecnicoSucesso(dispatch))
            })
            .catch(erro => cadastraUsuarioTecnicoErro(erro, dispatch));
    }
}
const cadastraUsuarioTecnicoSucesso = (dispatch) => {
    console.log('sucesso');
    dispatch({ type: CADASTRO_TECNICO_SUCESSO });
}
const cadastraUsuarioTecnicoErro = (erro, dispatch) => {
    console.log('erro cadastro');
    dispatch({ type: CADASTRO_TECNICO_ERRO, payload: erro.message });
}
