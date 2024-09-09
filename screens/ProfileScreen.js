import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function ProfileScreen({ navigation }) {
    const route = useRoute();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Bem-vindo!</Text>

            <View style={styles.header}>
                <Image
                    style={styles.logo}
                    source={require('../src/images/Logo Protelt 30Anos Sem Fundo.png')}
                />
            </View>

            <View style={styles.containeropcao}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Budget')}>
                    <Text style={styles.buttonText}>Criar Orçamento</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('History') }>
                    <Text style={styles.buttonText}>Histórico de Orçamentos</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.containerlinha}>
                <View style={styles.linha}>

                </View>
            </View>

            <View style={styles.sair}>
                <TouchableOpacity style={styles.buttonSair} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Sair</Text>
                </TouchableOpacity>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    botao: {
        marginTop: 100,
    },
    containeropcao: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    buttonorcamento:{
        width: '80%',
        height: 50,
        backgroundColor: '#61F9AD',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        width: '80%',
        height: 50,
        backgroundColor: '#007BFF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    logo: {
        width: 250,
        height: 250,
    },
    header: {
        height: 210,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    sair:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonSair: {
        width: '80%',
        height: 50,
        backgroundColor: '#007BFF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    containerlinha:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        gap:10
    },
    linha:{
        borderWidth:1,
        width: 500,
        marginTop:30
    }
});
