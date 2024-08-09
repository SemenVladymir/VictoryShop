import React, { useState } from 'react';
import { View, Text, Image, Pressable, TextInput, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import globalStyles from '../../screens/Other/styles';
import Header from '../../components/common/header';
import { useNavigation } from '@react-navigation/native';

// Используем локаль 'uk-UA' для форматирования цифр с разделение на порядки по-украински
const formatNumber = (number) => { return number.toLocaleString('uk-UA'); };


const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  // const navigation = useNavigation();

  return (
      <View style={styles.cartItem}>
        <Pressable onPress={() => navigation.navigate('ProductPage')}>
          <Image source={item.image} style={styles.image} />
          {item.discount ? <Image source={require('../../assets/images/Discount.png')} style={styles.discountImage}/> : null}
        </Pressable>
      
        <View style={styles.details}>
          <Text style={[globalStyles.boldText, styles.itemName]}>{item.name}</Text>
          <Text style={[globalStyles.defaultText, styles.itemType]}>{item.cathegory}</Text>
          {!item.discount ?
            <Text style={[globalStyles.boldText, styles.itemPrice]} >{formatNumber(item.price)} грн.</Text>
            :
            <Text style={[globalStyles.boldText, styles.itemPriceDiscount]} >{formatNumber(item.price)} грн.</Text>
          }
        </View>
      
        <View style={styles.quantityContainer}>
          <Pressable onPress={() => onRemove(item.id)} style={styles.removeButton}>
            <Image source={require('../../assets/images/trashbox.png')} style={styles.trashImage} />
          </Pressable>

          <Text style={[globalStyles.boldText, styles.quantity]}>{item.quantity} шт.</Text>
          
          <View style={styles.quantityButton}>
            <Pressable onPress={() => onDecrease(item.id)}>
              <Image source={require('../../assets/images/decrease.png')} style={styles.quantityImage} />
            </Pressable>
                    
            <Pressable onPress={() => onIncrease(item.id)}>
            <Image source={require('../../assets/images/increase.png')} style={styles.quantityImage} />
            </Pressable>
          </View>
        
        </View>
      
      </View>
  );
};

export default function CartScreen({ navigation }) {
  // const navigation = useNavigation();

  const [cart, setCart] = useState([
      {
          id: 1,
          name: 'ZERØGRAND Running Shoes',
          price: 7200,
          quantity: 1,
          image: require('../../assets/images/ProductImage.png'),
          cathegory: 'для чоловіків',
          discount: 20,
      },
      {
          id: 2,
          name: 'Футболка Puma Essentials+',
          price: 990,
          quantity: 1,
          image: require('../../assets/images/ProductImage1.png'),
          cathegory: 'для жінок',
          discount: null,
      },
      {
          id: 3,
          name: 'Худі Diadora 502179481',
          price: 5202,
          quantity: 1,
          image: require('../../assets/images/ProductImage1.png'),
          cathegory: 'для жінок',
          discount: null,
      },
      {
          id: 4,
          name: 'Сумка для взуття LiveUP 23x27 см',
          price: 126,
          quantity: 1,
          image: require('../../assets/images/ProductImage.png'),
          cathegory: 'для жінок',
          discount: 20,
    },
    {
      id: 5,
      name: 'Сумка для взуття LiveUP 23x27 см',
      price: 126,
      quantity: 1,
      image: require('../../assets/images/ProductImage.png'),
      cathegory: 'для жінок',
      discount: null,
    },
    {
      id: 6,
      name: 'Сумка для взуття LiveUP 23x27 см',
      price: 126,
      quantity: 1,
      image: require('../../assets/images/ProductImage.png'),
      cathegory: 'для жінок',
      discount: 20,
  },
  ]);
  const [promoCode, setPromoCode] = useState('');
  const [hasPromocode, sethasPromocode] = useState(false);

  const showAlert = (id) => {
    Alert.alert(
      "Видалення з кошика",
      "Ви дійсно хочете видалити цей товар з кошику?",
      [
        { text: "Так", onPress: () => removeItem(id) },
        {
          text: "Нi",
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };

  const increaseQuantity = (id) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decreaseQuantity = (id) => {
    setCart(cart.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    // Handle promo code logic here
  };

  const handleCatalog = () => {
    // Implement the navigation to home screen here
    navigation.navigate('ProductItem');
  };

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
      <SafeAreaView style={styles.container}>
      <Header cartCount={totalQuantity}/>
      {cart.length ? <>
        <View style={styles.title}>
            <Text style={[globalStyles.boldText, styles.titletext]}>Кошик</Text>
        </View>
        <ScrollView style={styles.productscontainer}>
          {cart.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onRemove={showAlert}
            />))}
                </ScrollView>
        <View style={styles.bottomContainer}>
          <View style={styles.totalContainer}>
            <Text style={[globalStyles.boldText, styles.totalText]}>Кількість товарів: {formatNumber(totalQuantity)} шт.</Text>
            <Text style={[globalStyles.boldText, styles.totalText]}>Вартість товарів: {formatNumber(totalAmount)} грн.</Text>
          </View>
          <Pressable style={[styles.buySelectedButton, styles.buttonShadow]} onPress={() => navigation.navigate('Order')}>
            <Text style={[globalStyles.defaultText, styles.buttonText]}>Придбати обране</Text>
          </Pressable>

          <View style={styles.promoContainer}>
            <View style={styles.checkboxContainer}>
              <Pressable onPress={() => sethasPromocode(!hasPromocode)} style={[styles.checkboxBase, hasPromocode && styles.checkboxChecked]}>
                {hasPromocode && <View style={styles.checkboxIcon} />}
              </Pressable>
              <Text style={[globalStyles.defaultText, styles.promotext]} >У вас є промокод?</Text>
            </View>
            {hasPromocode ?
              <View style={styles.promoinputContainer}>
                <TextInput
                  style={[globalStyles.defaultText, styles.promoInput]}
                  value={promoCode}
                  onChangeText={setPromoCode}
                  placeholder="Введіть промокод"
                />
                <Pressable onPress={applyPromoCode} style={styles.applyButton}>
                  <Text style={[globalStyles.defaultText, styles.applyButtonText]}>Застосувати</Text>
                </Pressable>
              </View>
              : null}
          </View>
        </View>
      </> : <>
      <View style={styles.empty}>
        <Text style={[globalStyles.boldText, styles.emptyText1]}>Кошик порожній</Text>
        <Text style={[globalStyles.defaultText, styles.emptyText2]}>У вашому кошику поки нема речей!</Text>
        <Pressable style={styles.buySelectedButton} onPress={handleCatalog}>
          <Text style={[globalStyles.defaultText, styles.buttonText]}>За покупками</Text>
        </Pressable>
      </View>
      </>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  empty: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productscontainer: {
    flex: 1,
    height: '70%',
  },
  titletext: {
  fontSize: 22,
  },
  emptyText1: {
    fontSize: 20,
    marginBottom: 15,
  },
  emptyText2: {
    fontSize: 16,
    marginBottom: 20,
  },
  cartItem: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 30,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
  },
  discountImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    position: 'relative',
    marginTop: -95,
    marginLeft: 5,
    marginBottom: 70,
  },
  details: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemName: {
    fontSize: 14,
  },
  itemPrice: {
    fontSize: 14,
    marginBottom: 2,
  },
  itemPriceDiscount: {
    fontSize: 14,
    color: '#007BFF',
    marginBottom: 2,
  },
  itemType: {
    color: 'gray',
  },
  quantityContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  quantityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginHorizontal: 8,
  },
  quantityImage: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
  },
  quantity: {
    fontSize: 14,
    backgroundColor: '#4748FF',
    borderRadius: 11,
    width: 55,
    height: 22,
    textAlign: 'center',
    color: '#fff',
  },
  removeButton: {
    padding: 8,
  },
  removeButtonText: {
    fontSize: 24,
    color: 'red',
  },
  bottomContainer: {
    flexShrink: 1,
    justifyContent: 'flex-end',
    marginHorizontal: 30,
  },
  promoContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  promoinputContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  promotext: {
    marginBottom: 10,
    marginLeft: 10,
  },
  promoInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#000',
    paddingLeft: 5,
    paddingBottom: 5,
    marginRight: 25,
    alignItems: 'center',
  },
  applyButton: {
    backgroundColor: '#FFC700',
    borderRadius: 15,
    marginRight: 10,
    width: '35%',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  applyButtonText: {
    alignSelf: 'center',
    textAlign: 'center',
  },
  totalContainer: {
    marginVertical: 5,
  },
  totalText: {
    fontSize: 18,
  },
  actionButtons: {
    justifyContent: 'space-between',
  },
  buySelectedButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#4748FF',
    borderRadius: 25,
    marginVertical: 10,
    width: '50%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    paddingTop: 8,
    // padding: 8,
    paddingBottom: 12,
    },
  trashImage: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
  checkboxContainer: {
    flexDirection: 'row',
  },
  checkboxBase: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4748FF',
    borderColor: '#4748FF',
  },
  checkboxIcon: {
    width: 5,
    height: 5,
    backgroundColor: '#fff',
  },
  label: {
    margin: 8,
  },
});
