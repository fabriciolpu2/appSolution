import React, { Component } from 'react';
import { View, Text, Button, Image, TextInput} from 'react-native';
import { cadastraUsuarioTecnico } from '../actions/AppActions';
import { connect } from 'react-redux';

class Tecnicos extends Component {

    render() {
        return (
            <View style={{ flex: 1, padding: 15}}>
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{ fontSize: 15, color: '#ffffff'}}>Tecnicos</Text>                
                </View> 
                <TextInput 
                    placeholder="E-mail" 
                    style={{ fontSize:20, height:45}}
                    value={this.props.add_tecnico_email}
                />
                <Button 
                    title="Adicionar"
                    color="#115E54"  
                    onPress={() => this.props.cadastraUsuarioTecnico(this.props.add_tecnico_nome, this.props.add_tecnico_email, this.props.add_tecnico_senha)}                     
                />          
            </View>
        )
    } 
}

const mapStateToProps = state => ({    
    add_tecnico_email: state.AppReducer.add_tecnico_email,
    add_tecnico_nome: state.AppReducer.add_tecnico_nome,
    add_tecnico_senha: state.AppReducer.add_tecnico_senha,
});

export default connect(mapStateToProps, {cadastraUsuarioTecnico})(Tecnicos)