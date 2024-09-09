import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../src/firebaseConnection'


export default function CreateProfileScreen({navigation}){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleCreateUser() {
        const user = await createUserWithEmailAndPassword(auth, email, password)
        console.log(user)
        alert('Conta criada com sucesso!')
    }


    return(
        <View style={styles.container}>
            <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require('../src/images/Logo Protelt 30Anos Sem Fundo.png')}
        />
      </View>

      <View style={styles.campos}>
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu login"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Text style={styles.text}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#aaa"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCreateUser}>
        <Text style={styles.buttonText}>Cadastar</Text>
      </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0', // Fundo da tela
        padding: 20,
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
      input: {
        width: 315,
        height: 56,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        borderColor: '#ddd',
        borderWidth: 1,
        color: '#333',
      },
      text: {
        fontSize: 14,
        marginLeft: 10,
        marginTop: 5,
      },
      campos: {
        justifyContent: 'center',
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
})