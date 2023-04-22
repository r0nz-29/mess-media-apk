import React, {useEffect} from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {LoginScreenProps} from '../../types/navigation';
import {_login, _userLoggedIn} from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}: LoginScreenProps) {
  const [Email, setEmail] = React.useState('');
  const [Password, setPassword] = React.useState('');

  useEffect(() => {
    async function check() {
      const existing = await _userLoggedIn();
      if (existing) {
        Alert.alert('Already logged in', 'You are already logged in', [
          {
            text: 'OK',
            onPress: () => navigation.push('MessList'),
          },
        ]);
      }
    }

    check();
  }, [navigation]);

  async function login() {
    const data = await _login({Email, Password});
    if (!data) {
      console.log('error occured');
      setEmail('');
      setPassword('');
      return;
    }

    AsyncStorage.setItem('mess-media-user', JSON.stringify({...data}));
    Alert.alert('Success', 'Logged in', [
      {
        text: 'OK',
        onPress: () => navigation.push('MessList'),
      },
    ]);
  }

  return (
    <View className="flex flex-col justify-between h-full bg-white p-8 px-4">
      <View>
        <Icon
          name="arrowleft"
          color="#000"
          size={36}
          onPress={() => navigation.goBack()}
        />
        <Text className="font-bold text-black text-6xl pt-8 mt-8">Login</Text>
        <Text className="text-black text-xl mt-4">
          Enter email and password
        </Text>
        <TextInput
          className="text-black text-xl border-b-2 rounded-sm border-gray-300 focus:border-red-400 mt-8"
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="gray"
          value={Email}
        />
        <TextInput
          className="text-black text-xl border-b-2 rounded-sm border-gray-300 focus:border-red-400 mt-8"
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="gray"
          value={Password}
        />
        <View className="mt-4 flex flex-row gap-x-2">
          <Text className="text-gray-500">Don't have an account?</Text>
          <Text
            className="text-red-500"
            onPress={() => navigation.push('Signup')}>
            Register Now!
          </Text>
        </View>
      </View>
      <TouchableOpacity
        className="w-full p-4 rounded-full bg-red-400"
        onPress={login}>
        <Text className="text-white text-xl text-center font-bold">
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}
