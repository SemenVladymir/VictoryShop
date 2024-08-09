import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import globalStyles from '../Other/styles';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/common/header';

const EnterNRegistr = ({navigation}) => {
  // const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header onlyLOGO={true} />
      <View style={styles.body}>
        <Image source={require('../../assets/images/Frame 191.png')} style={styles.image} />
        <Pressable style={[styles.buttonLogin, styles.buttonShadow]} onPress={() => navigation.navigate('Login')}>
          <Text style={[globalStyles.defaultText,  styles.buttonText1]}>Вхід</Text>
        </Pressable>
        <Pressable style={[styles.buttonRegister, styles.buttonShadow]} onPress={() => navigation.navigate('RegistrationNValidation')}>
          <Text style={[globalStyles.defaultText, styles.buttonText2]}>Реєстрація</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    width: '100%',
    height: '60%',
    resizeMode: 'contain',
    marginBottom: 10,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  buttonLogin: {
    backgroundColor: '#FFC700',
    padding: 12,
    borderRadius: 25,
    marginTop: 20,
    width: '50%',
    alignItems: 'center',
  },
  buttonRegister: {
    backgroundColor: '#4748FF',
    padding: 12,
    borderRadius: 25,
    marginTop: 30,
    width: '50%',
    alignItems: 'center',
  },
  buttonText1: {
    color: '#000',
    fontSize: 18,
  },
  buttonText2: {
    color: '#fff',
    fontSize: 18,
  },
  buttonShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  }
});

export default EnterNRegistr;
