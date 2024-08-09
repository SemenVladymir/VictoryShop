import React, { useContext } from 'react';
import { View, FlatList, Image, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import globalStyles from '../../screens/Other/styles';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/common/header';
import { ProductContext } from '../../store/ProductContext';


const data = [
    {
      id: '1',
      name: 'Шорти Nike M NK CLUB ALUMNI HBR FT SHORT 166012',
      discount: '20%',
      cathegory: 'для чоловіків',
      price: '4 479 грн',
      image: 'https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/667a7fa87fc27-68e7b68.jpeg',
    },
    {
      id: '2',
        name: 'Сумка Nike Elemental Premium 165572',
        cathegory: 'для жінок',
        price: '1789 грн',
        image: 'https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/6638871f8621f-68e7b68.jpeg',
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
  const navigation = useNavigation();
  const { products, discounts, genders } = useContext(ProductContext);
  const formatNumber = (number) => { return number.toLocaleString('uk-UA'); };
  const gendername = ( id ) => { return genders.find(e => e.id == id).name; };
  const percent = (id) => {return discounts.find(e => e.id == id).percent; };

  const renderItem = ({ item }) => {
   

    return (
        <Pressable style={styles.itemContainer}>
          <View style={{ height: 150, width: '100%', margin: 0, padding: 0, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
            <Image source={{ uri: item.photos[0]?.url }} style={styles.itemImage} />
          </View >
          <View style={styles.description}>
            <Text style={[globalStyles.boldText, styles.itemName]}>{item?.name}</Text>
          <Text style={[globalStyles.defaultText, styles.itemCathegory]}>{ gendername(item.genderId) }</Text>
          <Text style={[globalStyles.boldText, styles.itemPrice]}>{formatNumber(item?.price)} грн.  -{ percent(item.discountId)}% </Text>
          </View>
        </Pressable>
    );
  };
    
  return (
    // <Product type={true} data={this.data} page={'catalog'}/>
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.filterbox}>
        <Text style={[globalStyles.defaultText, styles.text]}>428 результатів</Text>
        <Pressable style={[styles.button, styles.buttonShadow]}>
          <Text style={[globalStyles.defaultText, styles.buttonText]}>Фільтр</Text>
        </Pressable>
      </View>
          <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2}
            contentContainerStyle={styles.list}
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
      flex: 1,
      padding: 10,
    },
  filterbox: {
      // flex: 1,
    paddingVertical: 5,
    justifyContent: 'space-around',
      alignItems: 'center',
      height: 60,
    flexDirection: 'row',
    borderBottomColor: '#888',
      borderBottomWidth: 1,
    },
    itemContainer: {
      flex: 1,
      margin: 2,
      padding: 2,
      // borderWidth: 1,
      // borderColor: '#ddd',
      // borderRadius: 5,
      // backgroundColor: '#f9f9f9',
    },
    itemImage: {
      width: '100%',
      height: 150,
      resizeMode: 'contain',
      borderRadius: 5,
    },
    itemName: {
      fontSize: 14,
      marginVertical: 5,
  },
  itemCathegory: {
    fontSize: 14,
    marginVertical: 5,
  },
    itemPrice: {
      fontSize: 14,
      color: '#888',
  },
  button: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#4748FF',
    borderRadius: 25,
    // marginVertical: 3,
    width: '30%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    paddingTop: 8,
    // padding: 8,
    paddingBottom: 12,
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
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
  description: {
    flex: 1,
    justifyContent: 'space-between',
  },
  });

export default ProductItem;