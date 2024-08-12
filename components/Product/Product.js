import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../../screens/Other/styles';
import { ProductContext } from '../../store/ProductContext';

const ProductItem = ({ item }) => {
    const navigation = useNavigation();
    const { discounts, genders } = useContext(ProductContext);
    const formatNumber = (number) => { return number.toLocaleString('uk-UA'); };
    
  const gendername = (id) => {
    if (genders.find(e => e.id == id))
      return genders.find(e => e.id == id).name;
    };
  const percent = (id) => {
    if (discounts.find(e => e.id == id))
      return discounts.find(e => e.id == id).percent;
  };
  
  const defaultImage = require('../../assets/images/No_Image.jpg');
  

      return (
          <Pressable style={styles.itemContainer} onPress={() => navigation.navigate('ProductPage', { product: item, gender: gendername(item.genderId), discount: percent(item.discountId) })}>
            <View style={{ height: 170, width: '100%', margin: 0, padding: 0, justifyContent: 'center', alignItems: 'center', borderRadius: 15, overflow: 'hidden', position: 'relative' }}>
            <Image source={ { uri: item.photos[0].url } ? { uri: item.photos[0].url } : defaultImage} style={styles.itemImage} />
            {percent(item.discountId) > 0 ? <Image source={require('../../assets/images/Discount.png')} style={styles.discountImage} /> : null}
          </View >
          
            <View style={styles.description}>
              <Text style={[globalStyles.boldText, styles.itemName]}>{item?.name}</Text>
              <Text style={[globalStyles.defaultText, styles.itemCathegory]}>{gendername(item.genderId)}</Text>
  
              {percent(item.discountId) > 0 ?
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={[globalStyles.boldText, styles.newPrice]}>{formatNumber(Math.round(item?.price))} грн</Text>
                  <Text style={[globalStyles.boldText, styles.oldPrice]}>{formatNumber(Math.round(item?.price/(100 - percent(item.discountId))*100))} грн</Text>
                </View>
                :
                <Text style={[globalStyles.boldText, styles.Price]}>{formatNumber(Math.round(item?.price))} грн</Text>
              }
            </View>
          </Pressable>
      );

  }
  
  const styles = StyleSheet.create({
      itemContainer: {
        flex: 1,
        margin: 2,
        padding: 2,
        marginBottom: 15,
      },
      itemImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      borderRadius: 5,
    },
    discountImage: {
      position: 'absolute',
      top: 5,
      left: 5,
      width: 30,
      height: 30,
      resizeMode: 'contain',
    },
      itemName: {
        fontSize: 14,
    },
    itemCathegory: {
      fontSize: 14,
      marginVertical: 2,
    },
    oldPrice: {
      fontSize: 14,
      textDecorationLine: 'line-through',
      marginRight: 8,
    },
    newPrice: {
      fontSize: 14,
      color: 'blue',
    },
    Price: {
      fontSize: 14,
      marginRight: 8,
    },
    description: {
      flex: 1,
      justifyContent: 'space-between',
    },
    });
  
  export default ProductItem;