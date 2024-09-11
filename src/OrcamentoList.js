import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function OrcamentoList({ data, onEyePress }) {
    return (
        <View style={styles.container}>
            <View style={styles.conatinerInfoCliente}>
                <Text style={styles.textoinfoCliente}>{data.cliente}</Text>
                <View style={{flexDirection:'row', gap:30}}>
                    <TouchableOpacity onPress={onEyePress}>
                        <Ionicons name='eye-sharp' size={40} color={'#FFF'} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f0f0f0",
        padding: 8,
        borderRadius: 4,
        marginBottom: 14,
    },
    textoinfo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    conatinerInfo: {
        flexDirection: 'row',
        gap: 25,
        justifyContent: 'center'
    },
    conatinerInfoCliente: {
        flexDirection: 'column',
        gap: 25,
        marginTop: 10,
        borderWidth: 0.5,
        width: 350,
        height: 200,
        justifyContent: 'center',
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#0975E1',
    },
    textoinfoCliente:{
        fontSize: 35,
        fontWeight: 'bold',
        color: '#FFF',
    }
});
