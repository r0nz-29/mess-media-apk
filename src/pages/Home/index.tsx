import {Text, TouchableOpacity, View} from 'react-native';
import Login from '../Login';
import MessList from '../MessList';
import React from 'react';
import {HomeScreenProps} from '../../types/navigation';

const pages = [
  {label: 'Login Page', Component: Login, screen: 'Login'},
  {label: 'Browse Messes', Component: MessList, screen: 'MessList'},
];

export default function Home({navigation}: HomeScreenProps) {
  return (
    <View className="h-full flex flex-col justify-center bg-white p-4">
      {pages.map(page => (
        <TouchableOpacity
          key={Math.random().toString(16)}
          onPress={() => navigation.navigate(page.screen)}
          className="p-4 bg-red-400 font-bold rounded-full mb-4">
          <Text className="text-white text-xl text-center">{page.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
