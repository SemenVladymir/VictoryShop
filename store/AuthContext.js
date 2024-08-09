import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../services/api';
import Storage from './AsyncStorageUtil'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const loadToken = async () => {
      const date = await AsyncStorage.getItem('RefreshTokenEndDate');
      if (parseInt(date, 10) < Date.now())
      {
        const token = await AsyncStorage.getItem('token');
        const refreshtoken = await AsyncStorage.getItem('refreshToken');
        // console.log('Token in AsyncStore - '+token);
        // console.log('RefreshToken in AsyncStore - ' + refreshtoken);
        // console.log('RefreshTokenEndDate in AsyncStore - ' + date);
          try
          {
            if (token) {
              await API.refreshToken();
              await API.get(true, '/Auth/GetProfile');
                  setHasToken(true);
                  console.log('Token refreshed');
              }
              else
                  console.log('You need registration!');
          }
          catch (err) {
              console.log(err);
        }
        // const newtoken = await AsyncStorage.getItem('token');
        // const newrefreshtoken = await AsyncStorage.getItem('refreshToken');
        // const newdate = await AsyncStorage.getItem('RefreshTokenEndDate');
      //   console.log('New Token in AsyncStore - '+newtoken);
      //   console.log('New RefreshToken in AsyncStore - ' + newrefreshtoken);
      // console.log('New RefreshTokenEndDate in AsyncStore - ' + newdate);
      // console.log('Now date - ' + new Date());
      // console.log('Now date - ' + Date.now());
        setUserToken(token);
        setRefreshToken(refreshtoken);
        console.log(await API.get(false, ''));
      }
      console.log('Time is not exit!');
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

  return (
    <AuthContext.Provider value={{ userToken, saveToken, removeToken, hasToken }}>
      {children}
    </AuthContext.Provider>
  );
};
