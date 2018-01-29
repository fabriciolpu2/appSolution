import React, { Component } from 'react';
import { View, Text, Button, Image, TextInput} from 'react-native';
import { connect } from 'react-redux';
import { cadastraUsuarioCliente } from '../actions/AppActions';

class Clientes extends Component {
    render() {
        return (
            <View style={{ flex: 1, padding: 15}}>
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{ fontSize: 15, color: '#ffffff'}}>Clientes</Text>                
                </View>            
                <TextInput 
                    placeholder="Email"
                    style={{ fontSize: 20, height:45}}
                    value={this.props.add_cliente_email}
                />
                <Button
                    title="Adicionar"
                    color="#115E54"
                    onPress={() => this.props.cadastraUsuarioCliente(this.props.add_cliente_nome, this.props.add_cliente_email, this.props.add_cliente_senha)}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    add_cliente_nome: state.AppReducer.add_cliente_nome,
    add_cliente_email: state.AppReducer.add_cliente_email,
    add_cliente_senha: state.AppReducer.add_cliente_senha,
});

export default connect(mapStateToProps, { cadastraUsuarioCliente})(Clientes)