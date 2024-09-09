import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importando o ícone

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Carregar credenciais salvas
    loadCredentials();
  }, []);

  const loadCredentials = async () => {
    try {
      const savedEmail = await AsyncStorage.getItem('email');
      const savedPassword = await AsyncStorage.getItem('password');
      if (savedEmail && savedPassword) {
        setEmail(savedEmail);
        setPassword(savedPassword);
        setRememberMe(true);
      }
    } catch (error) {
      console.log('Erro ao carregar credenciais', error);
    }
  };

  const saveCredentials = async () => {
    if (rememberMe) {
      try {
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);
      } catch (error) {
        console.log('Erro ao salvar credenciais', error);
      }
    } else {
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('password');
    }
  };

  function criar() {
    navigation.navigate('Account');
  }

  async function handleLogin() {
    setLoading(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false);
        saveCredentials(); // Salvar as credenciais
        setEmail('');
        setPassword('');
        navigation.navigate('Profile');
      })
      .catch((error) => {
        setLoading(false);
        alert('Erro! Email ou senha inválidos!');
      });
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
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

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setRememberMe(!rememberMe)} // Alterna entre marcado e desmarcado
          >
            <Icon
              name={rememberMe ? 'check-box' : 'check-box-outline-blank'} // Ícone de checkbox marcado ou desmarcado
              size={24}
              color="#007BFF"
            />
          </TouchableOpacity>
          <Text style={styles.checkboxText}>Lembrar-me</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={criar}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 8,
  },
  checkboxText: {
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#007BFF',
  },
});
