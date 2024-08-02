import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, SafeAreaView, Pressable } from 'react-native';
import Header from '../../components/common/header';
import globalStyles from '../../screens/Other/styles';
import { useNavigation } from '@react-navigation/native';

const favorites = [
  {
    id: '1',
    name: 'ZERØGRAND Running Shoes',
    price: '7 200 грн.',
    image: require('../../assets/images/ProductImage.png'), // Replace with your image path
    cathegory: 'для чоловіків',
    discount: '20%',
  },
  {
    id: '2',
    name: 'Футболка Puma Essentials+',
    price: '990 грн.',
    image: require('../../assets/images/ProductImage.png'), // Replace with your image path
    cathegory: 'для чоловіків',
    discount: null,
  },
  {
    id: '3',
    name: 'Спортивний костюм Puma Poly Suit',
    price: '2 890 грн.',
    image: require('../../assets/images/ProductImage1.png'), // Replace with your image path
    cathegory: 'для жінок',
    discount: '20%',
  },
  {
    id: '4',
    name: 'Худі 4F Sweatshirt M694',
    price: '2 099 грн.',
    image: require('../../assets/images/ProductImage1.png'), // Replace with your image path
    cathegory: 'для чоловіків',
    discount: null,
  },
  {
    id: '5',
    name: 'ZERØGRAND Running Shoes',
    price: '7 200 грн.',
    image: require('../../assets/images/ProductImage.png'), // Replace with your image path
    cathegory: 'для чоловіків',
    discount: '20%',
  },
  {
    id: '6',
    name: 'Худі 4F Sweatshirt M694',
    price: '2 099 грн.',
    image: require('../../assets/images/ProductImage1.png'), // Replace with your image path
    cathegory: 'для чоловіків',
    discount: null,
  },
  {
    id: '7',
    name: 'Худі 4F Sweatshirt M694',
    price: '2 099 грн.',
    image: require('../../assets/images/ProductImage1.png'), // Replace with your image path
    cathegory: 'для чоловіків',
    discount: null,
  },
];

export default function FavoritesScreen() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <Pressable style={styles.item} onPress={() => navigation.navigate('ProductPage')}>

      <View style={styles.imagebox}>
        <Image source={item.image} style={styles.image} />
        {item.discount ? <Image source={require('../../assets/images/Discount.png')} style={styles.discountImage}/> : null}
      </View>

      <View style={styles.info}>
        <Text style={[globalStyles.defaultText, styles.name]}>{item.name}</Text>
        <Text style={[globalStyles.defaultText, styles.cathegory]}>{item.cathegory}</Text>
        {!item.discount ?
          <Text style={[globalStyles.defaultText, styles.price]} >{item.price}</Text>
          :
          <Text style={[globalStyles.defaultText, styles.priceDiscount]} >{item.price}</Text>
        }
      </View>
        <View style={styles.favoriteIcon}>
        <Image source={require('../../assets/images/favoriteheart.png')} style={styles.favoriteImage} />
          </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.title}>
        <Text style={[globalStyles.defaultText, styles.titletext]}>Обрані товари</Text>
      </View>
    <FlatList
      data={favorites}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      />
      </SafeAreaView>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },
  titletext: {
    fontSize: 20,
    fontWeight: 700,
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
    fontWeight: 700,
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
    fontWeight: 700,
    color: '#000',
  },
  priceDiscount: {
    fontSize: 14,
    fontWeight: 700,
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
