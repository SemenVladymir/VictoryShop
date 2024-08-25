// pages/HomePage.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, Pressable, SafeAreaView, ScrollView } from 'react-native';
import Header from '../../components/common/header';
import globalStyles from '../Other/styles';
import { useNavigation } from '@react-navigation/native';
import Product from '../../components/Product/Product';
import { ProductContext } from '../../store/ProductContext';

const Main = () => {
  const navigation = useNavigation();
  const { products, discounts } = useContext(ProductContext);
  function filterProductsByCategory(cathegoryId) {
    return products.filter(product => {
      const discount = discounts.find(d => d.id === product.discountId);
      return discount && discount.percent > 0 && product.cathegoryId === cathegoryId;
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.body}>
          <Image source={require('../../assets/images/img2.png')} style={styles.image} />
          <Text style={[globalStyles.boldText, styles.bodyText1]}>{`Твоя перемога ближче,\n ніж здається!`}</Text>
          <Text style={[globalStyles.defaultText, styles.bodyText2]}>{`Знижка до 70%\n на весь асортимент спортивних товарів!`}</Text>
          
          <Pressable style={styles.button} onPress={() => navigation.navigate('Catalog')}>
            <Text style={[globalStyles.defaultText, styles.buttonText]}>До каталогу</Text>
          </Pressable>
        </View>
        
        <View style={styles.promotionsSection}>
          <Text style={[globalStyles.boldText, styles.promotionsTitle]}>Акційні товари</Text>
          <Text style={[globalStyles.boldText, styles.promotionsTitleOther]}>Одяг</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScrollView}>
            {filterProductsByCategory(2).map((item, index) => (
              <Pressable key={index} onPress={() => navigation.navigate('ProductPage', {product: item })}>
                <Product item={item} />
              </Pressable>
            ))}
          </ScrollView>

          <Text style={[globalStyles.boldText, styles.promotionsTitleOther]}>Взуття</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScrollView}>
            {filterProductsByCategory(3).map((item, index) => (
              <Pressable key={index} onPress={() => navigation.navigate('ProductPage', {product: item })}>
                <Product item={item} />
              </Pressable>
            ))}
          </ScrollView>

          <Text style={[globalStyles.boldText, styles.promotionsTitleOther]}>Аксесуари</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScrollView}>
            {filterProductsByCategory(4).map((item, index) => (
              <Pressable key={index} onPress={() => navigation.navigate('ProductPage', {product: item })}>
                <Product item={item} />
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: 410,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  body: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 30,
  },
  bodyText1: {
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 10,
  },
  bodyText2: {
    marginVertical: 10,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 14,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4748FF',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  promotionsSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  promotionsTitle: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  promotionsTitleOther: {
    fontSize: 18,
    marginBottom: 10,
  },
  horizontalScrollView: {
    flexDirection: 'row',
  },
});

export default Main;