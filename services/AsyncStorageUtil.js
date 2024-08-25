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

// Сохранение массива в AsyncStorage
export const saveData = async (key, data) => {
  try {
    if (key && data)
      await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(e);
  }
};

// Загрузка массива из AsyncStorage
export const getData = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data != null ? JSON.parse(data) : [];
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getDataString = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data != null ? JSON.parse(data) : null;
  } catch (e) {
    console.error(e);
    return null;
  }
};

// Добавление нового data в массив
export const addNewData = async (key, newData) => {
  try {
    if (key && newData) {
      const data = await getData(key);
      if (!data.includes(newData)) {
        data.push(newData);
        await saveData(key, data);
      }
    }
  } catch (e) {
    console.error(e);
  }
};

// Удаление ID из массива
export const removeDataItemById = async (key, dataItemId) => {
  try {
    if (key && dataItemId) {
      let data = await getData(key);
      data = data.filter(id => id !== dataItemId);
      await saveData(key, data);
    }
  } catch (e) {
    console.error(e);
  }
};

//Очистка данных из AsyncStorage
export const clearData = async (key) => {
  try {
    if (key)
      await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(e);
  }
};