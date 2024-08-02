import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import Header from '../../components/common/header';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../Other/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required('Введите ФИО'),
    email: Yup.string()
      .email('Введите корректный email')
      .required('Введите email'),
    phone: Yup.string()
      .matches(/^[0-9]+$/, 'Телефон должен содержать только цифры')
      .min(10, 'Телефон должен содержать не менее 10 цифр')
      .required('Введите телефон'),
    login: Yup.string()
      .required('Введите логин'),
    password: Yup.string()
      .min(6, 'Пароль должен содержать не менее 6 символов')
      .required('Введите пароль')
  });

const Registration = () => {
  const [code, setCode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const navigation = useNavigation();

  const handleRegister = () => {
    // Логика регистрации пользователя
      console.log('Регистрация', { code, firstName, lastName, password, birthDate });
      navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Header onlyLOGO={true}/>
      </View>
      <Text style={styles.header}>Тепер давай зареєструємо тебе у ...</Text>
      <Text style={styles.subHeader}>Ми надіслали код на адресу <Text style={styles.link}>Змінити</Text></Text>
      <TextInput
        style={styles.input}
        placeholder="Код*"
        value={code}
        onChangeText={setCode}
      />
      <TextInput
        style={styles.input}
        placeholder="Ім'я*"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Прізвище*"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль*"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Text style={styles.passwordHint}>Мінімум символів: 8</Text>
      <TextInput
        style={styles.input}
        placeholder="Дата народження*"
        value={birthDate}
        onChangeText={setBirthDate}
      />
      <Pressable style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Створити аккаунт</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
    logoContainer: {
      width: '100%',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0000FF', // Синий цвет для логотипа
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  link: {
    color: '#0000FF', // Синий цвет для ссылки
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  passwordHint: {
    fontSize: 12,
    color: '#777',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FFD700', // Желтый цвет для кнопки
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Registration;
