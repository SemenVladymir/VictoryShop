import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { getData, saveData } from '../services/AsyncStorageUtil';
import API from '../services/api';
import { Product, Color, Country, Cathegory, Subcathegory, Brand, Gender, Size, Sport, Photo, Discount } from '../components/Product/ProductClass'

const ProductContext = createContext();

// Функция для извлечения массива объектов универсального класса из AsyncStorage или базы данных сервера
const fetchData = async (url, key, Class, update=false) => {
  try {
    let response = [];
    // response = await getData(key);

    // if (ArrayString != null) {
    //   response = JSON.parse(ArrayString);
      // console.log(key+' respons from AsyncStorage - '+response.length+' second element - '+response[1].name);
    // }
    if (response == null || response.length == 0 || update) {
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
const loadArray = async (key, update = false) => {
  let ArrayData = [];
  try {
    switch (key)
    {
      case 'Product':
        if (ArrayData == null || ArrayData.length == 0 || update) {
          console.log('1. Enter in get products '+Date());
          ArrayData = await API.get(false, '/Product/GetAllProducts2');
          console.log('2. Get products from SQL-basa '+Date());
          // const initialProducts = ArrayData.slice(0, 20);
          const products = await Promise.all(ArrayData.map(async (Data) => {
            const product = new Product(Data.Id, Data.Name, Data.Description, Data.Price,
              Data.Photos.map(photo => new Photo(photo.Id, photo.URL, photo.ProductId, photo.Details)),
              Data.CathegoryId, Data.DiscountId, Data.IsAvailable, Data.CountryId, Data.BrandId, Data.GenderId,
              Data.SubcathegoryId, Data.SportId, Data.ColorId,
              Data.ListOfSizes.map(size => new Size(size.Id, size.InternationalName, size.LocalName)));
            return product;
          }
          ));
          console.log('3. Get products from SQL-basa '+Date());
          return products;
        }
      
      
      case 'Subcathegory':
        ArrayData = await getData('Subcathegory');
        if (ArrayData == null || ArrayData.length == 0 || update)
          ArrayData = await API.get(false, '/Product/GetAllSubcathegories');
        return ArrayData.map(Data => new Subcathegory(Data.Id, Data.Name, Data.CathegoryId));
      
      
      case 'Discount':
        ArrayData = await getData('Discount');
        if (ArrayData == null || ArrayData.length == 0 || update)
          ArrayData = await API.get(false, '/Product/GetAllDiscounts');
        return ArrayData.map(Data => new Discount(Data.Id, Data.Name, Data.StartDate, Data.EndDate, Data.Percent));
    }
    return [];
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


  //Функция поэтапной загрузки продуктов из базы
const loadInitialProducts = async () => {
  let ArrayData = [];
  // ArrayData = await getData('Product');

  if (ArrayData == null || ArrayData.length == 0 || update) {
    ArrayData = await API.get(false, '/Product/GetAllProducts');
  }

  const initialProducts = ArrayData.slice(0, 10); // Загружаем и отображаем первые 10 товаров
  const products = await Promise.all(initialProducts.map(async (Data) => {
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
  }));

  // Здесь отобразите первые 10 товаров
  setProducts(products);

  // Загружаем оставшиеся товары в фоне
  loadRemainingProducts(ArrayData.slice(10));
};

const loadRemainingProducts = async (remainingProductsArray) => {
  const remainingProducts = await Promise.all(remainingProductsArray.map(async (Data) => {
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
  }));

  // Добавляем оставшиеся товары к ранее загруженным
  return prevProducts => [...prevProducts, ...remainingProducts];
};


  //Загрузка данных по продуктам
  useEffect(() => {
    const loadData = async () => {
      try {
        const [sportList, colorList, countryList, brandList, cathegoryList, genderList, productList, 
           subcathegoryList, discountList] = await Promise.all([
        fetchData('/Product/GetAllItemsFromUniversalClass?classtype=Sport', 'Sport', Sport),
        fetchData('/Product/GetAllItemsFromUniversalClass?classtype=Color', 'Color', Color),
        fetchData('/Product/GetAllItemsFromUniversalClass?classtype=Country', 'Country', Country),
        fetchData('/Product/GetAllItemsFromUniversalClass?classtype=Brand', 'Brand', Brand),
        fetchData('/Product/GetAllItemsFromUniversalClass?classtype=Cathegory', 'Cathegory', Cathegory),
        fetchData('/Product/GetAllItemsFromUniversalClass?classtype=Gender', 'Gender', Gender),
        loadArray('Product'),
        // loadInitialProducts(),
        loadArray('Subcathegory'),
        loadArray('Discount')
      ]);

        setSports(sportList);
        await saveData('Sport', sports);
        setColors(colorList);
        await saveData('Color', colors);
        setGenders(genderList);
        await saveData('Gender', genders);
        setCountries(countryList);
        await saveData('Country', countries);
        setBrands(brandList);
        await saveData('Brand', brands);
        setCathegories(cathegoryList);
        await saveData('Cathegory', cathegories);
        setProducts(productList);
        setSubcathegories(subcathegoryList);
        await saveData('Subcathegory', subcathegories);
        setDiscounts(discountList);
        await saveData('Discount', discounts);

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
      const productData = await getData('products');
      if (productData) {
        product = productData.find(p => p.name === name);
      }
    }

    return product;
  };

  return (
    <ProductContext.Provider value={{ products, colors, brands, sports, cathegories, countries, genders, subcathegories, discounts, getPhotos, findProduct, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
