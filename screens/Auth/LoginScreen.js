import React, { useContext, useState }  from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, Alert } from 'react-native';
import API from '../../services/api';
import globalStyles from '../Other/styles';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/common/header';
import { AuthContext } from '../../store/AuthContext';
import { StackActions } from '@react-navigation/native';

export default function Login({ navigation }) {
  const { enterUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  
  // const navigation = useNavigation();
        
  const handleRegister = async () => {
    setLoading(true);
    try {
      console.log(`Username - ${username} and password - ${password}`)
      const response = await API.login(username, password);
      console.log("Response after login "+response);
      if (!response)
        Alert.alert('Ви ввели невірні дані, спробуйте ще раз!')
      else {
        console.log("Login OK");
        await enterUser();
        // setUserEntered(true);
        navigation.navigate('Main');
        // navigation.navigate('Main');
      }
    } catch (err) {
      console.log(`login error: ${err}`);
      setError('Login failed');
      navigation.navigation('Error');
    }
    finally {
      setLoading(false);
    }
  };
      

  return (
    <View style={styles.container}>
      <Header onlyLOGO={true} />
      <View style={styles.body}>
            <Text style={[globalStyles.defaultText, styles.instructions]}>Введіть свій логін та пароль, щоб увійти.</Text>
                <TextInput
                    style={[globalStyles.defaultText, styles.input]}
                    placeholder="Login"
                    placeholderTextColor="#000"
                    value={username}
                    onChangeText={setUserName}
                />
                <TextInput
                    style={[globalStyles.defaultText, styles.input]}
                    secureTextEntry={true}
                    placeholder="Password"
                    placeholderTextColor="#000"
                    value={password}
                    onChangeText={setPassword}
                />
                <Text style={styles.policyText}>
                    Продовжуючи, я приймаю{' '}
                    <Text style={[globalStyles.defaultText, styles.link]}>Політику конфіденційності</Text> та{' '}
                    <Text style={[globalStyles.defaultText, styles.link]}>Умови використання</Text>
                    ......
                </Text>
                <Pressable style={styles.button} onPress={handleRegister}>
                    <Text style={[globalStyles.defaultText, styles.buttonText]}>Продовжити</Text>
                </Pressable>
      </View>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  body: {
    //marginTop: '30%',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  instructions: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 20,
    backgroundColor: '#F5F5F5',
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
    marginTop: 30,
    backgroundColor: '#4748FF',
    // alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
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
    width: 170,
    height: 44,
    textAlign: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});
