// pages/HomePage.js
import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import Header from '../../components/common/header';
import globalStyles from '../Other/styles';
import { useNavigation } from '@react-navigation/native';
//import Footer from './footer';

const Main = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header cartCount={2} onlyLOGO={false}/>
      <View style={styles.body}>
          <Image source={require('../../assets/images/img2.png')} style={styles.image} />
        <Text style={[globalStyles.boldText, styles.bodyText1]}>{`Твоя перемога ближче,\n ніж здається!`}</Text>
        <Text style={[globalStyles.defaultText, styles.bodyText2]}>{`Знижка до 70%\n на весь асортимент спортивних товарів!`}</Text>
        
        <Pressable style={styles.button} onPress={() => navigation.navigate('Profile')}>
          <Text style={[globalStyles.defaultText, styles.buttonText]}>До покупок</Text>
        </Pressable>
      </View>
      {/* <Footer /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    //alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '60%',
    resizeMode: 'contain',
    marginBottom: 15,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  bodyText1: {
    textAlign: 'center',
    fontSize: 20,
  },
  bodyText2: {
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: 14,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4748FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    paddingVertical: 15,
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
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Main;