import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ImageBackground} from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import globalStyles from '../../screens/Other/styles';
import { AuthContext } from '../../store/AuthContext';



const CustomDrawerContent = (props) => {
  const { username, firstname, lastname, email, userphoto } = useContext(AuthContext);
  const [isMenOpen, setMenOpen] = useState(false);
  const [isWomenOpen, setWomenOpen] = useState(false);
  const [isKidsOpen, setKidsOpen] = useState(false);

  return (
    <DrawerContentScrollView {...props}
      contentContainerStyle={{ backgroundColor: '#FFC700' }}>
      <ImageBackground source={require('../../assets/images/backgroun2.png')} style={{ padding: 20 }}>
        <Pressable onPress={() => props.navigation.navigate('Profile')}>
          <Image source={{uri: userphoto}?{uri: userphoto}:require('../../assets/images/No_Image.jpg')} style={{ height: 80, width: 80, borderRadius: 40, margin: 20 }} />
          <Text style={[globalStyles.defaultText, { fontSize: 20, color: '#fff', marginBottom: 10, marginTop: -10 }]}>{firstname ? firstname : 'None'} {lastname ? lastname : null}</Text>
          <Text style={[globalStyles.defaultText, { fontSize: 16, color: '#fff' }]}>Login: { username ? username: 'None' }</Text>
          <Text style={[globalStyles.defaultText, { fontSize: 16, color: '#fff' }]}>Email: { email ? email : 'None'}</Text>
        </Pressable>
      </ImageBackground>
      <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate('Home')}
      />
      
      <Pressable onPress={() => setMenOpen(!isMenOpen)}>
        <View style={styles.row}>
          <Text style={[globalStyles.boldText, styles.menuItem]}>&#8226; Головна      </Text>
          {!isMenOpen ? (<Text style={fontSize = 20}>&#11166;</Text>) : (<Text style={fontSize = 20}>&#11167;</Text>)}
        </View>
      </Pressable>
      {isMenOpen && (
        <View style={styles.subMenu}>
          <DrawerItem
            label={()=><Text style={globalStyles.boldText}>Main</Text>}
            onPress={() => props.navigation.navigate('Main')}
          />
          <DrawerItem
            label={()=><Text style={globalStyles.boldText}>Enter</Text>}
            onPress={() => props.navigation.navigate('Enter')}
          />
        </View>
      )}

      <Pressable onPress={() => setWomenOpen(!isWomenOpen)}>
      <View style={styles.row}>
          <Text style={[globalStyles.boldText, styles.menuItem]}>&#8226; Регістрація  </Text>
          {!isWomenOpen ? (<Text style={fontSize = 20}>&#11166;</Text>) : (<Text style={fontSize = 20}>&#11167;</Text>)}
        </View>
      </Pressable>
      {isWomenOpen && (
        <View style={styles.subMenu}>
          <DrawerItem
            label={()=><Text style={globalStyles.boldText}>Registration</Text>}
            onPress={() => props.navigation.navigate('RegistrationNValidation')}
          />
          <DrawerItem
            label={()=><Text style={globalStyles.boldText}>Login</Text>}
            onPress={() => props.navigation.navigate('Login')}
          />
          <DrawerItem
            label={()=><Text style={globalStyles.boldText}>Profile</Text>}
            onPress={() => props.navigation.navigate('Profile')}
          />
        </View>
      )}

      <Pressable onPress={() => setKidsOpen(!isKidsOpen)}>
      <View style={styles.row}>
          <Text style={[globalStyles.boldText, styles.menuItem]}>&#8226; Інше             </Text>
          {!isKidsOpen ? (<Text style={fontSize = 20}>&#11166;</Text>) : (<Text style={fontSize = 20}>&#11167;</Text>)}
        </View>
      </Pressable>
      {isKidsOpen && (
        <View style={styles.subMenu}>
          <DrawerItem
            label={()=><Text style={globalStyles.boldText}>Error</Text>}
            onPress={() => props.navigation.navigate('Error')}
          />
          <DrawerItem
            label={()=><Text style={globalStyles.boldText}>Search</Text>}
            onPress={() => props.navigation.navigate('Search')}
          />
          <DrawerItem
            label={()=><Text style={globalStyles.boldText}>CatalogScreen</Text>}
            onPress={() => props.navigation.navigate('Catalog')}
          />
          <DrawerItem
            label={()=><Text style={globalStyles.boldText}>ProductPage</Text>}
            onPress={() => props.navigation.navigate('ProductPage')}
          />
          <DrawerItem
            label={()=><Text style={globalStyles.boldText}>Filter</Text>}
            onPress={() => props.navigation.navigate('Filter')}
          />
          <DrawerItem
            label={()=><Text style={globalStyles.boldText}>Order</Text>}
            onPress={() => props.navigation.navigate('Order')}
          />
        </View>
      )}

      <DrawerItem
        label={()=><Text style={[globalStyles.boldText, styles.label]}>&#8226; Обрані</Text>}
        onPress={() => props.navigation.navigate('Favorites')}
      />
      <DrawerItem
        label={()=><Text style={[globalStyles.boldText, styles.label]}>&#8226; Подарункова карта</Text>}
        onPress={() => props.navigation.navigate('Error')}
      />
      <DrawerItem
        label={()=><Text style={[globalStyles.boldText, styles.label]}>&#8226; Допомога</Text>}
        onPress={() => props.navigation.navigate('Error')}
      />
      <DrawerItem
        label={()=><Text style={[globalStyles.boldText, styles.label]}>&#8226; Каталог</Text>}
        onPress={() => props.navigation.navigate('ProductItem')}
      />
      <DrawerItem
        label={()=><Text style={[globalStyles.boldText, styles.label]}>&#8226;  Знайти магазин</Text>}
        onPress={() => props.navigation.navigate('Error')}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    paddingHorizontal: 17,
    paddingVertical: 10,
    fontSize: 18,
  },
  subMenu: {
    paddingLeft: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline', // центрирует текст и значок по вертикали
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'baseline', // центрирует текст и значок по вертикали
    backgroundColor: "#ffc700",
  },
  label: {
    //marginLeft: 5, // добавляет отступ между значком и текстом
    fontSize: 18,
    paddingLeft: -2,
  },
});

export default CustomDrawerContent;
