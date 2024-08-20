import * as FileSystem from 'expo-file-system';
import { saveData, clearData, getDataString } from './AsyncStorageUtil';

class API {
  constructor() {
    if (API.instance) {
      return API.instance;
    }
    API.instance = this;

    // this.baseUrl = 'https://localhost:7000/api';
    this.baseUrl = 'http://192.168.0.110:5156/api'
    this.headers = {
      'Content-Type': 'application/json',
      'charset': 'utf-8',
      'X-Content-Type-Options': 'no-sniff',
    };
    return this;
  }

  addDays = (days) => {
    return (Date.now() + days*24*3600*1000);
  };

  async setTokens(token, refreshToken) {
    this.headers['Authorization'] = `Bearer ${token}`;
    await saveData('Token', token);
    await saveData('RefreshToken', refreshToken);
    await saveData('RefreshTokenEndDate', JSON.stringify(new Date(this.addDays(7)).getTime()));
  }

  async loadTokens() {
    const token = await getDataString('Token');
    // console.log('Token fron AsyncStorage (loadTokens API line 40) - ' + token);
    const refreshToken = await getDataString('RefreshToken');
    if (token) {
      this.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  async refreshToken() {
    const token = await getDataString('Token');
    const refreshToken = await getDataString('RefreshToken');
    this.headers['Authorization'] = `Bearer ${token}`;
    try
    {
      const response = await fetch(`${this.baseUrl}/Auth/refresh-token`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ token, refreshToken }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data = await response.json();
      await this.setTokens(data.token, data.refreshToken);
    }
    catch (err)
    {
      console.log(err);
    }
  }

  async fetchWithAuth(url, options) {
    try {
      const response = await fetch(url, options);
      if (response.status === 401) {
        await this.refreshToken();
        options.headers['Authorization'] = this.headers['Authorization'];
        return fetch(url, options);
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async get(auth, endpoint) {
    // console.log(endpoint);
    const url = `${this.baseUrl}${endpoint}`;
    // console.log('API go to '+url);
      var response = Response.ok;
      if (auth)
      {
          await this.loadTokens();
          response = await this.fetchWithAuth(url, {
              method: 'GET',
              headers: this.headers,
          });
          // console.log('Response from API.get with Auth '+response);
      }
      else
      {
          response = await fetch(url);
      }
    if (!response) {
      console.log('Response from API.get if error '+response);
      throw new Error('Network response was not ok');
    }
    return response.json(); 
  }

  async post(endpoint, data) {
    const url = `${this.baseUrl}${endpoint}`;
    await this.loadTokens();
    const response = await this.fetchWithAuth(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }

  async register(username, password, email, role = 'user', birthdate, firstname, lastname) {
    console.log(username);
    const response = await fetch(`${this.baseUrl}/Auth/register`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ username, password, email, role, birthdate, firstname, lastname }),
    });

    if (!response.ok) {
      throw new Error('Failed to register: ' + response.body);
    }
  }

  async login(username, password) {
    console.log("api login in")
    try {
      const response = await fetch(`${this.baseUrl}/Auth/login`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }
      
      const data = await response.json();
      // console.log('Token after Login - '+data.token);
      // console.log('RefreshToken after Login - '+data.refreshToken);
      await this.setTokens(data.token, data.refreshToken);
      return response;
    }
    catch (err)
    {
      console.log(err);
    }
  }

  async updateprofile(Username, Password, Email, Role = 'User', BirthDate, FirstName, LastName, PhoneNumber) {
    const response = await fetch(`${this.baseUrl}/Auth/UpdateProfile`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({Username,  Email, Password, FirstName, LastName,  BirthDate, Role, PhoneNumber }),
    });

    if (!response.ok) {
      throw new Error('Failed to profile updated: ' + response.body);
    }
  }

  async logout() {
    await clearData('Token');
    await clearData('RefreshToken');
    await clearData('RefreshTokenEndDate');
    this.headers['Authorization'] = null;
  }

  async uploadImage(imageUri) {
    if (!imageUri) return;
    // Подготовка данных для отправки
    let localUri = imageUri;
    let filename = localUri.split('/').pop();
  
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
  
    let formData = new FormData();
    formData.append('file', { uri: localUri, name: filename, type });
  
    try {
      let url;
      if (!await this.downloadImage())
        url = `${this.baseUrl}/Auth/UploadProfilePhoto`;
      else
        url = `${this.baseUrl}/Auth/UpdateProfilePhoto`;
      await this.loadTokens();
      const response = await this.fetchWithAuth(url, {
        method: 'POST',
        headers: {
          ...this.headers,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
  
      // Проверка успешности запроса
      if (response.ok) {
        const responseData = await response.json();
        // console.log('Upload successful:', responseData);
      } else {
        console.error('Upload failed with status:', response.status);
      }
  
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  async downloadImage() {
    try {
      const url = `${this.baseUrl}/Auth/GetProfilePhoto`;
      const response = await this.fetchWithAuth(url, {
          method: 'GET',
          headers: this.headers,
      });

      if (!response.ok) {
        return null;
        throw new Error('Network response was not ok');  
      } 

      const blob = await response.blob();

      // Преобразуем blob в Base64 строку асинхронно
      const base64data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

      const fileUri = `${FileSystem.documentDirectory}assets/images/Profilephoto.png`;

      await FileSystem.writeAsStringAsync(fileUri, base64data, {
        encoding: FileSystem.EncodingType.Base64,
      });

      console.log('Image saved to:', fileUri);
      return fileUri;

    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };
}

const instance = new API();
Object.freeze(instance);

export default instance;
