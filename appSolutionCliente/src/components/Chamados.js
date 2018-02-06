import React, { Component } from 'react';
import { View, Text, Button, Image, TextInput, ListView, TouchableHighlight} from 'react-native';
import { connect } from 'react-redux';
import { listaChamadosAbertos } from '../actions/AppActions';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';

class Chamados extends Component {
    componentWillMount() {
        this.props.listaChamadosAbertos();
        this.preparaDados(this.props.chamados);
    }
    componentWillReceiveProps(nextProps){
        this.preparaDados(nextProps.chamados);
    }
    preparaDados(chamados) {
        const ds = new ListView.DataSource(
            {
                rowHasChanged: (r1, r2) => r1 !== r2
            }
        );
        this.dataSource = ds.cloneWithRows(chamados);
    }
    renderRow(chamado) {
        return(
            <View style={{ flex: 1, padding: 20, borderBottomWidth: 1, borderColor: "#ccc"}}>
                <Text>{chamado.descricao}</Text>
            </View>
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
    const chamados = _.map(state.ListaClienteChamadosReducer, (val, uid) => {
        return { val, uid};
    });
    return {chamados}
}
export default connect(mapStateToProps, {listaChamadosAbertos})(Chamados);