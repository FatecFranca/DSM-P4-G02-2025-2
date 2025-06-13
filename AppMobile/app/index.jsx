import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router';

export default function Cadastro() {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    const sanitizedData = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim().toLowerCase(),
      password: data.password.trim(),
    };

    try {
      const response = await axios.post(
        "https://back-end-pi-27ls.onrender.com/api/auth/register",
        sanitizedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        Toast.show({
          type: 'success',
          text1: 'Cadastro realizado com sucesso!',
        });
        router.push('/login');
      } else {
        Toast.show({
          type: 'error',
          text1: response.data?.error || 'Erro ao realizar cadastro',
        });
      }
    } catch (error) {
      const result = error.response?.data;
      Toast.show({
        type: 'error',
        text1: result?.error || 'Erro ao conectar com o servidor',
      });
      console.error("Erro na requisição:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.textwhite}>Bem vindo ao dashboard do P.I</Text>
      <Text style={styles.textTitle}>Criar uma conta</Text>

      <Text style={styles.textwhite}>Já possui uma conta?</Text>
      <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.link}>Login</Text>
      </TouchableOpacity>

      <Controller
        control={control}
        name="firstName"
        rules={{ required: "Nome é obrigatório" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.inputs}
            placeholder="Nome"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name="lastName"
        rules={{ required: "Sobrenome é obrigatório" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.inputs}
            placeholder="Sobrenome"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        rules={{ required: "Email é obrigatório" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={{ required: "Senha é obrigatória" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.inputs}
            placeholder="Senha"
            secureTextEntry
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
        {isSubmitting ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text>Cadastrar</Text>
        )}
      </TouchableOpacity>

      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#052338',
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
