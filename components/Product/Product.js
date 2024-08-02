import React from 'react';
import { View, FlatList, Image, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import globalStyles from '../../screens/Other/styles';
import { useNavigation } from '@react-navigation/native';


const data = [
    {
      id: '1',
      name: 'Кроссовки NIKE COURT VISION LOW NN',
      discount: '20%',
      cathegory: 'для жінок',
      price: '4 479 грн',
      image: '../../assets/images/ProductImage.png',
    },
];
  
// const renderItem = useCallback(({ item }) => (
//     <Item title={item.title} img={item.img} author={item.author} />
//   ));

const ProductItem = (type = { type }, item = { data }, page={page}) => {
    const navigation = useNavigation();

    const renderItem = ({ item }) => (
        <View>
        {type?(<>  
            <Pressable style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <Text style={[globalStyles.defaultText, styles.itemName]}>{item.name}</Text>
            <Text style={[globalStyles.defaultText, styles.itemPrice]}>{item.price}</Text>
            </Pressable >
        </>):(<>
            <View></View>
                </>)}
        </View>
    );
    
      return (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={[type, data, page]}
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