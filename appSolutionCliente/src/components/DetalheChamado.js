import React, { Component } from 'react';
import { View, Text, SectionList } from 'react-native';
import {} from '../actions/AppActions';
import { connect } from 'react-redux';


export default class DetalheChamado extends Component{

    render() {
        return (
            <View>
                <Text>{this.props.clienteNome}</Text>
                <Text>{this.props.prioridade}</Text>
                <Text>{this.props.status}</Text>             
            </View>
        )
    }
}