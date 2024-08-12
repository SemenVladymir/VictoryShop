import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../services/api';
import { Product, Color, Country, Cathegory, Subcathegory, Brand, Gender, Size, Sport, Photo, Discount } from '../components/Product/ProductClass'

const ProductContext = createContext();

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

//Функция получения фотографий продукта по id коду продукта
const getPhotos = async (productId) => {
  try {
    const response = await API.get(false, '/Product/GetPhotosByProductId' + productId);
    // console.log('Photos - '+response.data);
    return response.map(item => new Photo(item.Id, item.URL, item.ProductId, item.Details));
  } catch (error) {
    console.error('Error fetchin photos - ' +error);
    return [];
  }
};

//Функция получения размеров продукта по id коду продукта
const getSizes = async (productId) => {
  try {
    const response = await API.get(false, '/Product/GetSizesByProductId' + productId);
    // console.log('Photos - '+response.data);
    return response.map(item => new Size(item.Id, item.InternationalName, item.LocalName));
  } catch (error) {
    console.error('Error fetchin sazes - ' +error);
    return [];
  }
};

// Функция для извлечения массива объектов сложных классов из AsyncStorage или базы данных 
const loadArray = async (key, update = true) => {
  var ArrayData;
  try {
    switch (key)
    {
      case 'Product':
        const productArrayString = await AsyncStorage.getItem('Product');
        if (productArrayString != null)
          ArrayData = JSON.parse(productArrayString);
        if (productArrayString == null || ArrayData.length == 0 || update)
          ArrayData = await API.get(false, '/Product/GetAllProducts');
        return await Promise.all(ArrayData.map(async (Data) => {
          const product = new Product(Data.Id, Data.Name, Data.Description, Data.Price, [],
            Data.CathegoryId, Data.DiscountId, Data.IsAvailable, Data.CountryId, Data.BrandId, Data.GenderId,
            Data.SubcathegoryId, Data.SportId, Data.ColorId, []);
          const photos = await getPhotos(product.id);
          const sizes = await getSizes(product.id);
          if (photos)
            product.photos = photos;
          if (sizes)
            product.sizes = sizes;
          return product;
        }
        ));
      
      
      case 'Subcathegory':
        const subcathegoryArrayString = await AsyncStorage.getItem('Subcathegory');
        if (subcathegoryArrayString != null)
          ArrayData = JSON.parse(subcathegoryArrayString);
        if (subcathegoryArrayString == null || ArrayData.length == 0 || update)
          ArrayData = await API.get(false, '/Product/GetAllSubcathegories');
        return ArrayData.map(Data => new Subcathegory(Data.Id, Data.Name, Data.CathegoryId));
      
      
      case 'Discount':
        // console.log('Discount');
        const discountArrayString = await AsyncStorage.getItem('Discount');
        if (discountArrayString != null) {
          ArrayData = JSON.parse(discountArrayString);
          // console.log(ArrayData);
        }
        if (discountArrayString == null || ArrayData.length == 0 || update)
          ArrayData = await API.get(false, '/Product/GetAllDiscounts');
        // console.log(ArrayData);
        return ArrayData.map(Data => new Discount(Data.Id, Data.Name, Data.StartDate, Data.EndDate, Data.Percent));
    }
    return []; // Если данных нет, возвращаем пустой массив
  } catch (error) {
    console.error('Error loading product array:', error);
    return [];
  }
};


const ProductProvider = ({ children }) => {
  const [cathegories, setCathegories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [genders, setGenders] = useState([]);
  const [sports, setSports] = useState([]);
  const [colors, setColors] = useState([]);
  const [brands, setBrands] = useState([]);

  const [discounts, setDiscounts] = useState([]);
  const [subcathegories, setSubcathegories] = useState([]);
  const [products, setProducts] = useState([]);

 //Для индикации загрузки данных
  const [loading, setLoading] = useState(true);


  //Загрузка данных по продуктам
  useEffect(() => {
    const loadData = async () => {
      try {
        const [sportList, colorList, countryList, brandList, cathegoryList, genderList,
          productList, subcathegoryList, discountList] = await Promise.all([
        fetchData('/Product/GetAllItemsFromUniversalClass?classtype=Sport', 'Sport', Sport),
        fetchData('/Product/GetAllItemsFromUniversalClass?classtype=Color', 'Color', Color),
        fetchData('/Product/GetAllItemsFromUniversalClass?classtype=Country', 'Country', Country),
        fetchData('/Product/GetAllItemsFromUniversalClass?classtype=Brand', 'Brand', Brand),
        fetchData('/Product/GetAllItemsFromUniversalClass?classtype=Cathegory', 'Cathegory', Cathegory),
        fetchData('/Product/GetAllItemsFromUniversalClass?classtype=Gender', 'Gender', Gender),
        loadArray('Product'),
        loadArray('Subcathegory'),
        loadArray('Discount')
      ]);

        setSports(sportList);
        saveArrayToAsyncStorage('Sport', sports);
        setColors(colorList);
        saveArrayToAsyncStorage('Color', colors);
        setGenders(genderList);
        saveArrayToAsyncStorage('Gender', genders);
        setCountries(countryList);
        saveArrayToAsyncStorage('Country', countries);
        setBrands(brandList);
        saveArrayToAsyncStorage('Brand', brands);
        setCathegories(cathegoryList);
        saveArrayToAsyncStorage('Cathegory', cathegories);
        setProducts(productList);
        setSubcathegories(subcathegoryList);
        saveArrayToAsyncStorage('Subcathegory', subcathegories);
        setDiscounts(discountList);
        saveArrayToAsyncStorage('Discount', discounts);

      } catch (error) {
        console.error('Error loading product data', error);
      } finally {
        setLoading(false); // Завершить индикацию загрузки данных
      }

    }
    loadData();
  }, []);


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
    <ProductContext.Provider value={{ products, colors, brands, sports, cathegories, countries, genders, subcathegories, discounts, getPhotos, saveArrayToAsyncStorage, findProduct, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
