import React, {useState} from 'react';
import axios from 'axios';
import {useEffect} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Mess} from '../../types/mess';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {BrowseMessScreenProps} from '../../types/navigation';

export default function MessList({navigation}: BrowseMessScreenProps) {
  const [messes, setMesses] = useState<Mess[] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('https://mess-media.cyclic.app/api/mess')
      .then(({data}) => {
        if (data.success) {
          setMesses(data.data);
        }
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <View className="bg-white p-8 px-4">
      <View className="flex flex-row justify-between items-center">
        <Text className="text-3xl text-black font-bold">Explore Messes</Text>
        <AntIcon
          name="key"
          color="#000"
          size={24}
          onPress={() => navigation.navigate('Login')}
        />
      </View>
      <TextInput
        className="text-black text-lg border rounded-xl border-gray-300 mt-4 px-4"
        onChangeText={setSearchTerm}
        placeholder="Search mess or owner"
        placeholderTextColor="gray"
        value={searchTerm}
      />
      <ScrollView className="mt-8">
        {!!messes ? (
          messes.map(mess => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Mess', {messId: mess.id})}
              key={Math.random().toString(16)}
              className="border-slate-300 my-4 rounded-lg flex flex-col justify-start border">
              <Image
                source={{uri: mess.photo}}
                className="w-full h-48 rounded-t-lg"
              />
              <View className="flex flex-row justify-between">
                <View className="p-4">
                  <Text className="text-black text-lg font-bold">
                    {mess.name}
                  </Text>
                  <Text className="text-slate-400 text-md">{mess.address}</Text>
                </View>
                <View className="p-4 flex flex-row items-center">
                  <Icon name="rupee" color="green" size={16} />
                  <Text className="text-lg font-bold text-green-700">
                    {mess.price}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <ActivityIndicator size={50} color="#aaaaff" />
        )}
      </ScrollView>
    </View>
  );
}
