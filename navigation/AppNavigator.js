import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { FontProvider, FontContext } from '../contexts/FontContext';
import { UserProvider } from '../store/UserContext';
import { ProductProvider } from '../store/ProductContext';

import CustomDrawerContent from '../components/common/CustomDrawerContent'

import Login from '../screens/Auth/login'
import Home from '../screens/Home/home'
import Profile from '../screens/Auth/profile'
import EnterNRegistr from '../screens/Auth/enternregistr'
import Main from '../screens/Home/main'
import Error from '../screens/Other/error';
import Registration from '../screens/Auth/registration';
import RegistrationNValidation from '../screens/Auth/regnvalid';
import Search from '../screens/Other/search';
import ProductItem from '../components/Product/ProductItem';
import ProductPage from '../components/Product/ProductPage';
import StoreLocator from '../screens/Other/storeLocator';
import Favorites from '../screens/Cart/favoriteScreen';
import Cart from '../screens/Cart/cartScreen';
import Filter from '../screens/Cart/FilterScreen';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



const AppContent = () => {
  const { fontsLoaded } = useContext(FontContext);

  if (!fontsLoaded) {
    return null;
  }


  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Main"
        drawerContent={(props) => <CustomDrawerContent {...props}
        drawerPosition="right"                // Change drawer position to right
        drawerContentOptions={{activeTintColor: '#e91e63',}}
        drawerStyle={{width: 240, }}
        screenOptions={{headerShown: false,}} // Disable default header with drawer icon
        />}>
        <Drawer.Screen name="Main" component={Main}/>
        <Drawer.Screen name="Registration" component={Registration} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Enter" component={EnterNRegistr} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Error" component={Error} />
        <Drawer.Screen name="RegistrationNValidation" component={RegistrationNValidation} />
        <Drawer.Screen name="Search" component={Search} />
        <Drawer.Screen name="ProductItem" component={ProductItem} />
        <Drawer.Screen name="ProductPage" component={ProductPage} />
        {/* <Drawer.Screen name="StoreLocator" component={StoreLocator} /> */}
        <Drawer.Screen name="Favorites" component={Favorites} />
        <Drawer.Screen name="Cart" component={Cart} />
        <Drawer.Screen name="Filter" component={Filter} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default function AppNavigator() {
  return (
    <UserProvider>
      <ProductProvider>
        <FontProvider>
          <AppContent />
        </FontProvider>
      </ProductProvider>
    </UserProvider>
  );
}