import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {LoginScreenProps} from '../../types/navigation';

export default function Login({navigation}: LoginScreenProps) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

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
          Enter username and password
        </Text>
        <TextInput
          className="text-black text-xl border-b-2 rounded-sm border-gray-300 focus:border-red-400 mt-8"
          onChangeText={setUsername}
          placeholder="Username"
          placeholderTextColor="gray"
          value={username}
        />
        <TextInput
          className="text-black text-xl border-b-2 rounded-sm border-gray-300 focus:border-red-400 mt-8"
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="gray"
          value={password}
        />
      </View>
      <TouchableOpacity className="w-full p-4 rounded-full bg-red-400">
        <Text className="text-white text-xl text-center font-bold">
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}
