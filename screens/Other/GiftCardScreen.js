import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Header from '../../components/common/header';
import globalStyles from '../Other/styles';

const GiftCardPage = () => {
  return (
      <SafeAreaView style={styles.box}>
        <Header />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Text style={[globalStyles.boldText, styles.title]}>Подарункова карта ...... доповнить ваш образ</Text>
            <View style={styles.cardContainer}>
              <Image source={require('../../assets/images/GiftCard.png')} style={styles.giftCard} />
              <Text style={[globalStyles.boldText, styles.cardcost]}>500 грн</Text>
            </View>

            <TouchableOpacity style={[styles.buttonfirst, styles.buttonShadow]}>
              <Text style={[globalStyles.boldText, styles.buttonText1]}>Надіслати подарункову картку</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.buttonsecond, styles.buttonShadow]}>
              <Text style={[globalStyles.boldText, styles.buttonText2]}>Подарункова картка ел.поштою</Text>
            </TouchableOpacity>
            </View>


            <Text style={[globalStyles.boldText, styles.subtitle]}>Інші картки:</Text>

        <View style={styles.otherCardContainer}>
            <View style={styles.cardWrapper}>
              <Image source={require('../../assets/images/GiftCard.png')} style={styles.giftCard} />
              <Text style={[globalStyles.boldText, styles.othercardcost]}>400 грн</Text>
          </View>
          <View style={styles.cardWrapper}>
              <Image source={require('../../assets/images/GiftCard.png')} style={styles.giftCard} />
              <Text style={[globalStyles.boldText, styles.othercardcost]}>300 грн</Text>
          </View>
          <View style={styles.cardWrapper}>
              <Image source={require('../../assets/images/GiftCard.png')} style={styles.giftCard} />
              <Text style={[globalStyles.boldText, styles.othercardcost]}>200 грн</Text>
          </View>
          <View style={styles.cardWrapper}>
              <Image source={require('../../assets/images/GiftCard.png')} style={styles.giftCard} />
              <Text style={[globalStyles.boldText, styles.othercardcost]}>100 грн</Text>
            </View>
          </View>
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  box: {
    flex:1,
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#F1F1F1',
    // paddingHorizontal: 20,
    // paddingVertical: 10,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 40,
    paddingTop: 20,
    backgroundColor: 'gray',
  },
  logo: {
    width: 50,
    height: 50,
  },
  icons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginHorizontal: 5,
  },
  icon: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    width: '85%',
  },
  cardContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  giftCard: {
    width: 380,
    height: 180,
    resizeMode: 'contain',
 },
cardcost: {
    position: 'absolute',
    bottom: 27,
  },
  othercardcost: {
    position: 'absolute',
    bottom: 27,
 },
 buttonfirst: {
  backgroundColor: '#FFC700',
  padding: 12,
  borderRadius: 25,
  marginTop: 20,
  width: '85%',
  alignItems: 'center',
},
buttonsecond: {
  backgroundColor: '#4748FF',
  padding: 12,
  borderRadius: 25,
  marginTop: 30,
  width: '85%',
  alignItems: 'center',
},
buttonText1: {
  color: '#000',
  fontSize: 18,
},
buttonText2: {
  color: '#fff',
  fontSize: 18,
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
  subtitle: {
    fontSize: 20,
    color: '#333',
    marginBottom: 10,
    marginLeft: '7%',
  },
  otherCardContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardWrapper: {
    position: 'relative',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GiftCardPage;
