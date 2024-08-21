import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../services/api';
import { Order, Status, Delivery, Payment } from '../components/Cart/OrderClass'
import { AuthContext } from './AuthContext';

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
    console.error('Error fetchin getting status by orderId (OrderContext) 49 - ' +error);
    return [];
  }
};

//Функция получения заказов со статусом в ожидании (добаленные в корзину)
const getActualOrders = async () => {
    try {
        const response = await API.get(true, '/Order/GetOrdersByUserIdAndStatusId2');
        if (response) {
            // console.log('Actual Orders - ' + response.data);
            return response.map(Data => new Order(Data.Id, Data.ProductId, Data.UserId, Data.StatusId, Data.Amount)) || [];
        }
        return [];
        } catch (error) {
        console.error('Error fetchin actual orders by statusId=2 (OrderContext) 64 - ' +error);
        return [];
    }
  };

  //Функция сохранения заказа в базе данных
const saveNewOrder = async (productId) => {
    try {
        const order = new Order(0, productId, '1', 2, 1);
        const response = await API.post('/Order/CreateOrder', order);
        // console.log('New Order - '+response);
    } catch (error) {
      console.error('Error fetchin sazes - ' +error);
      return [];
    }
  };


// Функция для извлечения массива всех заказов клиента из базы данных 
const getAllOrders = async (update = true) => {
  var ArrayData;
  try {
      ArrayData = await API.get(true, '/Order/GetAllOrdersByUser');
      // console.log('ArrayData getAllOrders - '+ArrayData);
      if (ArrayData)
        return ArrayData.map(Data => new Order(Data.Id, Data.ProductId, Data.UserId, Data.StatusId, Data.Amount));
      else
        return []; // Если данных нет, возвращаем пустой массив
  } catch (error) {
    console.error('Error loading product array:', error);
    return [];
  }
};

//Функция изменения статуса заказа в базе данных
const changeOrder = async (order, statusId, amount) => {
    try {
        // const orders = getAllOrders();
        // const data = orders.find(item => item.id == orderId);
      if (order) {
        order.statusId = statusId;
        order.amount = amount;
            // const order = new Order(data.id, data.productId, 'userid', statusId, amount);
            const response = await API.post('/Order/UpdateOrder', order);
            // console.log('New Order - ' + response);
        }
    } catch (error) {
      console.error('Error fetchin save changed order - ' +error);
      return [];
    }
};
  
//Функция создания ордера на поставку товара в базе данных
const createDelivery = async (OrderId, StatusId=2, Address, Additionally) => {
  try {
    if (OrderId && Address) {
          const delivery = new Delivery(0, 'userid', StatusId, OrderId, Address, Additionally, new Date());
          const response = await API.post('/Delivery/CreateDelivery', delivery);
      }
  } catch (error) {
    console.error('Error fetchin save changed order - ' + error);
    return [];
  }
};

//Функция создания ордера на оплату в базе данных
const createPayment = async (OrderId, Summ, StatusId=2, Amount) => {
  try {
    if (OrderId && Summ) {
          const payment = new Payment(0, OrderId, Summ, StatusId, Amount);
          const response = await API.post('/Payment/CreatePayment', payment);
      }
  } catch (error) {
    console.error('Error fetchin save changed order - ' + error);
    return [];
  }
};

const OrderProvider = ({ children }) => {
  const [countActualOrders, setCountActualOrders] = useState('');
  const [orders, setOrders] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [actualOrders, setActualOrders] = useState([]);
  const { userEntered, refreshToken } = useContext(AuthContext);

 //Для индикации загрузки данных
  const [loading, setLoading] = useState(true);


  //Загрузка данных по продуктам
  useEffect(() => {
    const loadData = async () => {
      try {
        if (userEntered) {
          const [orderList, statusList, actualOrderList] = await Promise.all([
            getAllOrders(),
            fetchData('/Order/GetAllStatuses', 'Status', Status),
            getActualOrders(),

          ]);
          setOrders(orderList);
          saveArrayToAsyncStorage('Order', orders);
          setStatuses(statusList);
          saveArrayToAsyncStorage('Status', statuses);
          setActualOrders(actualOrderList);
          setCountActualOrders(actualOrders.length);
        }
      } catch (error) {
        console.error('Error loading product data', error);
      } finally {
        setLoading(false); // Завершить индикацию загрузки данных
      }

    }
    loadData();
  }, [userEntered, refreshToken]);


  return (
    <OrderContext.Provider value={{
      orders, statuses, actualOrders, saveNewOrder, createDelivery, createPayment,
      changeOrder, getActualOrders, getAllOrders, setActualOrders, countActualOrders, setCountActualOrders,
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export { OrderContext, OrderProvider };
