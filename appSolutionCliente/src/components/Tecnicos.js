import React, { Component } from 'react';
import { View, Text, Button, Image, TextInput, ListView} from 'react-native';
import { cadastraUsuarioTecnico, criaChamados, listaTecnicos } from '../actions/AppActions';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import Base64 from 'base-64';

class Tecnicos extends Component {

    componentWillMount() {
        this.props.listaTecnicos();
        this.preparaDados(this.props.tecnicos);
    }

    componentWillReceiveProps(nextProps) {
        this.preparaDados(nextProps.tecnicos);
    }

    preparaDados(tecnicos) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.dataSource = ds.cloneWithRows(tecnicos);
    }

    renderRow(tecnico) {
        console.log(tecnico);
        return (
            <View style={{ flex: 1, padding: 20, borderBottomWidth: 1, borderColor: "#ccc"}}>
                <Text>{Base64.decode(tecnico.uid)}</Text>                
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
    // End Render
}

const mapStateToProps = state => {
    const tecnicos = _.map(state.ListaTecnicosReducer, (val, uid) => {        
        return { ...val, uid};
    });
    
    return {tecnicos}
}

export default connect(mapStateToProps, {listaTecnicos})(Tecnicos)