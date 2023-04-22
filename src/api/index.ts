import axios from 'axios';
import {loginApiProps, registerApiProps} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function _userLoggedIn() {
  return await AsyncStorage.getItem('mess-media-user');
}

export async function _logout() {
  await AsyncStorage.removeItem('mess-media-user');
}

export async function _register(payload: registerApiProps) {
  await AsyncStorage.removeItem('mess-media-user');
  return axios
    .post('https://mess-media.cyclic.app/api/auth/signup', payload)
    .then(({data}) => {
      if (data.success) {
        return data.data;
      }
      return null;
    });
}

export async function _login(payload: loginApiProps) {
  await AsyncStorage.removeItem('mess-media-user');
  return axios
    .post('https://mess-media.cyclic.app/api/auth/signin', payload)
    .then(({data}) => {
      if (data.success) {
        return data.data;
      }
      return null;
    });
}
