import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ImageBackground} from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import globalStyles from '../../screens/Other/styles';
import { AuthContext } from '../../store/AuthContext';
import Icon from 'react-native-vector-icons/AntDesign';



const CustomDrawerContent = (props) => {
  const { username, firstname, lastname, email, userphoto, phonenumber, userEntered } = useContext(AuthContext);
  const [isMenOpen, setMenOpen] = useState(false);
  const [isWomenOpen, setWomenOpen] = useState(false);
  const [isKidsOpen, setKidsOpen] = useState(false);


  const Logout = async() => {
    
  };

  return (
    <DrawerContentScrollView {...props}
      contentContainerStyle={{ backgroundColor: '#FFC700' }}>
      <ImageBackground source={require('../../assets/images/backgroun2.png')} style={{ padding: 10,  }}>
        <Pressable onPress={() => props.navigation.navigate('Enter')}>
          {userphoto ? <Image source={{ uri: userphoto }} style={{ height: 80, width: 80, borderRadius: 40, margin: 20 }} />
          :
            <Image source={require('../../assets/images/No_Image.jpg')} style={{ height: 80, width: 80, borderRadius: 40, margin: 20 }} />
          }
          <Text style={[globalStyles.defaultText, { fontSize: 20, color: '#fff', marginBottom: 10, marginTop: -10 }]}>{firstname ? firstname : 'Вам необхідно увійти або зареєструватись'} {lastname ? lastname : null}</Text>
          <Text style={[globalStyles.defaultText, { fontSize: 16, color: '#fff' }]}>Login: {username ? username : 'None'}</Text>
          <Text style={[globalStyles.defaultText, { fontSize: 16, color: '#fff' }]}>Phone: { phonenumber ? phonenumber: 'None' }</Text>
          <Text style={[globalStyles.defaultText, { fontSize: 16, color: '#fff' }]}>Email: { email ? email : 'None'}</Text>
        </Pressable>
      </ImageBackground>
            
      <DrawerItem
        label={()=><Text style={[globalStyles.boldText, styles.label]}>&#8226; Головна</Text>}
        onPress={() => props.navigation.navigate('Main')}
      />

      <Pressable onPress={() => setMenOpen(!isMenOpen)}>
        <View style={styles.row}>
          <Text style={[globalStyles.boldText, styles.menuItem]}>&#8226; Чоловіки   </Text>
          {!isMenOpen ? (<Icon name="right" size={15} color="black"/>) : (<Icon name="down" size={15} color="black" />)}
        </View>
      </Pressable>
      {isMenOpen && (
        <View style={styles.subMenu}>
          <DrawerItem
            label={()=><Text style={globalStyles.boldText}>Одяг</Text>}
            onPress={() => props.navigation.navigate('Catalog', {filter: 'menclothes'})}
          />
          <DrawerItem
            label={()=><Text style={globalStyles.boldText}>Взуття</Text>}
            // onPress={() => props.navigation.navigate('Enter')}
            onPress={() => props.navigation.navigate('Catalog', {filter: 'menshoes'})}
          />
          <DrawerItem
            label={()=><Text style={globalStyles.boldText}>Аксесуари</Text>}
            onPress={() => props.navigation.navigate('Catalog', {filter: 'menaccessories'})}
          />
        </View>
      )}

      <Pressable onPress={() => setWomenOpen(!isWomenOpen)}>
      <View style={styles.row}>
          <Text style={[globalStyles.boldText, styles.menuItem]}>&#8226; Жінки        </Text>
          {!isWomenOpen ? (<Icon name="right" size={15} color="black"/>) : (<Icon name="down" size={15} color="black" />)}
        </View>
      </Pressable>
      {isWomenOpen && (
        <View style={styles.subMenu}>
          <DrawerItem
            label={()=><Text style={globalStyles.boldText}>Одяг</Text>}
            // onPress={() => props.navigation.navigate('RegistrationNValidation')}
            onPress={() => props.navigation.navigate('Catalog', {filter: 'womenclothes'})}
          />
          <DrawerItem
            label={()=><Text style={globalStyles.boldText}>Взуття</Text>}
            // onPress={() => props.navigation.navigate('Login')}
            onPress={() => props.navigation.navigate('Catalog', {filter: 'womenshoes'})}
          />
          <DrawerItem
            label={()=><Text style={globalStyles.boldText}>Аксесуари</Text>}
            // onPress={() => props.navigation.navigate('Profile')}
            onPress={() => props.navigation.navigate('Catalog', {filter: 'womenaccessories'})}
          />
        </View>
      )}

      <Pressable onPress={() => setKidsOpen(!isKidsOpen)}>
      <View style={styles.row}>
          <Text style={[globalStyles.boldText, styles.menuItem]}>&#8226; Діти           </Text>
          {!isKidsOpen ? (<Icon name="right" size={15} color="black"/>) : (<Icon name="down" size={15} color="black" />)}
        </View>
      </Pressable>
      {isKidsOpen && (
        <View style={styles.subMenu}>
          <DrawerItem
            label={()=><Text style={globalStyles.boldText}>Одяг</Text>}
            // onPress={() => props.navigation.navigate('Error')}
            onPress={() => props.navigation.navigate('Catalog', {filter: 'kidclothes'})}
          />
          <DrawerItem
            label={()=><Text style={globalStyles.boldText}>Взуття</Text>}
            // onPress={() => props.navigation.navigate('Filter')}
            onPress={() => props.navigation.navigate('Catalog', {filter: 'kidshoes'})}
          />
         < DrawerItem
            label={()=><Text style={globalStyles.boldText}>Аксесуари</Text>}
            onPress={() => props.navigation.navigate('Catalog', {filter: 'kidaccessories'})}
          />
        </View>
      )}

      <DrawerItem
        label={()=><Text style={[globalStyles.boldText, styles.label]}>&#8226; Обрані</Text>}
        onPress={() => props.navigation.navigate('Favorites')}
      />
      <DrawerItem
        label={()=><Text style={[globalStyles.boldText, styles.label]}>&#8226; Подарункова карта</Text>}
        onPress={() => props.navigation.navigate('GiftCards')}
      />
      <DrawerItem
        label={()=><Text style={[globalStyles.boldText, styles.label]}>&#8226; Допомога</Text>}
        onPress={() => props.navigation.navigate('Help')}
      />
      <DrawerItem
        label={()=><Text style={[globalStyles.boldText, styles.label]}>&#8226; Каталог</Text>}
        onPress={() => props.navigation.navigate('Catalog')}
      />
      <DrawerItem
        label={()=><Text style={[globalStyles.boldText, styles.label]}>&#8226;  Знайти магазин</Text>}
        onPress={() => props.navigation.navigate('StoreLocator')}
      />
      {/* <DrawerItem
        label={()=><Text style={[globalStyles.boldText, styles.label]}>&#8226;  Вийти з обобистого запису</Text>}
        onPress={Logout()}
      /> */}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    paddingHorizontal: 17,
    paddingVertical: 5,
    fontSize: 18,
  },
  subMenu: {
    paddingLeft: 16,
  },
  row: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center', // центрирует текст и значок по вертикали
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
