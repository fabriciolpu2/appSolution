import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import Base64 from 'base-64';
import _ from 'lodash';

import { 
    LOADING_CADASTRO, 
    CADASTRO_TECNICO_SUCESSO, 
    CADASTRO_TECNICO_ERRO,
    LISTA_CHAMADOS_ABERTOS,
    LISTA_CLIENTES,
    LISTA_CHAMADOS_CLIENTES,
    LISTA_TECNICOS,
} from './types';

export const cadastroTeste = (nome) => {
    console.log(nome);
}

export const criaChamados = () => {
    
    const { currentUser } = firebase.auth();
    const empresaEmail = currentUser.email;
    
    return dispatch => {
        const empresaEmailB64 = Base64.encode(empresaEmail);
    
        // Busca dados do usuario    
        firebase.database().ref('/clientes/'+empresaEmailB64)
            .once('value')
            .then(snapshot => {
                if(snapshot.val()) {                    
                    const dadosCliente = _.first(_.values(snapshot.val()));                                                            
                    firebase.database().ref('/chamados_clientes/'+ empresaEmailB64)
                        .push({ cliente: dadosCliente.nome, descricao:'testeChamado Alencar', status:'aberto', prioridade:'alta'})                                        
                        .then(() => {
                            // console.log("chamados_cluentes"); 
                            // console.log('Clunete'+ dadosCliente.nome + ': Email: '+ empresaEmail)                                                   
                            // firebase.database().ref('/chamados_clientes/'+ empresaEmailB64)
                            //     .push({cliente: dadosCliente.nome, email: empresaEmail})                                
                        }) 
                } else {
                    console.log('erro localizar chamado');
                    dispatch({
                        
                        type: CADASTRO_TECNICO_ERRO, payload: 'Erro ao localizar cliente'
                    })
                }
            })        
    }
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


export const listaChamadosAbertos = () => {
    const { currentUser } = firebase.auth();
    let clienteEmailB64 = Base64.encode(currentUser.email);
    console.log(currentUser.email);
    return dispatch => {        
        firebase.database().ref('chamados_clientes/'+ clienteEmailB64)
            .on("value", snapshot => {                    
                dispatch({ type: LISTA_CHAMADOS_CLIENTES, payload:snapshot.val()})
            })
    }
}
export const listaClientes = () => {
    return dispatch => {
        firebase.database().ref('/clientes/')
            .once("value")
                .then(snapshot => {
                    // Converte json em array                
                    //console.log(_.first(_.values(snapshot.val())))
                    //dispatch({ type: LISTA_CLIENTES, payload:(_.values(snapshot.val()))})
                    dispatch({ type: LISTA_CLIENTES, payload:(snapshot.val())})
            })
    }
}

export const listaTecnicos = () => {
    return dispatch => {
        firebase.database().ref('/tecnicos/')
            .once("value")
                .then(snapshot => {
                    dispatch({type: LISTA_TECNICOS, payload:(snapshot.val())})
                })
    }
}
export const listaChamadosCliente = clienteEmail => {

    //console.log('actions: '+ clienteEmail);
    let clienteEmailB64 = Base64.encode(clienteEmail);
    return dispatch => {
        
        firebase.database().ref('chamados_clientes/'+ clienteEmailB64)        
            .on("value", snapshot => {                    
                dispatch({ type: LISTA_CHAMADOS_CLIENTES, payload:snapshot.val()})
            })
    }
}