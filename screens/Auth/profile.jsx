import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TextInput, Platform, Alert, Pressable } from 'react-native';
import { Icon } from 'react-native-elements';
import globalStyles from '../Other/styles';
import Header from '../../components/common/header';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const Profile = () => {
  const [imageUri, setImageUri] = useState('../../assets/images/Profilephoto.png');
  const [savedImageUri, setSavedImageUri] = useState(null);
  const [error, setError] = useState('');


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
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      //setImageUri(result.assets[0].uri);
      setImageUri(result.uri);
      saveImageToLocalDirectory(result.uri);
      console.log(imageUri);
    }
  };

  const saveImageToLocalDirectory = async (uri) => {
    try {
      const fileName = 'Profilephoto.png'; // Название файла, под которым он будет сохранен
      const directory = FileSystem.documentDirectory + 'assets/images/';

      // Убедитесь, что директория существует, иначе создайте ее
      const dirInfo = await FileSystem.getInfoAsync(directory);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
      }

      const destPath = directory + fileName;
      await FileSystem.copyAsync({
        from: uri,
        to: destPath,
      });
      setSavedImageUri(destPath);
      console.log(`Image saved to: ${destPath}`);
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  const openCamera = async () => {
    // Запрашиваем разрешения на использование камеры
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    // Открываем камеру для создания фото
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      console.log(imageUri);
    }
  };


  return (
    <View style={styles.container}>
      <Header/>
      <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <Pressable onPress={showImagePickerOptions}>
          <Image source={require('../../assets/images/Profilephoto.png')} style={styles.profileImage} />
          <Text style={[globalStyles.defaultText, styles.changePhotoText]}>Змінити фото</Text>
        </Pressable>

        <View style={[globalStyles.defaultText, styles.inputContainer]}>
          <Text>Ім'я</Text>
          <TextInput style={[globalStyles.defaultText, styles.input, styles.borders]} placeholder="Ім'я*" />
        </View>

        <View style={[globalStyles.defaultText, styles.inputContainer]}>
          <Text>Прізвище</Text>
          <TextInput style={[globalStyles.defaultText, styles.input, styles.borders]} placeholder="Прізвище" />
        </View>

        <View style={[globalStyles.defaultText, styles.inputContainer]}>
          <Text>Номер телефону</Text>
          <View style={[styles.inputWithIcon, styles.borders]}>
            <TextInput style={[globalStyles.defaultText, styles.input]} placeholder="+380" />
            <Icon name="edit" size={20} color="#000" backgroundColor='#F5F5F5'/>
          </View>
        </View>

        <View style={[globalStyles.defaultText, styles.inputContainer]}>
          <Text>Ел. пошта</Text>
          <View style={[styles.inputWithIcon, styles.borders]}>
            <TextInput style={[globalStyles.defaultText, styles.input]} placeholder="--------" />
            <Icon name="edit" size={20} color="#000" backgroundColor='#F5F5F5'/>
          </View>
        </View>
        <Pressable style={styles.button}>
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
    resizeMode: 'contain',
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
    fontWeight: '700',
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
});

export default Profile;