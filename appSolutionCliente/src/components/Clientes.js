import React, { Component } from 'react';
import { View, Text, Button, Image, TextInput, ListView, TouchableHighlight} from 'react-native';
import { connect } from 'react-redux';
import { listaClientes } from '../actions/AppActions';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import Base64 from 'base-64';

class Clientes extends Component {
    componentWillMount() {
        this.props.listaClientes();
        this.preparaDados(this.props.clientes);
    }
    componentWillReceiveProps(nextProps) {
        this.preparaDados(nextProps.clientes);
    }

    preparaDados (clientes) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        //console.log(clientes);
        this.dataSource = ds.cloneWithRows(clientes);
    }

    renderRow(cliente) {
        let clienteEmail = Base64.decode(cliente.uid);        
        return (            
            <TouchableHighlight 
                onPress={() => Actions.clienteChamados({ title: cliente.nome, clienteNome: cliente.nome, clienteEmail})}
                underlayColor="#fff"
            >
                <View style={{ flex: 1, padding: 20, borderBottomWidth: 1, borderColor: "#ccc"}}>
                    <Text style={{ fontSize: 25}}>{Base64.decode(cliente.uid)}</Text>                    
                </View>
            </TouchableHighlight>
        )
    }


    render() {
        return (
            <ListView 
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
            />
        )
    }
}
mapStateToProps = state => {
    const clientes = _.map(state.ListaClientesReducer, (val, uid) => {
        
        return { ...val, uid};
    });
    
    return { clientes }
}
export default connect(mapStateToProps, {listaClientes})(Clientes);