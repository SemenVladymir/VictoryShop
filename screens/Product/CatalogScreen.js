import React, { useContext, useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, SafeAreaView, Image, Pressable } from 'react-native';
import globalStyles from '../Other/styles';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/common/header';
import { ProductContext } from '../../store/ProductContext';
import Product from '../../components/Product/Product';


// const data = [
//     {
//       id: '1',
//       name: 'Шорти Nike M NK CLUB ALUMNI HBR FT SHORT 166012',
//       discount: '20%',
//       cathegory: 'для чоловіків',
//       price: '4 479 грн',
//       image: 'https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/667a7fa87fc27-68e7b68.jpeg',
//     },
//     {
//       id: '2',
//         name: 'Сумка Nike Elemental Premium 165572',
//         cathegory: 'для жінок',
//         price: '1789 грн',
//         image: 'https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/6638871f8621f-68e7b68.jpeg',
//         discount: null,
//     },
//     {
//         id: '3',
//         name: 'Кроссовки NIKE COURT VISION LOW NN',
//         cathegory: 'для жінок',
//         price: '4 479 грн',
//         image: '../../assets/images/ProductImage.png',
//         discount: null,
//       },
//       {
//         id: '4',
//         name: 'Спортивный костюм ISSA PLUS 13485',
//         cathegory: 'для жінок',
//         price: '799 грн',
//         image: '../../assets/images/ProductImage1.png',
//         discount: null,
//     },
//     {
//         id: '5',
//         name: 'Кроссовки NIKE COURT VISION LOW NN',
//         cathegory: 'для жінок',
//         price: '4 479 грн',
//         image: '../../assets/images/ProductImage.png',
//         discount: null,
//       },
//       {
//         id: '6',
//           name: 'Спортивный костюм ISSA PLUS 13485',
//           cathegory: 'для жінок',
//         price: '799 грн',
//         image: '../../assets/images/ProductImage1.png',
//     },
//     {
//         id: '7',
//         name: 'Кроссовки NIKE COURT VISION LOW NN',
//         cathegory: 'для жінок',
//         price: '4 479 грн',
//         image: '../../assets/images/ProductImage.png',
//       },
//       {
//         id: '8',
//           name: 'Спортивный костюм ISSA PLUS 13485',
//           cathegory: 'для жінок',
//         price: '799 грн',
//         image: '../../assets/images/ProductImage1.png',
//     },
//     {
//         id: '9',
//         name: 'Кроссовки NIKE COURT VISION LOW NN',
//         cathegory: 'для жінок',
//         price: '4 479 грн',
//         image: '../../assets/images/ProductImage.png',
//       },
//       {
//         id: '10',
//           name: 'Спортивный костюм ISSA PLUS 13485',
//           cathegory: 'для жінок',
//         price: '799 грн',
//         image: '../../assets/images/ProductImage1.png',
//       },
//   ];

const ProductItem = ({ route }) => {
  const navigation = useNavigation();
  const { products } = useContext(ProductContext);
  const { searchproducts, filter} = route.params || {};
  const [catalog, setCatalog] = useState(searchproducts);
  
  useEffect(() => {
    if (searchproducts)
      setCatalog(searchproducts);
    else if (filter) {
      const filteredProducts = products.filter(product => {
        if (filter === 'menclothes') {
          return product.genderId == 3 && product.cathegoryId == 2;
        } else if (filter === 'menshoes') {
          return product.genderId == 3 && product.cathegoryId == 3;
        } else if (filter === 'menaccessories') {
          return product.genderId == 3 && product.cathegoryId == 4;
        } else if (filter === 'womenclothes') {
          return product.genderId == 4 && product.cathegoryId == 2;
        } else if (filter === 'womenshoes') {
          return product.genderId == 4 && product.cathegoryId == 3;
        } else if (filter === 'womenaccessories') {
          return product.genderId == 4 && product.cathegoryId == 4;
        } else if (filter === 'kidclothes') {
          return product.genderId == 5 && product.cathegoryId == 2;
        } else if (filter === 'kidshoes') {
          return product.genderId == 5 && product.cathegoryId == 3;
        } else if (filter === 'kidaccessories') {
          return product.genderId == 5 && product.cathegoryId == 4;
        } else{
          return true;
        }
      });
      setCatalog(filteredProducts);
    }
    else
      setCatalog(products);
  }, [searchproducts, filter, products]);

  const ProductItem = React.memo(({ item }) => {
    return (
      <View style={styles.container}>
        <Product item={ item }/>
      </View>
    );
  });
  
    
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.filterbox}>
        <Text style={[globalStyles.defaultText, styles.text]}>{catalog?catalog.length:0} результатів</Text>
        <Pressable style={[styles.button, styles.buttonShadow]} onPress={()=>navigation.navigate('Filter')}>
          <Text style={[globalStyles.defaultText, styles.buttonText]}>Фільтр</Text>
        </Pressable>
      </View>
          <FlatList
            data={catalog}
            renderItem={({ item }) => <ProductItem item={item} />}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.list}
            removeClippedSubviews
        />

        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 10,
    },
  list: {
    padding: 5,
    },
  filterbox: {
    paddingVertical: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    flexDirection: 'row',
    borderBottomColor: '#ddd',
      borderBottomWidth: 1,
    },
  button: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#4748FF',
    borderRadius: 25,
    width: '40%',
    height: 40,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    paddingTop: 6,
    paddingBottom: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
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
  });

export default ProductItem;