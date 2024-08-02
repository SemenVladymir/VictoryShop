import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ImageBackground} from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import globalStyles from '../../screens/Other/styles';
import { MaterialIcons } from '@expo/vector-icons';


const CustomDrawerContent = (props) => {
  const [isMenOpen, setMenOpen] = useState(false);
  const [isWomenOpen, setWomenOpen] = useState(false);
  const [isKidsOpen, setKidsOpen] = useState(false);

  return (
    <DrawerContentScrollView {...props}
      contentContainerStyle={{ backgroundColor: '#8200d6', height: 150 }}>
      {/* <ImageBackground source={require('../../assets/images/backgroun.png')} style={{padding: 20}}> */}
        <Image source={require('../../assets/images/Profilephoto.png')} style={{ height: 80, width: 80, borderRadius: 40, margin: 20 }} />
      {/* </ImageBackground> */}
      <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate('Home')}
      />
      
      <Pressable onPress={() => setMenOpen(!isMenOpen)}>
        <View style={styles.row}>
          <Text style={[globalStyles.defaultText, styles.menuItem]}>&#8226;  Головна       </Text>
          {!isMenOpen ? (<Text style={fontSize = 20}>&#11166;</Text>) : (<Text style={fontSize = 20}>&#11167;</Text>)}
        </View>
      </Pressable>
      {isMenOpen && (
        <View style={styles.subMenu}>
          <DrawerItem
            label="Main"
            onPress={() => props.navigation.navigate('Main')}
          />
          <DrawerItem
            label="Enter"
            onPress={() => props.navigation.navigate('Enter')}
          />
        </View>
      )}

      <Pressable onPress={() => setWomenOpen(!isWomenOpen)}>
      <View style={styles.row}>
          <Text style={[globalStyles.defaultText, styles.menuItem]}>&#8226;  Регістрація  </Text>
          {!isWomenOpen ? (<Text style={fontSize = 20}>&#11166;</Text>) : (<Text style={fontSize = 20}>&#11167;</Text>)}
        </View>
      </Pressable>
      {isWomenOpen && (
        <View style={styles.subMenu}>
          <DrawerItem
            label="Registration"
            onPress={() => props.navigation.navigate('RegistrationNValidation')}
          />
          <DrawerItem
            label="Login"
            onPress={() => props.navigation.navigate('Login')}
          />
          <DrawerItem
            label="Profile"
            onPress={() => props.navigation.navigate('Profile')}
          />
        </View>
      )}

      <Pressable onPress={() => setKidsOpen(!isKidsOpen)}>
      <View style={styles.row}>
          <Text style={[globalStyles.defaultText, styles.menuItem]}>&#8226;  Інше               </Text>
          {!isKidsOpen ? (<Text style={fontSize = 20}>&#11166;</Text>) : (<Text style={fontSize = 20}>&#11167;</Text>)}
        </View>
      </Pressable>
      {isKidsOpen && (
        <View style={styles.subMenu}>
          <DrawerItem
            label="Error"
            onPress={() => props.navigation.navigate('Error')}
          />
          <DrawerItem
            label="Search"
            onPress={() => props.navigation.navigate('Search')}
          />
          <DrawerItem
            label="ProductItem"
            onPress={() => props.navigation.navigate('ProductItem')}
          />
          <DrawerItem
            label="ProductPage"
            onPress={() => props.navigation.navigate('ProductPage')}
          />
          <DrawerItem
            label="Filter"
            onPress={() => props.navigation.navigate('Filter')}
          />
        </View>
      )}

      <DrawerItem
        label={()=><Text style={[globalStyles.defaultText, styles.label]}>&#8226;  Обрані</Text>}
        onPress={() => props.navigation.navigate('Favorites')}
      />
      <DrawerItem
        label={()=><Text style={[globalStyles.defaultText, styles.label]}>&#8226; Подарункова карта</Text>}
        onPress={() => props.navigation.navigate('Error')}
      />
      <DrawerItem
        label={()=><Text style={[globalStyles.defaultText, styles.label]}>&#8226;  Допомога</Text>}
        onPress={() => props.navigation.navigate('Error')}
      />
      <DrawerItem
        label={()=><Text style={[globalStyles.defaultText, styles.label]}>&#8226;  Каталог</Text>}
        onPress={() => props.navigation.navigate('Error')}
      />
      <DrawerItem
        label={()=><Text style={[globalStyles.defaultText, styles.label]}>&#8226;  Знайти магазин</Text>}
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
    fontWeight: 'bold',
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
    fontWeight: 'bold',
    paddingLeft: -2,
  },
});

export default CustomDrawerContent;
