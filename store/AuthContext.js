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
  const [userEntered, setUserEntered] = useState(false);

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
        
      }
      enterUser();
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

  const enterUser = async () => {
    const Data = await API.get(true, '/Auth/GetProfile');
        console.log('1. User profile data - ' + Data);
        if (Data) {
          const userProfile = new User(Data.id, Data.userName, Data.email, Data.roles,
            Data.firstName, Data.lastName, Data.Birthdate, Data.phoneNumber);
          saveData('UserProfile', userProfile);
          // console.table(Data);
          setUserName(userProfile.login);
          setFirstName(userProfile.firstname);
          setLastName(userProfile.lastname);
          setPhoneNumber(userProfile.phone);
          setBirthDate(userProfile.birthdate);
          setEmail(userProfile.email);
          // const userPhoto = await API.get(true, '/Auth/GetProfilePhoto')
          // const userPhoto = await API.downloadImage();
          // saveData('userPhoto', userPhoto);
          // setUserPhoto(userPhoto);
          // saveImageToLocalDirectory(userPhoto);
          setUserEntered(true);
    }
        else {
          setUserEntered(false);
    }
  };

  //Метод сохранения изображения в локальной директории
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

  
  //Метод получения изображения из локальной директории
  const getImageFromLocalDirectory = async () => {
    try {
      const fileName = 'Profilephoto.png'; // Название файла, которое нужно получить
      const directory = FileSystem.documentDirectory + 'assets/images/';
      const filePath = directory + fileName;
      setUserPhoto(filePath);
      return filePath;
      // Проверьте, существует ли файл
      const fileInfo = await FileSystem.getInfoAsync(filePath);
      if (!fileInfo.exists) {
        console.log('File does not exist');
        return null; // Можно вернуть null или другую обработку отсутствия файла
      }
  
      // Считайте файл как base64 строку
      const imageBase64 = await FileSystem.readAsStringAsync(filePath, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      console.log('Image retrieved from local directory');
      return 'data:image/png;base64,' + imageBase64; // Верните изображение в формате base64
    } catch (error) {
      console.error('Error retrieving image:', error);
      return null; // Возвращайте null или другую обработку ошибок
    }
  };

  return (
    <AuthContext.Provider value={{
      hasToken, saveImageToLocalDirectory, getImageFromLocalDirectory,
      username, userToken, refreshToken, firstname, lastname, phonenumber,
      birthdate, userphoto, email, userEntered, setUserEntered, setFirstName,
      setLastName, setPhoneNumber, setEmail,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
