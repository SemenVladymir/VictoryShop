import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/common/header';
import globalStyles from './styles';

const Error = () => {
const navigation = useNavigation();

  return (
    <View style={styles.box}>
      <Header/>
    <View style={styles.container}>
          
          <Text style={ styles.errorCode}>404</Text>
          <Text style={[globalStyles.defaultText, styles.errorMessage]}>Схоже, ми не можемо знайти потрібну вам сторінку</Text>
          <Pressable style={styles.button} onPress={() => navigation.navigate('Main')}>
            <Text style={[globalStyles.defaultText, styles.buttonText]}>Перейти на головну</Text>
          </Pressable>
      </View>
  </View>
      );
};

const styles = StyleSheet.create({
  box: {
    height: '100%',
  },
  container: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  logo: {
    position: 'absolute',
    top: 20,
    left: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  errorCode: {
    fontSize: 96,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  errorMessage: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    marginBottom: 24,
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: '#4748FF',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Error;
