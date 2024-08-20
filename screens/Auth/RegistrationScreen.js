import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert, ScrollView } from 'react-native';
import Header from '../../components/common/header';
import globalStyles from '../Other/styles';
import API from '../../services/api';
import { Formik } from 'formik';
import * as Yup from 'yup';
// import { UserContext } from '../../store/UserContext';
// import { logAsyncStorage } from '../../store/AsyncStorageUtil';

const RegistrationScreen = ({navigation}) => {

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Будь ласка, введіть логін'),
        firstname: Yup.string().required('Будь ласка, введіть ім\'я'),
        lastname: Yup.string().required('Будь ласка, введіть прізвище'),
        email: Yup.string().required('Будь ласка, введіть email'),
        password: Yup.string().min(8, 'Пароль повинен мати не меньше 8 символів').required('Будь ласка, введіть пароль'),
        birthDate: Yup.string().matches(/^\d{4}-\d{2}-\d{2}$/, 'Дата народження повинна бути в форматі РРРР-ММ-ДД')
          .required('Будь ласка, введіть дату народження'),
      });

  const handleRegister = async (values) => {
      console.log('Регистрация', values);
    try {
        await API.register(values.username, values.password, values.email, 'User', values.birthDate, values.firstname, values.lastname);
        //navigation.navigate('Home');
          console.log("You Registered");
          Alert.alert('Прийнято', 'Ви зареєструвалися!');
          navigation.navigate('Login');
      } catch (err) {
          console.log(`login error: ${err}`);
          setError('Login failed');
      }
  };

  return (
    <Formik
      initialValues={{username: '', name: '', email: '', password: '', birthDate: '', firstname: '', lastname: '' }}
      validationSchema={validationSchema}
      onSubmit={handleRegister}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
      <View style={styles.container}>
        <Header onlyLOGO={true} />
        <ScrollView>
        <View style={styles.body}>
          <Text style={[globalStyles.defaultText, styles.header]}>Тепер давай зареєструємо тебе у додатку</Text>
          {/* <Text style={[globalStyles.defaultText, styles.subHeader]}>Ми надіслали код на адресу <Text style={styles.link}>Змінити</Text></Text> */}
          <TextInput
            style={[globalStyles.defaultText, styles.input]}
            placeholder="Login*"
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            value={values.username}
          />
          {touched.username && errors.username ? (
            <Text style={[globalStyles.defaultText, styles.errorText]}>{errors.username}</Text>
          ) : null}
          <TextInput
            style={[globalStyles.defaultText, styles.input]}
            placeholder="Ім'я*"
            onChangeText={handleChange('firstname')}
            onBlur={handleBlur('firstname')}
            value={values.firstname}
          />
          {touched.firstname && errors.firstname ? (
            <Text style={[globalStyles.defaultText, styles.errorText]}>{errors.firstname}</Text>
              ) : null}
          <TextInput
            style={[globalStyles.defaultText, styles.input]}
            placeholder="Прізвище*"
            onChangeText={handleChange('lastname')}
            onBlur={handleBlur('lastname')}
            value={values.lastname}
          />
          {touched.lastname && errors.lastname ? (
            <Text style={[globalStyles.defaultText, styles.errorText]}>{errors.lastname}</Text>
          ) : null}
          <TextInput
            style={[globalStyles.defaultText, styles.input]}
            placeholder="Email*"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
          />
          {touched.email && errors.email ? (
            <Text style={[globalStyles.defaultText, styles.errorText]}>{errors.email}</Text>
          ) : null}
          <TextInput
            style={[globalStyles.defaultText, styles.input]}
            placeholder="Пароль*"
            secureTextEntry
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
          />
          {touched.password && errors.password ? (
            <Text style={[globalStyles.defaultText, styles.errorText]}>{errors.password}</Text>
          ) : null}
          {/* <Text style={styles.passwordHint}>Мінімум символів: 8</Text> */}
          <TextInput
            style={[globalStyles.defaultText, styles.input]}
            placeholder="Дата народження* (РРРР-ММ-ДД)"
            onChangeText={handleChange('birthDate')}
            onBlur={handleBlur('birthDate')}
            value={values.birthDate}
          />
          {touched.birthDate && errors.birthDate ? (
            <Text style={[globalStyles.defaultText, styles.errorText]}>{errors.birthDate}</Text>
          ) : null}
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={[globalStyles.defaultText, styles.buttonText]}>Створити аккаунт</Text>
          </Pressable>
        </View>
        </ScrollView>
      </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    },
  body: {
    flex: 1,
    padding: 20,
    alignItems: 'stretch',
    justifyContent: 'center',
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
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 10,
  },
  passwordHint: {
    fontSize: 12,
    color: '#777',
    marginBottom: 10,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#FFC700',
    // alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
    width: 150,
    width: '60%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default RegistrationScreen;
