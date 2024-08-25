import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, Pressable } from 'react-native';
import Header from '../../components/common/header';
import globalStyles from '../../screens/Other/styles';
import { ProductContext } from '../../store/ProductContext';
import { Icon } from 'react-native-elements';
import Product from './Product';
import { addNewData } from '../../services/AsyncStorageUtil';
import { OrderContext } from '../../store/OrderContext';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../store/AuthContext';
import Toast from 'react-native-toast-message';


export default function ProductPage({ route }) {
  const navigation = useNavigation();
  const { userEntered } = useContext(AuthContext);
  const { products, countries, colors, brands, genders, discounts } = useContext(ProductContext);
  const { saveNewOrder, getActualOrders, changeOrder, countActualOrders, setCountActualOrders } = useContext(OrderContext);
  const formatNumber = (number) => { return number.toLocaleString('uk-UA'); };
  const { product } = route.params;
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSizeId, setSelectedSizeId] = useState('');
  const sameproducts = products.filter(e => e.subcathegoryId === product.subcathegoryId && e.genderId === product.genderId && e.id !== product.id);
  
  useEffect(() => {
    if (product.photos.length > 0) {
      setSelectedImage(product.photos[0].url);
    }
    setSelectedSizeId(null);
  }, [product.photos]);

  const showMessage = (message) => {
    Toast.show({
      type: 'info', // или 'error', 'info'
      text1: message,
      visibilityTime: 1000, // Время отображения в миллисекундах
    });
  };

  const handlePress = (id) => {
    setSelectedSizeId(id);
  };

  const handleFavorite = async (item) => {
    if (userEntered) {
      await addNewData('Favorites', item.id)
      console.log('Add to Favorite');
      showMessage('Товар додано до улюблених!');
      // return (
      //   <Toast ref={(ref) => Toast.setRef(ref)}/>
      // );

    }
    else
      navigation.navigate('Enter');
  };

  const handleCart = (item) => {
    if (userEntered) {
      getActualOrders().then(orders => {
        if (orders) {
          const hasOrder = orders.find(e => e.productId == item.id);
          console.log('Checking new order if he has in cart (ProductPage line 64 ) - '+hasOrder)
          if (hasOrder)
            changeOrder(hasOrder, 2, hasOrder.amount + 1);
          else {
            saveNewOrder(item.id);
            setCountActualOrders(orders.length + 1);
          }
        }
      })
      .catch(error => {
          console.error('Error loading orders:', error);
          navigation.navigate('Error');
      });
      console.log('Go to Cart');
      // navigation.navigate('Cart');
    }
    else
    navigation.navigate('Enter');
  };

  const getCountry = (product) => {
    if (countries.find(e => e.id === product.countryId))
      return (countries.find(e => e.id == product.countryId).name);
  };
  const getColor = (product) => {
    if (colors.find(e => e.id === product.colorId))
      return colors.find(e => e.id === product.colorId).name;
  };
  const getBrand = (product) => {
    if (brands.find(e => e.id == product.brandId))
      return brands.find(e => e.id == product.brandId).name;
  };
  const getGender = (product) => {
    if (genders.find(e => e.id == product.genderId))
      return genders.find(e => e.id == product.genderId).name;
  };
  const getDiscount = (product) => {
    if (discounts.find(e => e.id == product.discountId))
      return discounts.find(e => e.id == product.discountId).percent;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      
      <View style={{flex: 1, flexDirection: 'column', marginHorizontal: 10, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={[globalStyles.defaultText, styles.productTitle]}>{product.name}</Text>
        <Text style={[globalStyles.defaultText, styles.productSubtitle]}>{getGender(product)}</Text>
              
        <View style={styles.priceContainer}>
        {getDiscount(product) > 0 ? <>
              <Text style={[globalStyles.boldText, styles.newPrice]}>{formatNumber(Math.round(product.price))} грн  </Text>
              <Text>          </Text>
          <Text style={[globalStyles.defaultText, styles.oldPrice]}>{formatNumber(Math.round(product.price/(100 - getDiscount(product))*100))} грн</Text> 
        </> :
            <Text style={[globalStyles.boldText, styles.Price]}>{formatNumber(Math.round(product.price))} грн</Text>
        }
        </View>
          
          <View style={{ height: 370, width: '100%', margin: 0, padding: 0, justifyContent: 'center', alignItems: 'center', borderRadius: 25, overflow: 'hidden', position: 'relative' }}>
            {selectedImage ? <Image source={{ uri: selectedImage }} style={styles.productImage} />
              :
            <Image source={require('../../assets/images/No_Image.jpg')} style={styles.productImage} />}
          {getDiscount(product) > 0 ? <Image source={require('../../assets/images/Discount.png')} style={styles.discountImage}/> : null}
          </View>

              {/* <View style={styles.navigation}>
                  <Pressable>
                      <Image source={{uri: './assets/images/StepLeft.png'}}/>
                  </Pressable>
                  <Pressable>
                      <Image source={{uri: './assets/images/StepRight.png'}}/>
                  </Pressable> */}
          {/* Горизонтальная полоса прокрутки */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {product.photos.map((photo, index) => (
          <Pressable key={index} onPress={() => setSelectedImage(photo.url)}>
            {photo.url ? <Image source={{ uri: photo.url }} style={styles.thumbnail} />
              :
            <Image source={require('../../assets/images/No_Image.jpg')} style={styles.thumbnail} />}
          </Pressable>
        ))}
          </ScrollView>

          <Text style={[globalStyles.boldText, {fontSize: 20, marginTop: 20}]}>Виберіть розмір</Text>
          <View style={styles.sizesbox}>
          
          {product.sizes.map((size, index) => (
            <Pressable
              key={index}
              onPress={() => handlePress(size.id)}
              style={[
                styles.sizeitem,
                selectedSizeId === size.id && styles.selectedSizeItem,
              ]}
            >
              <Text style={{ color: selectedSizeId === size.id ? '#fff' : '#000' }}>
                {size.iname}
              </Text>
            </Pressable>
          ))}
          </View>
          
        </View>
        <View style={styles.buttons}>
            <Pressable style={[styles.buttonShadow, styles.buttonFavorive]} onPress={()=>handleFavorite(product)}>
            <Text style={[globalStyles.defaultText, styles.buttonText]}>Обраний  </Text>
            <Icon name="favorite-border" size={20} color="#000"/>
            </Pressable>
            <Pressable style={[styles.buttonShadow, styles.buttonCart]} onPress={()=>handleCart(product)}>
                <Text style={[globalStyles.defaultText, styles.buttonTextHome]}>Додати в кошик</Text>
            </Pressable>
        </View>
        
        <View style={styles.discountbox}>
          <Text style={[globalStyles.boldText, { fontSize: 20 }]}>Опис</Text>
          <Text style={[globalStyles.boldText, { fontSize: 16 }]}>Бренд: {getBrand(product)}</Text>
          <Text style={[globalStyles.boldText, { fontSize: 16 }]}>Страна виробник: {getCountry(product)}</Text>
          <Text style={[globalStyles.boldText, { fontSize: 16 }]}>Колір: {getColor(product)}</Text>
          <Text style={[globalStyles.defaultText, { fontSize: 16, marginTop: 10, textAlign: 'justify' }]}>{ product.description }</Text>
        </View>

        <Text style={[globalStyles.boldText, {fontSize: 18, marginTop: 20}]}>Вам також може сподобатись</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {sameproducts.map((item, index) => (
            <Pressable key={index} onPress={() => this.handlePress(item)}>
              {/* <View style={{ width: 200, height: 200, marginBottom: 60 }}> */}
                <Product item={item} />
              {/* </View> */}
            </Pressable>
        ))}
          </ScrollView>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
    scrollViewContent: {
      marginTop: 10,
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 20,
    flexWrap: 'wrap',
    textAlign: 'justify',
  },
  productSubtitle: {
    fontSize: 16,
    //color: 'gray',
  },
  priceContainer: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  newPrice: {
    color: 'blue',
  },
  Price: {
    marginRight: 8,
  },
  saleBadge: {
    backgroundColor: 'yellow',
    padding: 4,
    borderRadius: 4,
    position: 'absolute',
    top: 140,
    left: 20,
  },
  saleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
    productImage: {
      width: 370,
      height: 370,
      resizeMode: 'cover',
      borderRadius: 5,
    },
    discountImage: {
      position: 'absolute',
      top: 10,
      left: 10,
      width: 50,
      height: 50,
      resizeMode: 'contain',
    },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
    marginTop: 270,
  },
  scrollView: {
    flexDirection: 'row',
    marginTop: 20,
  },
  thumbnail: {
    width: 150,
    height: 150,
    marginRight: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  sizesbox: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Позволяет располагать элементы в несколько рядов
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  sizeitem: {
    backgroundColor: '#f0f0f0', // Дефолтный цвет кнопки
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#777',
    alignItems: 'center',
    width: 80, // Устанавливаем фиксированную ширину для кнопок
  },
  selectedSizeItem: {
    backgroundColor: '#FFC700', // Цвет кнопки при выборе
  },
  buttons: {
    flex: 1,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    },
    buttonFavorive: {
        backgroundColor: '#FFC700',
        padding: 12,
        borderRadius: 25,
        marginTop: 20,
        width: '70%',
      alignItems: 'center',
      flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonCart: {
        backgroundColor: '#4748FF',
        padding: 12,
        borderRadius: 25,
        marginTop: 30,
        width: '70%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
    },
    buttonTextHome: {
        color: '#fff',
        fontSize: 16,
    },
    buttonShadow: {
        shadowColor: '#000',
        shadowOffset: {
        width: 3,
        height: 3,
        },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5,
  },
  discountbox: {
    marginVertical: 20,
    marginHorizontal: 10
  }
});
