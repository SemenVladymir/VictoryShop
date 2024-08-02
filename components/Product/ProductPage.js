import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, Pressable } from 'react-native';
import Header from '../../components/common/header';
import globalStyles from '../../screens/Other/styles';

export default function ProductPage(...props) {
  return (
      <SafeAreaView style={styles.container}>
        <Header cartCount={2} onlyLOGO={false}/>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      

        <Text style={[globalStyles.defaultText, styles.productTitle]}>КРОСІВКИ ZERØGRAND</Text>
        <Text style={[globalStyles.defaultText, styles.productTitle]}>Running Shoes</Text>
        <Text style={[globalStyles.defaultText, styles.productSubtitle]}>для чоловіків</Text>
              
        <View style={styles.priceContainer}>
          <Text style={[globalStyles.defaultText, styles.oldPrice]}>9,000 грн</Text>
          <Text style={[globalStyles.defaultText, styles.newPrice]}>-20% 7,200 грн</Text>
        </View>

        {/* <View style={styles.saleBadge}>
          <Text style={styles.saleText}>sale</Text>
        </View> */}

        <Image
          source={{ uri: '../../assets/images/ProductImage.png' }}
          style={styles.productImage}
        />
              
        <Image
          source={{ uri: './assets/images/Discount.png' }}
          style={styles.discountImage}
        />

              <View style={styles.navigation}>
                  <Pressable>
                      <Image source={{uri: './assets/images/StepLeft.png'}}/>
                  </Pressable>
                  <Pressable>
                      <Image source={{uri: './assets/images/StepRight.png'}}/>
                  </Pressable>
          {/* <Button title="←" onPress={() => {}} />
          <Button title="→" onPress={() => {}} /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
    scrollViewContent: {
      marginTop: 10,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 16,
  },
  logo: {
    flex: 1,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 100,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 300,
  },
  productSubtitle: {
    fontSize: 16,
    //color: 'gray',
  },
    priceContainer: {
      paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  newPrice: {
    color: 'blue',
  },
  saleBadge: {
    backgroundColor: 'yellow',
    padding: 4,
    borderRadius: 4,
    position: 'absolute',
    top: 140,
    left: 20,
  },
  saleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productImage: {
    width: '90%',
    height: 'auto',
    //resizeMode: 'contain',
    },
    discountImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        position: 'relative',
        marginTop: -280,
        marginLeft: -230,
      },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
    marginTop: 270,
  },
});
