import React, { useState, useContext, useCallback } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, SafeAreaView, Pressable, Image } from 'react-native';
import globalStyles from '../Other/styles';
import Header from '../../components/common/header';
import Checkbox from '../../components/common/CustomCheckbox';
import { useFocusEffect } from '@react-navigation/native';
import { OrderContext } from '../../store/OrderContext';
import { AuthContext } from '../../store/AuthContext';
import { useRoute } from '@react-navigation/native';

// Используем локаль 'uk-UA' для форматирования цифр с разделение на порядки по-украински
const formatNumber = (number) => { return number.toLocaleString('uk-UA'); };

export default function OrderScreen({ navigation}) {
  const { setActualOrders, getActualOrders, changeOrder, createDelivery, createPayment } = useContext(OrderContext);
  const { firstname, lastname, phonenumber, email  } = useContext(AuthContext);
  // const navigation = useNavigation();
  const route = useRoute();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [useremail, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryHome, setDeliveryHome] = useState(true);
  const [paymentOnDelivery, setPaymentOnDelivery] = useState(true);
  const [postDelivery, setPostDelivery] = useState(true);
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [organization, setOrganization] = useState('');
  const [visa, setVisa] = useState(true);
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [billingAddress, setBillingAddress] = useState('');

  const [checkOrder, setCheckOrder] = useState(false);
  const { orderProducts } =  route.params || {};
  // const [orderProducts, setOrderProduct] = useState([
  //   {
  //       id: 1,
  //       name: 'ZERØGRAND Running Shoes',
  //       price: 7200,
  //       quantity: 1,
  //       image: require('../../assets/images/ProductImage.png'),
  //       cathegory: 'для чоловіків',
  //       discount: 20,
  //   },
  //   {
  //       id: 2,
  //       name: 'Футболка Puma Essentials+',
  //       price: 990,
  //       quantity: 1,
  //       image: require('../../assets/images/ProductImage1.png'),
  //       cathegory: 'для жінок',
  //       discount: null,
  //   },
  //   {
  //       id: 3,
  //       name: 'Худі Diadora 502179481',
  //       price: 5202,
  //       quantity: 1,
  //       image: require('../../assets/images/ProductImage1.png'),
  //       cathegory: 'для жінок',
  //       discount: null,
  //   },
  // //   {
  // //       id: 4,
  // //       name: 'Сумка для взуття LiveUP 23x27 см',
  // //       price: 126,
  // //       quantity: 1,
  // //       image: require('../../assets/images/ProductImage.png'),
  // //       cathegory: 'для жінок',
  // //       discount: 20,
  // // },
  // // {
  // //   id: 5,
  // //   name: 'Сумка для взуття LiveUP 23x27 см',
  // //   price: 126,
  // //   quantity: 1,
  // //   image: require('../../assets/images/ProductImage.png'),
  // //   cathegory: 'для жінок',
  // //   discount: null,
  // // },
  // // {
  // //   id: 6,
  // //   name: 'Сумка для взуття LiveUP 23x27 см',
  // //   price: 126,
  // //   quantity: 1,
  // //   image: require('../../assets/images/ProductImage.png'),
  // //   cathegory: 'для жінок',
  // //   discount: 20,
  // // },
  // ]);

  // useEffect(() => {
  //   getActualOrders().then(orders => {
  //   if (Array.isArray(orders) && orders.length > 0) {
  //     // console.table('Count actual orders in cart - ' + orders.length);
  //     const tmp = orders.filter(item => item.statusId == 2);
  //     if (tmp && products) {
  //       const productIds = tmp.map(item => item.productId);
  //       const filteredProducts = products.filter(product => productIds.includes(product.id));
  //       setCart(filteredProducts);
  //       // console.table('filtered products - ', filteredProducts);
  //     }
  //   } else {
  //     setCart(null);
  //   }
  // })
  // .catch(error => {
  //   console.error('Error loading orders:', error);
  // });
  // }, [actualOrders]);
  
  
  
  
  // const totalAmount = orderProducts.reduce((total, item) => total + item.price * item.quantity, 0);
 
 
  const totalAmount = () => {
    if (orderProducts) 
      return orderProducts.reduce((total, product) => { return total + product.price * product.quantity; }, 0);
    return 0;
  };

  useFocusEffect(
    useCallback(() => {
      if (orderProducts)
        setCheckOrder(false);
    }, [])
  );


  const handleCheckOrder = () => {
    getActualOrders().then(orders => {
      console.log('All actual Orders from orderscreen ' + orders);
      if (orders) {
        for (const item of orderProducts) {
          var order = orders.find(e => e.productId == item.id);
          changeOrder(order, 3, 1);
          createDelivery(order.id, 2, `${country}, ${address}, ${postalCode}`, organization);
          createPayment(order.id, item.price, 2, item.quantity);
        }
        setCheckOrder(true);
        getActualOrders().then(orders => {
          if (orders)
            setActualOrders(orders);
          else
            setActualOrders(null);
        })
        .catch(error => {
          console.error('Error loading orders:', error);
          navigation.navigate('Error');
        });
      }
    })
    .catch(error => {
      console.error('Error loading orders:', error);
      navigation.navigate('Error');
    });
  }; 

  const RenderItem = ({ item }) => {
    return (
      <Pressable style={styles.item} onPress={() => navigation.navigate('ProductPage', { product: item })}>

        <View style={styles.imagebox}>
          <Image source={{ uri: item.photos[0].url }} style={styles.image} />
          {item.discountId > 1 ? <Image source={require('../../assets/images/Discount.png')} style={styles.discountImage} /> : null}
        </View>

        <View style={styles.info}>
          <Text style={[globalStyles.boldText, styles.name]}>{item.name}</Text>
          <Text style={[globalStyles.defaultText, styles.cathegory]}>{item.cathegory}</Text>
          {item.discountId > 1 ?
            <Text style={[globalStyles.boldText, styles.priceDiscount]} >{formatNumber(item.price)} грн.</Text>
            :
            <Text style={[globalStyles.boldText, styles.price]} >{formatNumber(item.price)} грн.</Text>
          }
        </View>
      </Pressable>
    )
  };


  return (
    <SafeAreaView style={styles.container}>
      <Header />
      {!checkOrder? <>
        <View style={styles.title}>
            <Text style={[globalStyles.boldText, styles.titletext]}>Оформлення замовлення</Text>
        </View>
    <ScrollView style={styles.scrollcontainer}>

      <Text style={[globalStyles.boldText, styles.label]}>Ваші данні</Text>
          {firstname ? <TextInput style={[globalStyles.defaultText, styles.input]} placeholder="Ім'я" value={firstname} onChangeText={setFirstName} /> :
            <TextInput style={[globalStyles.defaultText, styles.input]} placeholder="Ім'я" value={firstName} onChangeText={setFirstName} />}
          {lastname ? <TextInput style={[globalStyles.defaultText, styles.input]} placeholder="Прізвище" value={lastname} onChangeText={setLastName} /> :
            <TextInput style={[globalStyles.defaultText, styles.input]} placeholder="Прізвище" value={lastName} onChangeText={setLastName} />}
          {email ? <TextInput style={[globalStyles.defaultText, styles.input]} placeholder="E-mail" value={email} onChangeText={setEmail} /> :
            <TextInput style={[globalStyles.defaultText, styles.input]} placeholder="E-mail" value={useremail} onChangeText={setEmail} />}
          {phonenumber ? <TextInput style={[globalStyles.defaultText, styles.input]} placeholder="Номер телефону" value={phonenumber} onChangeText={setPhone} keyboardType="phone-pad" /> :
            <TextInput style={[globalStyles.defaultText, styles.input]} placeholder="Номер телефону" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />}
      
          <Text style={[globalStyles.boldText, styles.label]}>Обрані товари</Text>
          <View style={styles.listcontainer}>
          {orderProducts.map(item => (
              <RenderItem
                key={item.id}
                item={item}
              />))}
          </View>

          <Text style={[globalStyles.boldText, styles.label, {fontSize: 20, marginTop: -10}]}>Вартість товарів: {formatNumber(totalAmount())} грн.</Text>

          <Text style={[globalStyles.boldText, styles.label]}>Варіанти доставки</Text>
        
        <View style={styles.checkboxContainer}>
            <View style={styles.leftStyle}>
              <Checkbox value={deliveryHome} onValueChange={() => setDeliveryHome(!deliveryHome)}/>
            <Text style={[globalStyles.defaultText, styles.checkboxLabel]}>Доставка на дім</Text>
          </View>
          <Image source={require('../../assets/images/homeIcon.png')} style={styles.iconImage} />
        </View>
        
        <View style={styles.checkboxContainer}>
            <View style={styles.leftStyle}>
            <Checkbox value={!deliveryHome} onValueChange={() => setDeliveryHome(!deliveryHome)}/>
              <Text style={[globalStyles.defaultText, styles.checkboxLabel]}>Доставка у відділення</Text>
          </View>
          <Image source={require('../../assets/images/postIcon.png')} style={styles.iconImage} />
        </View>
        
        {!deliveryHome ? <>
          <View style={styles.checkboxContainerWithoutBorder}>
            <Checkbox value={postDelivery} onValueChange={() => setPostDelivery(!postDelivery)}/>
            <Image source={require('../../assets/images/logo_novayaposhta.png')} style={styles.logoImage} />
            <Text style={[globalStyles.defaultText, styles.checkboxLabel]}>Нова пошта</Text>
          </View>

            <View style={styles.checkboxContainerWithoutBorder}>
            <Checkbox value={!postDelivery} onValueChange={() => setPostDelivery(!postDelivery)}/>
            <Image source={require('../../assets/images/logo_ukrposhta.png')} style={styles.logoImage} />
            <Text style={[globalStyles.defaultText, styles.checkboxLabel]}>Укрпошта</Text>
          </View>
        </> : null}
        
        <Text style={[globalStyles.boldText, styles.label]}>Пункт доставки</Text>

        {!postDelivery || deliveryHome? <>
        <TextInput style={[globalStyles.defaultText, styles.input]} placeholder="Країна" value={country} onChangeText={setCountry} />
        <TextInput style={[globalStyles.defaultText, styles.input]} placeholder="Місто та адреса" value={address} onChangeText={setAddress} />
        <TextInput style={[globalStyles.defaultText, styles.input]} placeholder="Поштовий Індекс" value={postalCode} onChangeText={setPostalCode} keyboardType="numeric" />
        <TextInput style={[globalStyles.defaultText, styles.input]} placeholder="Додатково" value={organization} onChangeText={setOrganization} />
          
        </> : <>
            
        <TextInput style={[globalStyles.defaultText, styles.input]} placeholder="Країна" value={country} onChangeText={setCountry} />
        <TextInput style={[globalStyles.defaultText, styles.input]} placeholder="Місто" value={address} onChangeText={setAddress} />
        <TextInput style={[globalStyles.defaultText, styles.input]} placeholder="Номер відділення нової пошти" value={postalCode} onChangeText={setPostalCode} keyboardType="numeric" />
        <TextInput style={[globalStyles.defaultText, styles.input]} placeholder="Додатково" value={organization} onChangeText={setOrganization} />  
        
        </>}
          
          <View style={styles.checkboxContainerWithoutBorder}>
          <Checkbox value={paymentOnDelivery} onValueChange={() => setPaymentOnDelivery(!paymentOnDelivery)}/>
        <Text style={[globalStyles.defaultText, styles.checkboxLabel]}>Оплата при отриманні</Text>
      </View>

      {!paymentOnDelivery ? <>
        <Text style={[globalStyles.boldText, styles.label]}>Спосіб оплати</Text>
          
        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center' }}>
            
          <View style={[styles.checkboxCardContainer]}>
            <View style={{ width: 20 }}></View>
              <Checkbox value={visa} onValueChange={() => setVisa(!visa)}/>
            <Image source={require('../../assets/images/visaLogo.png')} style={styles.cardlogoImage1} />
          </View>
            <View style={{width: 40}}></View>
              <View style={[styles.checkboxCardContainer]}>
              <Checkbox value={!visa} onValueChange={() => setVisa(!visa)}/>
            <Image source={require('../../assets/images/mastercardLogo.png')} style={styles.cardlogoImage2} />
          </View>
            
      </View>

      <TextInput style={[globalStyles.defaultText, styles.input]} placeholder="Номер картки" value={cardNumber} onChangeText={setCardNumber} keyboardType="numeric" />
      <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around'}}>
        <TextInput style={[globalStyles.defaultText, styles.input]} placeholder="CVV2" value={cvv} onChangeText={setCvv} keyboardType="numeric" />
        <View style={{width: 10}}></View>
        <TextInput style={[globalStyles.defaultText, styles.input]} placeholder="Термін дії картки" value={expiryDate} onChangeText={setExpiryDate}/>
      </View>
      <TextInput style={[globalStyles.defaultText, styles.input]} placeholder="Розрахункова адреса" value={billingAddress} onChangeText={setBillingAddress} />
      </>: null}
      <Pressable style={[styles.buySelectedButton, styles.buttonShadow]} onPress={handleCheckOrder}>
        <Text style={[globalStyles.defaultText, styles.buttonText]}>Замовити</Text>
      </Pressable>
        </ScrollView>
      </> : <>
      <View style={styles.empty}>
        <Text style={[globalStyles.boldText, styles.emptyText1]}>Дякуємо за замовлення!</Text>
        <Text style={[globalStyles.defaultText, styles.emptyText2]}>Очикуйте повідомлення</Text>
        <Text style={[globalStyles.defaultText, styles.emptyText2]}>про відправлення</Text>
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
  listcontainer: {
    marginBottom: 10,
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  titletext: {
    fontSize: 22,
  },
  scrollcontainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginHorizontal: 30,
  },
  imagebox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  item: {
    flexDirection: 'row',
    padding: 5,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 15,
    width: '100%',
    marginBottom: 5,
    backgroundColor: '#F5F5F5',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
   
  },
  discountImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    position: 'relative',
    marginTop: -75,
    marginLeft: -60,
    marginBottom: 55,
  },
  info: {
    justifyContent: 'center',
    width: '60%',
  },
  name: {
    fontSize: 16,
    textAlign: 'left',
    flexWrap: 'wrap',
  },
  cathegory: {
    fontSize: 14,
    fontWeight: 400,
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: '#000',
  },
  priceDiscount: {
    fontSize: 16,
    color: '#007BFF',
  },
  favoriteImage: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    //width: '20%',
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#F5F5F5',
    color: '#000',
    fontSize: 16,
  },
  product: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  checkboxContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#F5F5F5',
  },
  checkboxCardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: 10,
  },
  leftStyle: {
    flex: 1,
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'flex-start',
  },
  checkboxContainerWithoutBorder: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,  
    padding: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
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
  buySelectedButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#4748FF',
    borderRadius: 25,
    marginVertical: 10,
    width: '60%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    paddingTop: 8,
    // padding: 8,
    paddingBottom: 12,
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
  logoImage: {
    width: 15,
    height: 15,
    marginLeft: 10,
    // marginRight: 5,
    resizeMode: 'contain',
  },
  iconImage: {
    width: 30,
    height: 30,
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  cardlogoImage1: {
    width: 63,
    height: 55,
    resizeMode: 'contain',
    marginLeft: 15,
    // paddingVertical: 10,
  },
  cardlogoImage2: {
    width: 70,
    height: 60,
    resizeMode: 'contain',
    marginLeft: 15,
    // paddingVertical: 10,
  },
  empty: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText1: {
    fontSize: 20,
    marginBottom: 5,
  },
  emptyText2: {
    fontSize: 16,
    marginBottom: 5,
  },
});
