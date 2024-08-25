import React, { createContext, useState, useEffect } from 'react';
import API from '../services/api';
import { User } from '../components/User/UserClass'
import { saveData, getData, getDataString } from '../services/AsyncStorageUtil';
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
  const [userphoto, setUserPhoto] = useState(null);

  useEffect(() => {
    loadToken();
  }, []);

  const loadToken = async () => {
    const date = await getDataString('RefreshTokenEndDate');
    if (date && parseInt(date, 10) < Date.now())
    {
      try
      {
        const token = await getDataString('Token');
        console.log('Token from AsyncStorage line 35 AuthContext - ' + token);
        const Refreshtoken = await getDataString('RefreshToken');
        console.log('Refreshtoken from AsyncStorage line 37 AuthContext - ' + Refreshtoken);
        setUserToken(token);
        setRefreshToken(Refreshtoken);
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
    }
    else {
      console.log('Time is not exit!');
    }
    enterUser();
    setHasToken(true);
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
          getDataString('ProfilePhoto').then(photo => { 
            if (photo)
              setUserPhoto(photo);
            else
              setUserPhoto(null);
          }).catch(error => {
            console.error('Error loading ProfilePhoto line 88 AuthContext:', error);
          });
    }
        else {
          setUserEntered(false);
    }
  };

  //Метод сохранения изображения в локальной директории
  const saveImageToLocalDirectory = async (uri) => {
    try {
      const match = uri.match(/\.(\w+)$/);
      const filename = userphoto.split('/').pop().split('.')[0];
      console.log(`File name from uri: ${filename}`);
      const fileExtension = match ? match[1] : null;
      console.log('fileextension - ' + fileExtension);
      let fileName = '';
      if (filename == 'Profilephoto1')
        fileName = 'Profilephoto2.' + fileExtension;
      else
        fileName = 'Profilephoto1.'+fileExtension;
      // Название файла, под которым он будет сохранен
      const directory = FileSystem.documentDirectory + 'assets/images/';
      console.log("Directory is - "+directory);
      // Убедитесь, что директория существует, иначе создайте ее
      const dirInfo = await FileSystem.getInfoAsync(directory);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
      }

      const destPath = directory + fileName;
      const fileInfo = await FileSystem.getInfoAsync(destPath);
      if (fileInfo.exists) {
        console.log('Image file exist line 113');
        await FileSystem.deleteAsync(destPath);
        const fileInfo2 = await FileSystem.getInfoAsync(destPath);
        if (fileInfo2.exists)
          console.log('Image file else exist line 116');
      }
      await FileSystem.copyAsync({
        from: uri,
        to: destPath,
      });
      setUserPhoto(destPath);
      console.log(`Image saved to: ${destPath}`);
      await new Promise(resolve => setTimeout(resolve, 3000)); // Задержка в 100ms
      console.log(`Image from userPhoto in AuthContext line 111:  ${userphoto}`);
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  
  //Метод получения изображения из локальной директории
  const getImageFromLocalDirectory = async () => {
    try {
      const fileName = 'Profilephoto.jpg'; // Название файла, которое нужно получить
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
      setLastName, setPhoneNumber, setEmail, enterUser, setUserPhoto
    }}>
      {children}
    </AuthContext.Provider>
  );
};
