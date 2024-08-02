import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../services/api';

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Для индикации загрузки данных


  //Завантаження продуктів через сервер з БД
  useEffect(() => {
    const loadProductData = async () => {
      try {
        // Сначала попытаться загрузить данные из AsyncStorage
        const storedProductData = await AsyncStorage.getItem('products');
        if (storedProductData) {
          setProducts(JSON.parse(storedProductData));
        }

        // Затем загрузить данные с сервера
        const response = await API.get(false, '/Product/GetAllProducts');
        const serverProductData = await response.json();
        
        // Обновить состояние и сохранить данные в AsyncStorage
        setProducts(serverProductData);
        await AsyncStorage.setItem('products', JSON.stringify(serverProductData));
      } catch (error) {
        console.error('Error loading product data', error);
      } finally {
        setLoading(false); // Завершить индикацию загрузки данных
      }
    };

    loadProductData();
  }, []);

  //Збереження продукту в AsyncStorage
  const saveProduct = async (productData) => {
    const newProducts = [...products, productData];
    setProducts(newProducts);
    await AsyncStorage.setItem('products', JSON.stringify(newProducts));
  };

  //Пошук продукту по назві
  const findProduct = async (name) => {
    let product = products.find(p => p.name === name);

    if (!product) {
      const productData = await AsyncStorage.getItem('products');
      if (productData) {
        const storedProducts = JSON.parse(productData);
        product = storedProducts.find(p => p.name === name);
      }
    }

    return product;
  };

  return (
    <ProductContext.Provider value={{ products, saveProduct, findProduct, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
