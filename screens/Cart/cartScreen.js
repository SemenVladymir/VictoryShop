import React, { useState } from 'react';
import { View, Text, Image, Pressable, TextInput, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import globalStyles from '../../screens/Other/styles';
import Header from '../../components/common/header';
import { useNavigation } from '@react-navigation/native';

const CartItem = ({ item, onIncrease, onDecrease }) => {
    const navigation = useNavigation();
  return (
      <View style={styles.cartItem}>
        <Pressable onPress={() => navigation.navigate('ProductPage')}>
            <Image source={item.image} style={styles.image} />
        </Pressable>
      <View style={styles.details}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price} грн.</Text>
        <Text style={styles.itemType}>{item.cathegory}</Text>
              <View style={styles.quantityContainer}>
                  
          <Pressable onPress={() => onDecrease(item.id)}>
            <Text style={styles.quantityButton}>-</Text>
          </Pressable>
                  
          <Text style={styles.quantity}>{item.quantity}</Text>
          <Pressable onPress={() => onIncrease(item.id)}>
            <Text style={styles.quantityButton}>+</Text>
          </Pressable>
        </View>
      </View>
      <Pressable onPress={() => onRemove(item.id)} style={styles.removeButton}>
        <Image source={require('../../assets/images/trashbox.png')} style={styles.trashImage} />
      </Pressable>
    </View>
  );
};

export default function CartScreen() {
    

  const [cart, setCart] = useState([
      {
          id: 1,
          name: 'ZERØGRAND Running Shoes',
          price: 7200,
          quantity: 1,
          image: require('../../assets/images/ProductImage.png'),
          cathegory: 'для чоловіків',
          discount: '20%',
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
          discount: null,
      },
  ]);
  const [promoCode, setPromoCode] = useState('');

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

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.title}>
            <Text style={[globalStyles.defaultText, styles.titletext]}>Кошик</Text>
        </View>
        <ScrollView>
            {cart.map(item => (
                <CartItem
                key={item.id}
                item={item}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onRemove={removeItem}
            /> ))}
        </ScrollView>
        <View style={styles.promoContainer}>
        <Text>У вас є промокод?</Text>
        <TextInput
          style={styles.promoInput}
          value={promoCode}
          onChangeText={setPromoCode}
          placeholder="Введіть промокод"
        />
        <Pressable onPress={applyPromoCode} style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Застосувати</Text>
        </Pressable>
      </View>
      <View style={styles.totalContainer}>
        <Text>Вартість товарів: {totalAmount} грн.</Text>
        <Text>Всього: {totalAmount} грн.</Text>
      </View>
      <View style={styles.actionButtons}>
        <Pressable style={styles.buySelectedButton}>
          <Text style={styles.buttonText}>Придбати обране</Text>
        </Pressable>
        <Pressable style={styles.buyAllButton}>
          <Text style={styles.buttonText}>Обрати все</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    },
    title: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 40,
      },
      titletext: {
        fontSize: 20,
        fontWeight: 700,
      },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
  },
  details: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    color: 'blue',
  },
  itemType: {
    color: 'gray',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 24,
    padding: 8,
    backgroundColor: '#ddd',
    marginHorizontal: 8,
  },
  quantity: {
    fontSize: 18,
  },
  removeButton: {
    padding: 8,
  },
  removeButtonText: {
    fontSize: 24,
    color: 'red',
  },
  promoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  promoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginRight: 8,
  },
  applyButton: {
    backgroundColor: 'yellow',
    padding: 8,
  },
  applyButtonText: {
    color: 'blue',
  },
  totalContainer: {
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buySelectedButton: {
    backgroundColor: 'blue',
    padding: 16,
    flex: 1,
    marginRight: 8,
  },
  buyAllButton: {
    backgroundColor: 'yellow',
    padding: 16,
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    },
    trashImage: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        //width: '20%',
      },
});
