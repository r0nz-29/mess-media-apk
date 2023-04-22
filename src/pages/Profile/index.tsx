import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {user} from '../../types/user';
import Header from '../../components/Header';
import {ProfileScreenProps} from '../../types/navigation';
import {_logout, _userLoggedIn} from '../../api';

function Body({navigate}: any) {
  const [currentUser, setCurrentUser] = useState<user>();

  useEffect(() => {
    async function setUser() {
      const json = await _userLoggedIn();
      if (json) {
        setCurrentUser(JSON.parse(json));
      }
    }

    setUser();
  }, []);

  function logout() {
    _logout();
    Alert.alert('Success', 'logged out', [
      {
        text: 'OK',
        onPress: () => navigate('MessList'),
      },
    ]);
  }

  if (currentUser) {
    return (
      <View className="h-full bg-white">
        <View className="p-8 px-4">
          <Text className="text-black text-4xl font-bold">
            {currentUser.Name}
          </Text>
          <Text className="text-md text-slate-400 mt-4">
            {currentUser.Email}
          </Text>
        </View>
        <View className="w-full">
          <TouchableOpacity
            className="w-full p-4 rounded-full bg-red-400"
            onPress={logout}>
            <Text className="text-white text-xl text-center font-bold">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
}

export default function Profile({navigation}: ProfileScreenProps) {
  return (
    <View className="bg-white p-8 px-4">
      <Header title="Profile" navigation={navigation} />
      <ScrollView>
        <Body navigate={navigation.push} />
      </ScrollView>
    </View>
  );
}
