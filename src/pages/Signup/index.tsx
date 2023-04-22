import React, {useEffect, useState} from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {SignupScreenProps} from '../../types/navigation';
import {_register, _userLoggedIn} from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Signup({navigation}: SignupScreenProps) {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

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

  async function register() {
    const data = await _register({Name, Email, Password});
    if (!data) {
      setName('');
      setEmail('');
      setPassword('');
      Alert.alert('Error', 'Some error occured, please try again later');
      return;
    }
    AsyncStorage.setItem('mess-media-user', JSON.stringify({...data}));
    Alert.alert('Success', 'Registered successfully', [
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
        <Text className="font-bold text-black text-6xl pt-8 mt-8">
          Create an account
        </Text>
        <Text className="text-black text-xl mt-4">
          Enter email and password
        </Text>
        <TextInput
          className="text-black text-xl border-b-2 rounded-sm border-gray-300 focus:border-red-400 mt-8"
          onChangeText={setName}
          placeholder="Full Name"
          id="name"
          placeholderTextColor="gray"
          value={Name}
        />
        <TextInput
          className="text-black text-xl border-b-2 rounded-sm border-gray-300 focus:border-red-400 mt-8"
          onChangeText={setEmail}
          placeholder="Email"
          id="email"
          placeholderTextColor="gray"
          value={Email}
        />
        <TextInput
          className="text-black text-xl border-b-2 rounded-sm border-gray-300 focus:border-red-400 mt-8"
          onChangeText={setPassword}
          placeholder="Password"
          id="password"
          placeholderTextColor="gray"
          value={Password}
        />
      </View>
      <TouchableOpacity
        className="w-full p-4 rounded-full bg-red-400"
        onPress={register}>
        <Text className="text-white text-xl text-center font-bold">
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
}
