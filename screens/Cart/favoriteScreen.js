import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, SafeAreaView, Pressable } from 'react-native';
import Header from '../../components/common/header';
import globalStyles from '../Other/styles';
import { useNavigation } from '@react-navigation/native';
import BackHandlerWrapper from '../../components/common/BackHandlerWrapper';
import { getData, removeDataItemById } from '../../services/AsyncStorageUtil';
import { ProductContext } from '../../store/ProductContext';

// const favorites = [
//   {
//     id: '1',
//     name: 'ZERØGRAND Running Shoes',
//     price: '7 200',
//     // image: require('../../assets/images/ProductImage.png'), // Replace with your image path
//     image: 'https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/66323e8e452b0-6389105.jpeg',
//     cathegory: 'для чоловіків',
//     discount: 20,
//   },
//   {
//     id: '2',
//     name: 'Футболка Puma Essentials+',
//     price: '990',
//     // image: require('../../assets/images/ProductImage.png'), // Replace with your image path
//     image: 'https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/6666ef8bb59d6-68e7b68.jpeg',
//     cathegory: 'для чоловіків',
//     discount: null,
//   },
// ];



export default function FavoritesScreen({ navigation }) {
  const { products } = useContext(ProductContext);
  const [favorites, setFavorites] = useState([]);


  useEffect(() => {
    const favoritesId = getData('Favorites');
    if (favoritesId.length > 0) {
      setFavorites(products.filter(product => favoritesId.includes(product.id)));
    }
  }, []);

  const renderItem = ({ item }) => (
    <Pressable style={styles.item} onPress={() => navigation.navigate('ProductPage')}>

      <View style={styles.imagebox}>
        <Image source={{ uri: item.image }} style={styles.image} />
        {item.discount ? <Image source={require('../../assets/images/Discount.png')} style={styles.discountImage}/> : null}
      </View>

      <View style={styles.info}>
        <Text style={[globalStyles.boldText, styles.name]}>{item.name}</Text>
        <Text style={[globalStyles.defaultText, styles.cathegory]}>{item.cathegory}</Text>
        {!item.discount ?
          <Text style={[globalStyles.boldText, styles.price]} >{item.price} грн.</Text>
          :
          <Text style={[globalStyles.boldText, styles.priceDiscount]} >{item.price} грн.</Text>
        }
      </View>
        <View style={styles.favoriteIcon}>
        <Image source={require('../../assets/images/favoriteheart.png')} style={styles.favoriteImage} />
          </View>
    </Pressable>
  );

  return (
    <BackHandlerWrapper navigation={navigation}>
    <SafeAreaView style={styles.container}>
      <Header />
      {favorites.length? <>
      <View style={styles.title}>
        <Text style={[globalStyles.boldText, styles.titletext]}>Обрані товари</Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        </View>

      </> : <>
          
      <View style={styles.empty}>
        <Text style={[globalStyles.boldText, styles.emptyText1]}>Обрані</Text>
        <Text style={[globalStyles.defaultText, styles.emptyText2]}>У вас немає обраних речей!</Text>
        {/* <Pressable style={styles.buySelectedButton} onPress={handleCatalog}>
          <Text style={[globalStyles.defaultText, styles.buttonText]}>За покупками</Text>
        </Pressable> */}
      </View>
      </>}
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
  item: {
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
    //width: '20%',
  },
});
