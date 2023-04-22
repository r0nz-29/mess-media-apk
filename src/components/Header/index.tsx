import {Image, Text, TouchableOpacity, View} from 'react-native';
import {HeaderProps} from '../../types/header';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import React, {useEffect, useState} from 'react';
import {logo_small} from '../../images';
import {_userLoggedIn} from '../../api';

export default function Header({navigation}: HeaderProps) {
  const [loggedIn, setLoggedIn] = useState(false);

  async function check() {
    const existing = await _userLoggedIn();
    setLoggedIn(Boolean(existing));
  }

  useEffect(() => {
    check();
  }, [loggedIn]);

  return (
    <View className="flex flex-row justify-between items-center">
      <TouchableOpacity
        className="flex flex-row justify-start items-center gap-x-2"
        onPress={() => navigation.push('MessList')}>
        <Image source={{uri: logo_small}} className="w-[40px] h-[40px]" />
        <Text className="text-2xl text-black font-bold">Discover</Text>
      </TouchableOpacity>
      <View className="flex flex-row gap-x-4">
        <AntIcon
          name="notification"
          color="#000"
          size={24}
          onPress={() => navigation.navigate('Login')}
        />
        {loggedIn ? (
          <FeatherIcon
            name="user"
            color="#000"
            size={24}
            onPress={() => navigation.navigate('Profile')}
          />
        ) : (
          <AntIcon
            name="key"
            color="#000"
            size={24}
            onPress={() => navigation.navigate('Login')}
          />
        )}
      </View>
    </View>
  );
}
