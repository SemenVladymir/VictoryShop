// components/Header.js
import React, {useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, StyleSheet,  Pressable, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../../screens/Other/styles';
import { Icon } from 'react-native-elements';
//import { Provider as PaperProvider, Menu, Button } from 'react-native-paper';
import { OrderContext } from '../../store/OrderContext';
import { AuthContext } from '../../store/AuthContext';
import { useFocusEffect } from '@react-navigation/native';

const Header = ({ onlyLOGO }) => {
  const navigation = useNavigation();
  const { actualOrders, getActualOrders } = useContext(OrderContext);
  const { userEntered, getImageFromLocalDirectory } = useContext(AuthContext);

  const [visible, setVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [imageUri, setImageUri] = useState(null);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);


  useFocusEffect(
    useCallback(() => {
      getActualOrders().then(orders => {
        if (orders)
          setCartCount(orders.length);
        else
          setCartCount(null);
      })
      .catch(error => {
        console.error('Error loading orders:', error);
        navigation.navigate('Error');
      });
      if (userEntered)
      {
        getImageFromLocalDirectory().then(response => {
          setImageUri(response);
        }).catch(error => {
          console.error('Error loading orders:', error);
          navigation.navigate('Error');
        });
      }
      else
      setImageUri(null);
    }, [])
  );

  useEffect(() => {
    if (actualOrders)
      setCartCount(actualOrders.length);
    else
      setCartCount(0);
  }, [actualOrders]);


  return (
    <SafeAreaView style={{marginTop: 45}}>
      <View style={!onlyLOGO ? styles.header : styles.headerwithoutlogo}>
      <View style={styles.logoContainer}>
      <Pressable onPress={() => navigation.navigate('Main')}>
        <Image source={require('../../assets/images/Logo.png')} style={styles.image} />
      </Pressable>
      </View>
      {!onlyLOGO ? (
        <View style={styles.icons}>
          <Pressable onPress={() => navigation.navigate('Favorites')}>
              <Icon name="favorite-border" size={30} color="#000" />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Cart')}>
            <Icon name="shopping-cart" size={30} color="#000" />
            {cartCount > 0 ? <>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            </>:null}
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Search')}>
              <Icon name="search" size={30} color="#000" />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Profile')}>
              {imageUri ? <Image source={{ uri: imageUri }} style={styles.profileImage} />
              : <Icon name="person" size={30} color="#000" />}
          </Pressable>

          {/*----------------Dropdawn menu------------------- */}
          <Pressable
            // onPress={() => navigation.navigate('AppBar')}
            onPress={() => navigation.toggleDrawer()}>
              <Icon name="menu" size={25} color="#000" />
          </Pressable>
          {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>{ this.props.name}</Text>
          </View> */}


        </View>
      ):(<Text></Text>)}
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginStart: 15,
  },
  profileImage: {
    width: 34,
    height: 34,
    borderRadius: 17,
    resizeMode: 'cover',
  },
  header: {
    height: 60,
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 10,
  },
  headerwithoutlogo: {
    height: 60,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  icons: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    },
  logoContainer: {
        alignItems: 'start',
    },
  logo: {
        fontSize: 20,
        fontWeight: '400',
        color: '#FFC700',
        backgroundColor: '#4748FF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'flex-start',
      },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  badge: {
    position: 'absolute',
    right: -10,
    top: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});


