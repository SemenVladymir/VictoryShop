import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Header from '../../components/common/header'
import globalStyles from '../Other/styles';

const HelpScreen = () => {
  return (
    <View style={styles.container}>
      {/* Logo */}
    <Header onlyLOGO={false} />
    <View style={styles.body}>

      {/* Title */}
      <Text style={[globalStyles.boldText, styles.title]}>ОТРИМАТИ ДОПОМОГУ</Text>

        {/* Search Input */}
        <Text style={[globalStyles.defaultText, styles.label]}>Чим ми можемо вам допомогти?</Text>
        <View style={styles.inputContainer}>
        <AntDesign name="search1" size={24} color="black" />
        <TextInput style={[globalStyles.defaultText, styles.input]} />
        </View>
        <View style={styles.horizontalLine} />

        {/* Card Number Input */}
        <View style={styles.inputContainer}>
            <TextInput style={[globalStyles.defaultText, styles.input]} placeholder="Номер подарункової картки*"/>
        </View>

          {/* PIN Input */}
        <View style={styles.inputContainer}>
            <TextInput style={[globalStyles.defaultText, styles.input]} placeholder="PIN*" secureTextEntry/>
        </View>

      {/* Help Text */}
      <Text style={[globalStyles.defaultText, styles.helpText]}>
        Потрібна допомога? Номер картки та PIN-код указано на звороті подарункової картки або в електронному листі з оригінальною подарунковою карткою.
      </Text>

      {/* Check Balance Button */}
      <TouchableOpacity style={[styles.button, styles.buttonShadow]}>
        <Text style={[globalStyles.defaultText, styles.buttonText]}>Перевірте баланс</Text>
              </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
},
body: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    },
label: {
    fontSize: 16,
    marginBottom: -10,
},
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
    width: '90%',
    backgroundColor: '#F5F5F5',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#000',
  },
  helpText: {
    fontSize: 14,
    color: '#777',
    marginBottom: 20,
    textAlign: 'justify',
    width: '90%',
  },
  button: {
    backgroundColor: '#4748FF',
    padding: 12,
    borderRadius: 25,
    marginBottom: 30,
    width: '60%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
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
},
horizontalLine: {
    width: '90%',
    borderBottomColor: '#000',
    borderBottomWidth: 2,
    marginBottom: 20,
},
});

export default HelpScreen;
