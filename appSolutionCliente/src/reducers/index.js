import { combineReducers } from 'redux';
import AutenticacaoReducer from './AutenticacaoReducer';
import AppReducer from './AppReducer';
import ListaChamadosReducer from './ListaChamadosReducer';
import ListaClientesReducer from './ListaClientesReducer';
import ListaClienteChamadosReducer from './ListaClienteChamadosReducer'
import ListaTecnicosReducer from './ListaTecnicosReducer';
export default combineReducers({
    AutenticacaoReducer,
    AppReducer,
    ListaClientesReducer,
    ListaChamadosReducer,
    ListaTecnicosReducer,
    ListaClienteChamadosReducer,
})