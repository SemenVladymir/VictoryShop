import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../services/api';
import { Order, Status } from '../components/Cart/OrderClass'

const OrderContext = createContext();

// Функция для извлечения массива объектов универсального класса из AsyncStorage или базы данных сервера
const fetchData = async (url, key, Class, update=false) => {
  var response;
  try {
    const ArrayString = await AsyncStorage.getItem(key);
    if (ArrayString != null) {
      response = JSON.parse(ArrayString);
      // console.log(key+' respons from AsyncStorage - '+response);
    }
    if (ArrayString == null || response.length == 0 || update) {
      // console.log(key+' respons1 - '+response);
      response = await API.get(false, url);
      // console.log(key+' respons from API - '+response);
    }
    // console.log(Class+' - '+response.content);
    return response.map(item => new Class(item.Id, item.Name));
  } catch (error) {
    console.error(`Error fetching ${Class.name.toLowerCase()}s:`, error);
    return [];
  }
};

// Функция для сохранения массива объектов класса в AsyncStorage
const saveArrayToAsyncStorage = async (key, ClassArray) => {
  try {
    const ArrayString = JSON.stringify(ClassArray);
    await AsyncStorage.setItem(key, ArrayString);
  } catch (error) {
    console.error('Error saving array object to AsyncStorage:', error);
  }
};



//Функция получения названия статуса по Id-коду заказа
const getStatus = async (orderId) => {
  try {
    const response = await API.get(false, '/Product/GetSizesByProductId' + productId);
    // console.log('Photos - '+response.data);
    return response.map(item => new Size(item.Id, item.InternationalName, item.LocalName));
  } catch (error) {
    console.error('Error fetchin sazes - ' +error);
    return [];
  }
};

//Функция получения заказов со статусом в ожидании (добаленные в корзину)
const getActualOrder = async () => {
    try {
      const response = await API.get(true, '/Product/GetOrdersByUserIdAndStatusId2');
      // console.log('Photos - '+response.data);
      return response.map(Data => new Order(Data.Id, Data.ProductId, Data.UserId, Data.StatusId, Data.Amount));
    } catch (error) {
      console.error('Error fetchin sazes - ' +error);
      return [];
    }
  };



// Функция для извлечения массива объектов сложных классов из AsyncStorage или базы данных 
const loadArray = async (update = true) => {
  var ArrayData;
  try {
      ArrayData = await API.get(true, '/Order/GetAllOrdersByUser');
      if (ArrayData)
        return ArrayData.map(Data => new Order(Data.Id, Data.ProductId, Data.UserId, Data.StatusId, Data.Amount));
      else
        return []; // Если данных нет, возвращаем пустой массив
  } catch (error) {
    console.error('Error loading product array:', error);
    return [];
  }
};


const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [statuses, setStatuses] = useState([]);


 //Для индикации загрузки данных
  const [loading, setLoading] = useState(true);


  //Загрузка данных по продуктам
  useEffect(() => {
    const loadData = async () => {
      try {
        const [orderList, statusList] = await Promise.all([
        loadArray(),
        fetchData('/Order/GetAllStatuses', 'Status', Status),,
      ]);

        setOrders(orderList);
        saveArrayToAsyncStorage('Order', orders);
        setStatuses(statusList);
        saveArrayToAsyncStorage('Status', statuses);


      } catch (error) {
        console.error('Error loading product data', error);
      } finally {
        setLoading(false); // Завершить индикацию загрузки данных
      }

    }
    loadData();
  }, []);


  return (
    <OrderContext.Provider value={{ orders, statuses }}>
      {children}
    </OrderContext.Provider>
  );
};

export { OrderContext, OrderProvider };
