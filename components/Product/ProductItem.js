import React from 'react';
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import globalStyles from '../../screens/Other/styles';
import { useNavigation } from '@react-navigation/native';
import Product from './Product'


const data = [
    {
      id: '1',
      name: 'Кроссовки NIKE COURT VISION LOW NN',
      discount: '20%',
      cathegory: 'для жінок',
      price: '4 479 грн',
      image: '../../assets/images/ProductImage.png',
    },
    {
      id: '2',
        name: 'Спортивный костюм ISSA PLUS 13485',
        cathegory: 'для жінок',
        price: '799 грн',
        image: '../../assets/images/ProductImage1.png',
        discount: null,
    },
    {
        id: '3',
        name: 'Кроссовки NIKE COURT VISION LOW NN',
        cathegory: 'для жінок',
        price: '4 479 грн',
        image: '../../assets/images/ProductImage.png',
        discount: null,
      },
      {
        id: '4',
        name: 'Спортивный костюм ISSA PLUS 13485',
        cathegory: 'для жінок',
        price: '799 грн',
        image: '../../assets/images/ProductImage1.png',
        discount: null,
    },
    {
        id: '5',
        name: 'Кроссовки NIKE COURT VISION LOW NN',
        cathegory: 'для жінок',
        price: '4 479 грн',
        image: '../../assets/images/ProductImage.png',
        discount: null,
      },
      {
        id: '6',
          name: 'Спортивный костюм ISSA PLUS 13485',
          cathegory: 'для жінок',
        price: '799 грн',
        image: '../../assets/images/ProductImage1.png',
    },
    {
        id: '7',
        name: 'Кроссовки NIKE COURT VISION LOW NN',
        cathegory: 'для жінок',
        price: '4 479 грн',
        image: '../../assets/images/ProductImage.png',
      },
      {
        id: '8',
          name: 'Спортивный костюм ISSA PLUS 13485',
          cathegory: 'для жінок',
        price: '799 грн',
        image: '../../assets/images/ProductImage1.png',
    },
    {
        id: '9',
        name: 'Кроссовки NIKE COURT VISION LOW NN',
        cathegory: 'для жінок',
        price: '4 479 грн',
        image: '../../assets/images/ProductImage.png',
      },
      {
        id: '10',
          name: 'Спортивный костюм ISSA PLUS 13485',
          cathegory: 'для жінок',
        price: '799 грн',
        image: '../../assets/images/ProductImage1.png',
      },
  ];

const ProductItem = () => {
  // const navigation = useNavigation();

  // const renderItem = ({ item }) => (
  //     <TouchableOpacity style={styles.itemContainer}>
  //       <Image source={{ uri: item.image }} style={styles.itemImage} />
  //       <Text style={[globalStyles.defaultText, styles.itemName]}>{item.name}</Text>
  //       <Text style={[globalStyles.defaultText, styles.itemPrice]}>{item.price}</Text>
  //     </TouchableOpacity>
  //   );
    
  return (
    <Product type={true} data={this.data} page={'catalog'}/>
        // <SafeAreaView style={styles.container}>
        //   <FlatList
        //     data={data}
        //     renderItem={renderItem}
        //     keyExtractor={item => item.id}
        //     numColumns={2}
        //     contentContainerStyle={styles.list}
        //   />
        // </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    list: {
      padding: 10,
    },
    itemContainer: {
      flex: 1,
      margin: 5,
      padding: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      backgroundColor: '#f9f9f9',
    },
    itemImage: {
      width: '100%',
      height: 100,
      resizeMode: 'contain',
    },
    itemName: {
      fontSize: 14,
      fontWeight: 'bold',
      marginVertical: 5,
    },
    itemPrice: {
      fontSize: 14,
      color: '#888',
    },
  });

export default ProductItem;