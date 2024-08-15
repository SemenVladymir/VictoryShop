import React, { useContext, useRef, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Image, SafeAreaView, Pressable, Alert, Animated } from 'react-native';
import Header from '../../components/common/header';
import globalStyles from '../Other/styles';
import { useNavigation } from '@react-navigation/native';
import BackHandlerWrapper from '../../components/common/BackHandlerWrapper';
import { getData, removeDataItemById } from '../../services/AsyncStorageUtil';
import { ProductContext } from '../../store/ProductContext';
import { useFocusEffect } from '@react-navigation/native';
import { PanGestureHandler } from 'react-native-gesture-handler';

const FavoriteItem = ({ item, navigation, confirmDelete }) => {
  const translateX = useRef(new Animated.Value(0)).current;

  const onGestureEvent = Animated.event(
  [{ nativeEvent: { translationX: translateX } }],
  { useNativeDriver: true }
);

const onHandlerStateChange = (event) => {
  if (event.nativeEvent.state === 5 && Math.abs(event.nativeEvent.translationX) > Math.abs(event.nativeEvent.translationY)) {
    const { translationX } = event.nativeEvent;

    if (Math.abs(translationX) > 50) {
      // Показываем Alert для подтверждения удаления
      Alert.alert(
        'Видалення з обраних товарів',
        `Ви дійсно хочете видалити з обраних "${item.name}"?`,
        [
          {
            text: 'Відміна',
            style: 'cancel',
            onPress: () => {
              // Возвращаем элемент на место, если выбрано "Cancel"
              Animated.spring(translateX, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          },
          {
            text: 'Видалити',
            onPress: () => {
              // Удаляем элемент, если выбрано "Удалить"
              Animated.timing(translateX, {
                toValue: translationX > 0 ? 500 : -500,
                duration: 200,
                useNativeDriver: true,
              }).start(() => confirmDelete(item));
            },
            style: 'destructive',
          },
        ]
      );
    } else {
      // Если свайп был недостаточным, возвращаем элемент на место
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }
};


  return (
    <PanGestureHandler
      failOffsetY={[-5, 5]}
      activeOffsetX={[-5, 5]}
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
      shouldCancelWhenOutside={false}
    >
      <Animated.View style={{ transform: [{ translateX }] }}>
        <Pressable style={styles.itembody} onPress={() => navigation.navigate('ProductPage', { product: item })}>
          <View style={styles.imagebox}>
            <Image source={{ uri: item.photos[0].url }} style={styles.image} />
            {item.discount && <Image source={require('../../assets/images/Discount.png')} style={styles.discountImage} />}
          </View>
          <View style={styles.info}>
            <Text style={[globalStyles.boldText, styles.name]}>{item.name}</Text>
            <Text style={[globalStyles.defaultText, styles.cathegory]}>{item.cathegory}</Text>
            <Text style={[globalStyles.boldText, item.discount ? styles.priceDiscount : styles.price]}>
              {item.price} грн.
            </Text>
          </View>
          <View style={styles.favoriteIcon}>
            <Image source={require('../../assets/images/favoriteheart.png')} style={styles.favoriteImage} />
          </View>
        </Pressable>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default function FavoritesScreen({ navigation }) {
  const { products } = useContext(ProductContext);
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getData('Favorites').then(favorites => {
        if (favorites) {
          const tmp = products.filter(product => favorites.includes(product.id));
          setFavorites(tmp);
        } else {
          setFavorites(null);
        }
      }).catch(error => {
        console.error('Error loading favorites: ', error);
      });
    }, [products])
  );

  const confirmDelete = (item) => {
    setFavorites((prevFavorites) => prevFavorites.filter((favorite) => favorite.id !== item.id));
    removeDataItemById('Favorites', item.id);
  };

  return (
    <BackHandlerWrapper navigation={navigation}>
      <SafeAreaView style={styles.container}>
        <Header />
        {favorites ? (
          <>
            <View style={styles.title}>
              <Text style={[globalStyles.boldText, styles.titletext]}>Обрані товари</Text>
            </View>
            <FlatList
              data={favorites}
              renderItem={({ item }) => (
                <FavoriteItem item={item} navigation={navigation} confirmDelete={confirmDelete} />
              )}
              keyExtractor={(item) => item.id}
              scrollEnabled={true}
            />
          </>
        ) : (
          <View style={styles.empty}>
            <Text style={[globalStyles.boldText, styles.emptyText1]}>Обрані</Text>
            <Text style={[globalStyles.defaultText, styles.emptyText2]}>У вас немає обраних речей!</Text>
          </View>
        )}
      </SafeAreaView>
    </BackHandlerWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imagebox: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 15,
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
  emptyText1: {
    fontSize: 20,
    marginBottom: 15,
  },
  emptyText2: {
    fontSize: 16,
    marginBottom: 20,
  },
  titletext: {
    fontSize: 22,
  },
  itembody: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
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
    width: '50%',
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
  },
});
