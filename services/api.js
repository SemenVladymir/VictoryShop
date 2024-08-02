import AsyncStorage from '@react-native-async-storage/async-storage';
//import {AsyncStorage} from 'react-native';

class API {
  constructor() {
    if (API.instance) {
      return API.instance;
    }
    API.instance = this;

    this.baseUrl = 'https://localhost:7000/api';
    this.headers = {
      'Content-Type': 'application/json',
    };

    return this;
  }

  async setTokens(token, refreshToken) {
    this.headers['Authorize'] = `Bearer ${token}`;
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('refreshToken', refreshToken);
  }

  async loadTokens() {
    const token = await AsyncStorage.getItem('token');
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (token) {
      this.headers['Authorize'] = `Bearer ${token}`;
    }
    this.refreshToken = refreshToken;
  }

  async refreshToken() {
    const response = await fetch(`${this.baseUrl}/Auth/refresh-token`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ token: this.refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    await this.setTokens(data.token, data.refreshToken);
  }

  async fetchWithAuth(url, options) {
    try {
      const response = await fetch(url, options);
      if (response.status === 401) {
        await this.refreshToken();
        options.headers['Authorize'] = this.headers['Authorize'];
        return fetch(url, options);
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async get(auth, endpoint) {
      const url = `${this.baseUrl}${endpoint}`;
      var response = Response.ok;
      if (auth)
      {
          await this.loadTokens();
          response = await this.fetchWithAuth(url, {
              method: 'GET',
              headers: this.headers,
          });
          console.log(response);
      }
      else
      {
          response = await fetch(url);
      }
    if (!response.ok) {
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

  async register(username, password, email, role='user', birthdate) {
    const response = await fetch(`${this.baseUrl}/Auth/register`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ username, password, email, role, birthdate }),
    });

    if (!response.ok) {
      throw new Error('Failed to register');
    }

    const data = await response.json();
    await this.setTokens(data.token, data.refreshToken);
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
      console.log(data.token);
      console.log(data.refreshToken);
      await this.setTokens(data.token, data.refreshToken);
    }
    catch (err)
    {
      console.log(err);
    }
  }

  async logout() {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('refreshToken');
    this.headers['Authorize'] = null;
  }

  // Добавьте другие методы API (PUT, DELETE и т.д.) по мере необходимости
}

const instance = new API();
Object.freeze(instance);

export default instance;
