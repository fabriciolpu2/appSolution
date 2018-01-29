import React, { Component } from 'react';
import { View, Text, TextInput, 
        Button, TouchableHighlight, Image,
        ActivityIndicator,
    } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { modificaEmail, modificaSenha, autenticarUsuario } from '../actions/AutenticacaoActions';

class formLogin extends Component {
    _autenticarUsuario() {
        const { email, senha } = this.props;
        this.props.autenticarUsuario({ email, senha });
    }

    renderBtnLogin() {
        if (this.props.loading_login) {
            return (
                <ActivityIndicator size="large"/>                
            )
        } 
        return (
            <Button title="Acessar" color='#115E54' onPress={() => this._autenticarUsuario()} />
        )
        
    }
    
    render() {
        return (            
            <View style={{ flex: 1, padding: 10}}>
                <View style={{ flex: 1, padding: 10}}>
                    <Text>Solution Service Desk</Text>
                </View>
                <View style={{ flex: 2,}}>
                    <TextInput
                        value={this.props.email}
                        style={{ fontSize: 20, height: 40 }}
                        placeholder='E-mail'
                        placeholderTextColor="#ffffff"
                        onChangeText={ texto => this.props.modificaEmail(texto)}
                    />
                    <TextInput
                        value={this.props.senha}
                        secureTextEntry
                        style={{ fontSize: 20, height: 40 }}
                        placeholder='Password'
                        placeholderTextColor="#ffffff"
                        onChangeText={ texto => this.props.modificaSenha(texto)}
                    />
                    <Text style={{ color: '#ff0000', fontSize: 18 }}>{this.props.erroLogin}</Text>                                    
                </View>
                <View style={{ flex: 2}}> 
                    {this.renderBtnLogin() }
                </View>
            </View>

        )
    }
}
const mapStateToPropos = state => (
    {
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha,
        erroLogin: state.AutenticacaoReducer.erroLogin,
        loading_login: state.AutenticacaoReducer.loading_login,
    }
)

export default connect(mapStateToPropos, { modificaEmail, modificaSenha, autenticarUsuario })(formLogin);