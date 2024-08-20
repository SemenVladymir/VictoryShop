import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { FontProvider, FontContext } from '../contexts/FontContext';
import { ProductProvider } from '../store/ProductContext';
import { AuthContext, AuthProvider } from '../store/AuthContext';
import { OrderProvider } from '../store/OrderContext';

import CustomDrawerContent from '../components/common/CustomDrawerContent'
import BackHandlerWrapper from '../components/common/BackHandlerWrapper';

import Login from '../screens/Auth/LoginScreen'
import Home from '../screens/Home/HomeScreen'
import Profile from '../screens/Auth/ProfileScreen'
import EnterNRegistr from '../screens/Auth/enternregistr'
import Main from '../screens/Home/MainScreen'
import Error from '../screens/Other/ErrorScreen';
import Registration from '../screens/Auth/registration';
import RegistrationNValidation from '../screens/Auth/RegistrationScreen';
import Search from '../screens/Other/SearchScreen';
import Catalog from '../screens/Product/CatalogScreen';
import ProductPage from '../components/Product/ProductPage';
import StoreLocator from '../screens/Other/StoreLocator';
import Favorites from '../screens/Cart/FavoriteScreen';
import Cart from '../screens/Cart/CartScreen';
import Filter from '../screens/Cart/FilterScreen';
import Order from '../screens/Order/OrderScreen';
import Help from '../screens/Other/HelpScreen';
import GiftCards from '../screens/Other/GiftCardScreen';
import { View, StyleSheet } from 'react-native';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



const AppContent = () => {
  const { hasToken, userEntered } = useContext(AuthContext);
  const { fontsLoaded } = useContext(FontContext);
  if (!hasToken || !fontsLoaded) {
    return null;
  }

  const renderScreen = (name, component) => {
    return (
      <Drawer.Screen
        name={name}
        component={userEntered ? component : EnterNRegistr}
      />
    );
  };

  const styles = StyleSheet.create({
    drawerContainer: {
      flex: 1,
      borderWidth: 10,
      borderColor: '#4748FF',
      overflow: 'hidden',
    },
  });

 
return (
    <NavigationContainer>
      <BackHandlerWrapper>
      <Drawer.Navigator
        drawerContent={(props) => (
          <View style={styles.drawerContainer}>
            <CustomDrawerContent {...props} />
          </View>
          )}
          screenOptions={{
            drawerPosition: 'right',
            headerShown: false,
            drawerStyle: { right: 0, width: 330 },
            drawerActiveBackgrondColor: '#4748FF',
            gestureEnabled: false,
          }}
        >
          <Drawer.Screen name="Main" component={Main} />
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
          <Drawer.Screen name="StoreLocator" component={StoreLocator} />
          <Drawer.Screen name="Favorites" component={Favorites} />
          {renderScreen("Cart", Cart)}
          <Drawer.Screen name="Filter" component={Filter} />
          <Drawer.Screen name="Help" component={Help} />
          <Drawer.Screen name="GiftCards" component={GiftCards} />
          {renderScreen("Order", Order)}
        </Drawer.Navigator>
      </BackHandlerWrapper>
    </NavigationContainer>
  );
};

export default function AppNavigator() {
  const navigationRef = useNavigationContainerRef();

  return (
    <AuthProvider>
      <ProductProvider>
        <OrderProvider>
          <FontProvider>
            <AppContent />
          </FontProvider>
        </OrderProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

