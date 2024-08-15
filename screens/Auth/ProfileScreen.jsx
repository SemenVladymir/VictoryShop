import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TextInput, Platform, Alert, Pressable } from 'react-native';
import { Icon } from 'react-native-elements';
import globalStyles from '../Other/styles';
import Header from '../../components/common/header';
import * as ImagePicker from 'expo-image-picker';
import API from '../../services/api';
import { Camera } from 'expo-camera';
import { AuthContext } from '../../store/AuthContext';

const Profile = ({ navigation }) => {
  const { firstname, lastname, phonenumber, email, setUserEntered,
          getImageFromLocalDirectory, saveImageToLocalDirectory, setFirstName,
          setLastName, setPhoneNumber, setEmail, } = useContext(AuthContext);
  const [imageUri, setImageUri] = useState(null);
  const [firstName, setFirstName_] = useState(firstname);
  const [lastName, setLastName_] = useState(lastname);
  const [phone, setPhone] = useState(phonenumber);
  const [Email, setEmail_] = useState(email);
  const [error, setError] = useState('');

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    if (setUserEntered) {
      getImageFromLocalDirectory().then(respons => {
        setImageUri(respons);
        // setFirstName_(firstname);
        // setLastName_(lastname);
        // setPhone(phonenumber);
        // setEmail_(email);
      }).catch(error => {
        console.error('Error loading orders:', error);
        navigation.navigate('Error');
      });
    }
    else
      setImageUri(null);
  }, []);

  //Получение разрешения для выбора изображения для профиля
  const showImagePickerOptions = () => {
    Alert.alert("Екран вибора фото для профілю", "Виберіть один з вариантів:", [
      {
        text: "Відміна",
        style: "cancel",
      },
      {
        text: "Зробити фото",
        onPress: () => openCamera(),
      },
      {
        text: "Вибрати фото з галареї",
        onPress: () => openImagePicker(),
      },
    ]);
  };

//Выбор изображения через галерею
  const openImagePicker = async () => {
    // Запрашиваем разрешения на доступ к галерее
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
    }

    // Открываем галерею для выбора изображения
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      setImageUri(result.assets[0].uri);
      saveImageToLocalDirectory(result.assets[0].uri);
      // setImageUri(result.uri);
      // saveImageToLocalDirectory(result.uri);
      // console.log(imageUri);
    }
  };

  
  //Создание изображения через камеру
  const openCamera = async () => {
    // Запрашиваем разрешения на использование камеры
    const CameraStatus = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(CameraStatus.status === 'granted');

    // Открываем камеру для создания фото
    let result = await ImagePicker.launchCameraAsync({
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      console.log(imageUri);
      saveImageToLocalDirectory(result.assets[0].uri);
    }
  };

  const handleSaveProfile = async () => {
    try {
      console.log('firstName - ' + firstName);
      await API.updateprofile('', '', Email, 'User', new Date(), firstName, lastName, phone);
      setFirstName(firstName);
      setLastName(lastName);
      setPhoneNumber(phone);
      setEmail(Email);
      console.log('Start saving image');
      await API.uploadImage(imageUri);
    }
    catch (error) {
      console.log('Error while profile save '+error);
    }
  };


  return (
    <View style={styles.container}>
      <Header/>
      <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <Pressable onPress={showImagePickerOptions}>
            {imageUri ? <Image source={{ uri: imageUri }} style={styles.profileImage} />
              :
            <Image source={require('../../assets/images/No_Image.jpg')} style={styles.profileImage} />}
          <Text style={[globalStyles.defaultText, styles.changePhotoText]}>Змінити фото</Text>
        </Pressable>

        <View style={styles.inputContainer}>
            <Text style={[globalStyles.boldText, styles.text]}>Ім'я</Text>
            {firstname ? <TextInput style={[globalStyles.defaultText, styles.input, styles.borders]}
              placeholder={firstName}
              value={firstName}
              onChangeText={setFirstName_}
            />
              :
              <TextInput style={[globalStyles.defaultText, styles.input, styles.borders]}
                placeholder="Ім'я*"
                onChangeText={setFirstName_}
              />}
        </View>

        <View style={styles.inputContainer}>
            <Text style={[globalStyles.boldText, styles.text]}>Прізвище</Text>
            {lastname ? <TextInput style={[globalStyles.defaultText, styles.input, styles.borders]}
              placeholder={lastName}
              value={lastName}
              onChangeText={setLastName_}
            />
              :
              <TextInput style={[globalStyles.defaultText, styles.input, styles.borders]}
                placeholder="Прізвище"
                onChangeText={setLastName_}
              />}
        </View>

        <View style={styles.inputContainer}>
            <Text style={[globalStyles.boldText, styles.text]}>Номер телефону</Text>
            <View style={[styles.inputWithIcon, styles.borders]}>
              {phonenumber ? <TextInput style={[globalStyles.defaultText, styles.input]}
                value={phone}
                placeholder={phone}
                onChangeText={setPhone}
              />
                :
                <TextInput style={[globalStyles.defaultText, styles.input]}
                  placeholder="+380"
                  onChangeText={setPhone}
                />}
            <Icon name="edit" size={20} color="#000" backgroundColor='#F5F5F5'/>
          </View>
        </View>

        <View style={styles.inputContainer}>
            <Text style={[globalStyles.boldText, styles.text]}>Ел. пошта</Text>
            <View style={[styles.inputWithIcon, styles.borders]}>
              {email ? <TextInput style={[globalStyles.defaultText, styles.input]}
                value={Email}
                placeholder={Email}
                onChangeText={setEmail_}
              />
                :
                <TextInput style={[globalStyles.defaultText, styles.input]}
                  placeholder="--------"
                  onChangeText={setEmail_}
                />}
            <Icon name="edit" size={20} color="#000" backgroundColor='#F5F5F5'/>
          </View>
        </View>
        <Pressable style={styles.button} onPress={() => handleSaveProfile()}>
          <Text style={[globalStyles.defaultText, styles.buttonText]}>Зберегти</Text>
        </Pressable>
      </View>
      </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  changePhotoText: {
    color: '#000',
    textAlign: 'center',
    marginTop: 10,
  },
  inputContainer: {
    width: '80%',
    marginVertical: 10,
  },
  input: {
    padding: 5,
    marginTop: 5,
    //fontFamily: 'Jura',
    fontSize: 16,
    // fontWeight: '700',
    height: 50,
    backgroundColor: '#F5F5F5',
  },
  inputWithIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    marginTop: 5,
    backgroundColor: '#F5F5F5'
  },
  borders: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#000',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#4748FF',
    // alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
    width: 150,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  label: {

  },
});

export default Profile;