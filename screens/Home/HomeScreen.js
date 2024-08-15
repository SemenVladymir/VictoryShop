import React  from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import globalStyles from '../Other/styles';
import Header from '../../components/common/header';

export default function Home() {

  return (
        <View style={styles.container}>
            <Header onlyLOGO={true}/>
            <View style={styles.body}>
            <Text style={[globalStyles.defaultText, styles.instructions]}>Вкажіть адресу електронної пошти, щоб увійти або зареєструватися.</Text>
                <TextInput
                    style={[globalStyles.defaultText, styles.input]}
                    placeholder="Login"
                    placeholderTextColor="#C7C7CD"
                />
                <TextInput
                    style={[globalStyles.defaultText, styles.input]}
                    placeholder="Password"
                    placeholderTextColor="#C7C7CD"
                />
                <Text style={[globalStyles.defaultText, styles.policyText]}>
                    Продовжуючи, я приймаю{' '}
                    <Text style={styles.link}>Політику конфіденційності</Text> та{' '}
                    <Text style={styles.link}>Умови використання</Text>
                    ......
                </Text>
                <Pressable style={styles.button}>
                    <Text style={[globalStyles.defaultText, styles.buttonText]}>Продовжити</Text>
                </Pressable>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
    },
    body: {
      flex: 1,
      alignItems: 'center',
      padding: 20,
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
    },
    instructions: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
    },
    input: {
      height: 40,
      borderColor: '#C7C7CD',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 20,
    },
    policyText: {
      fontSize: 12,
      textAlign: 'center',
      color: '#6A6A6A',
      marginBottom: 20,
    },
    link: {
      color: '#1E90FF',
    },
    button: {
      backgroundColor: '#4748FF',
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
    },
    buttonText: {
      color: '#FFF',
      fontSize: 16,
    },
  });
  