import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { FontProvider, FontContext } from '../contexts/FontContext';
import { UserProvider } from '../store/UserContext';
import { ProductProvider } from '../store/ProductContext';
import { AuthContext, AuthProvider } from '../store/AuthContext';

import CustomDrawerContent from '../components/common/CustomDrawerContent'
import BackHandlerWrapper from '../components/common/BackHandlerWrapper';

import Login from '../screens/Auth/LoginScreen'
import Home from '../screens/Home/home'
import Profile from '../screens/Auth/ProfileScreen'
import EnterNRegistr from '../screens/Auth/enternregistr'
import Main from '../screens/Home/main'
import Error from '../screens/Other/ErrorScreen';
import Registration from '../screens/Auth/registration';
import RegistrationNValidation from '../screens/Auth/RegistrationScreen';
import Search from '../screens/Other/SearchScreen';
import Catalog from '../screens/Product/CatalogScreen';
import ProductPage from '../components/Product/ProductPage';
import StoreLocator from '../screens/Other/storeLocator';
import Favorites from '../screens/Cart/favoriteScreen';
import Cart from '../screens/Cart/cartScreen';
import Filter from '../screens/Cart/FilterScreen';
import Order from '../screens/Order/OrderScreen';
import Auth from '../store/AuthContext';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



const AppContent = () => {
  const { hasToken } = useContext(AuthContext);
  const { fontsLoaded } = useContext(FontContext);
  if (!hasToken) {
    return null;
  }

  if (!fontsLoaded ) {
    return null;
  }

 

  return (
    <NavigationContainer>
      <BackHandlerWrapper>
      <Drawer.Navigator
        // initialRouteName="Main"
        drawerContent={(props) => <CustomDrawerContent {...props}
        screenOptions={{
          drawerPosition: 'right',
          headerShown: false,
          drawerStyle:{right:0},
          drawerActiveBackgrondColor: '#4748FF',

        }}
        // drawerContentOptions={{activeTintColor: '#e91e63',}}
        drawerStyle={{width: 140, }}
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
        <Drawer.Screen name="Catalog" component={Catalog} />
        <Drawer.Screen name="ProductPage" component={ProductPage} />
        {/* <Drawer.Screen name="StoreLocator" component={StoreLocator} /> */}
        <Drawer.Screen name="Favorites" component={Favorites} />
        <Drawer.Screen name="Cart" component={Cart} />
        <Drawer.Screen name="Filter" component={Filter} />
        <Drawer.Screen name="Order" component={Order} />
        {/* <Drawer.Screen name="Aurh" component={Auth} /> */}
        </Drawer.Navigator>
        </BackHandlerWrapper>
    </NavigationContainer>
  );
}

export default function AppNavigator() {
  return (
    <AuthProvider>
      <UserProvider>
        <ProductProvider>
          <FontProvider>
            <AppContent />
          </FontProvider>
        </ProductProvider>
      </UserProvider>
    </AuthProvider>
  );
}