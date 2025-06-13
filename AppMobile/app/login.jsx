import React, { useState } from "react";
import { 
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const trimmedEmail = email.trim().toLowerCase();
      const trimmedPassword = password.trim();

      if (!trimmedEmail || !trimmedPassword) {
        Alert.alert("Erro", "Preencha todos os campos");
        return;
      }

      const response = await fetch('https://back-end-pi-27ls.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erro ao fazer login");
      }

      await AsyncStorage.setItem('authToken', result.token);
      await AsyncStorage.setItem('userData', JSON.stringify(result.user));

      Alert.alert("Sucesso", `Login realizado com sucesso! Bem-vindo ${result.user.email}`);

      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);

    } catch (error) {
      console.error("Erro no login:", error);

      let errorMessage = error.message;

      if (error.message.includes('Credenciais inválidas')) {
        errorMessage = "E-mail ou senha incorretos";
      } else if (error.message.includes('servidor')) {
        errorMessage = "Problema no servidor. Tente novamente mais tarde";
      }

      Alert.alert("Erro", errorMessage);
    }
  };
    
  const handleCadastro = () => {
    router.push("/")
  }

  const handledashboard = () => {
    router.push('/dashboard');
  };

  return (
    <View style={styles.loginContainer}>
        <Text style={styles.textwhite}>Bem vindo ao dashboard do P.I</Text>
        <Text style={styles.textTitle}>Fazer login</Text>

        <Text style={styles.textwhite}>Ainda não possui uma conta?</Text>
          <TouchableOpacity>
            <Text style={styles.link} onPress={handleCadastro}>Cadastrar</Text>
          </TouchableOpacity>

          <TextInput
          style={styles.inputs}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.inputs}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handledashboard}>
            <Text>Dashboard</Text>
          </TouchableOpacity>
    </View>
  )  
};

const styles = StyleSheet.create({

  loginContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#052338',
    color: '#fff',
    textDecorationColor: '#fff',
  },
  textTitle: {
    marginBottom: '3%',
    color: '#fff',
    fontSize: 50,
  },
  textwhite: {
    color: '#fff',
    fontSize: 17,
  },
  link: {
    marginBottom: '4%',
    color: '#60a5fa',
    textDecorationLine: 'none',
  },
  inputs: {
    borderWidth: 1,
    color: 'black',
    backgroundColor: '#fff',
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginVertical: 12,
    width: "80%",
  },
  button: {
    color: 'black',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: "35%",
    alignItems: "center",
  },
});