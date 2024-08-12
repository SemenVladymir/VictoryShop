import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../services/api';
import { User } from '../components/User/UserClass'
import { saveData, getData } from '../services/AsyncStorageUtil';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const navigation = useNavigation();
  const [userToken, setUserToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [hasToken, setHasToken] = useState(false);

  const [username, setUserName] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [birthdate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [userphoto, setUserPhoto] = useState('');

  useEffect(() => {
    const loadToken = async () => {
      const date = await AsyncStorage.getItem('RefreshTokenEndDate');
      if (parseInt(date, 10) < Date.now())
      {
        const token = await AsyncStorage.getItem('token');
        const refreshtoken = await AsyncStorage.getItem('refreshToken');
          try
          {
            if (token) {
              await API.refreshToken();
              setHasToken(true);
              console.log('Token refreshed');
            }
            else {
              console.log('You need registration!');
            }
          }
          catch (err) {
              console.log(err);
        }
        setUserToken(token);
        setRefreshToken(refreshtoken);
      }
      else {
        // await API.refreshToken();
        console.log('Time is not exit!');
        // const Data = await API.get(true, '/Auth/GetProfile');
        // const userProfile =  new User(Data.id, Data.userName, Data.email, Data.roles,
        //                           Data.firstName, Data.lastName, Data.Birthdate, Data.phoneNumber);
        // saveData('UserProfile', userProfile);
        // // console.table(Data);
        // setUserName(userProfile.login);
        // setFirstName(userProfile.firstname);
        // setLastName(userProfile.lastname);
        // setPhoneNumber(userProfile.phone);
        // setBirthDate(userProfile.birthdate); 
        // setEmail(userProfile.email);
        // const userPhoto = await API.get(true, '/Auth/GetProfilePhoto')
        // const userPhoto = await API.downloadImage();
        // saveData('userPhoto', userPhoto);
        // setUserPhoto(userPhoto);
        // saveImageToLocalDirectory(userPhoto);
      }
        setHasToken(true);

    };
    loadToken();
  }, []);

  const saveToken = async (token, refresToken) => {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('refreshToken', refresToken);
      setUserToken(token);
      setRefreshToken(refresToken);
  };

  const removeToken = async () => {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('refreshToken');
      setUserToken(null);
      setRefreshToken(null);
  };

  const saveImageToLocalDirectory = async (uri) => {
    try {
      const fileName = 'Profilephoto.png'; // Название файла, под которым он будет сохранен
      const directory = FileSystem.documentDirectory + 'assets/images/';
      console.log("Directory is - "+directory);
      // Убедитесь, что директория существует, иначе создайте ее
      const dirInfo = await FileSystem.getInfoAsync(directory);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
      }

      const destPath = directory + fileName;
      await FileSystem.copyAsync({
        from: uri,
        to: destPath,
      });
      setUserPhoto(destPath);
      console.log(`Image saved to: ${destPath}`);
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  return (
    <AuthContext.Provider value={{hasToken, saveImageToLocalDirectory, username,
      firstname, lastname, phonenumber, birthdate, userphoto, email
    }}>
      {children}
    </AuthContext.Provider>
  );
};
