import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Image } from 'react-native';
import { Icon } from'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../Other/styles';
import Header from '../../components/common/header';

const SearchScreen = ({ navigation }) => {
const [searchQuery, setSearchQuery] = useState('');
const [isFocused, setIsFocused] = useState(false);
// const navigation = useNavigation();

  const handleSearch = () => {
    // Implement the search functionality here
    console.log('Search Query:', searchQuery);
  };

  const handleHome = () => {
    // Implement the navigation to home screen here
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <Header onlyLOGO={false} />
      <View style={styles.title}>
        <Text style={[globalStyles.boldText, styles.titletext]}>Пошук</Text>
      </View>
        <View style={styles.body}>
            {/* <Text style={[globalStyles.defaultText, styles.title]}>Пошук</Text> */}
              <View style={styles.searchContainer}>
              {!isFocused && !searchQuery && <Icon name="search" size={20} style={styles.icon} />}
                <TextInput
                style={[globalStyles.defaultText, styles.searchInput]}
                placeholder=" "
                value={searchQuery}
                onChangeText={(newsearch)=>setSearchQuery(newsearch)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                />
        </View>
        
        <Image source={require('../../assets/images/sports.png')} style={styles.discountImage}/>
        
          <View style={styles.buttons}>
            <Pressable style={[styles.buttonShadow, styles.buttonFind]} onPress={handleSearch}>
                <Text style={[globalStyles.defaultText, styles.buttonText]}>Знайти</Text>
            </Pressable>
            <Pressable style={[styles.buttonShadow, styles.buttonHome]} onPress={handleHome}>
                <Text style={[globalStyles.defaultText, styles.buttonTextHome]}>Головна</Text>
            </Pressable>
          </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
      },
      body: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
        justifyContent: 'flex-start',
        backgroundColor: '#FFFFFF',
      },
      title: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
        // backgroundColor: '#FFC700',
      },
      titletext: {
      fontSize: 22,
      // fontWeight: 700,
      },
    icon: {
        marginLeft: 5,
      },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 30,
        width: '80%',
        backgroundColor: '#F5F5F5',
    },
    searchInput: {
        flex: 1,
        height: 40,
        //marginLeft: 5,
        fontSize: 16,
  },
  buttons: {
    flex: 1,
    marginTop: 50,
    width: '100%',
    alignItems: 'center',
    },
    buttonFind: {
        backgroundColor: '#FFC700',
        padding: 12,
        borderRadius: 25,
        marginTop: 20,
        width: '50%',
        alignItems: 'center',
    },
    buttonHome: {
        backgroundColor: '#4748FF',
        padding: 12,
        borderRadius: 25,
        marginTop: 30,
        width: '50%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
    },
    buttonTextHome: {
        color: '#fff',
        fontSize: 16,
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
    }
});

export default SearchScreen;
