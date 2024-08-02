import AsyncStorage from '@react-native-async-storage/async-storage';

export const logAsyncStorage = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    console.log('Current AsyncStorage:', result);
  } catch (error) {
    console.error('Error fetching AsyncStorage contents', error);
  }
};
