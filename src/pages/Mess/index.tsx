import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {MessScreenProps} from '../../types/navigation';
import {useEffect, useState} from 'react';
import {Mess} from '../../types/mess';
import axios from 'axios';
import React from 'react';

export default function MessDetails({route}: MessScreenProps) {
  const {messId} = route.params;
  const [mess, setMess] = useState<Mess | null>(null);

  useEffect(() => {
    axios
      .get('https://mess-media.cyclic.app/api/mess/' + messId)
      .then(({data}) => {
        if (data.success) {
          setMess(data.data);
        }
      });
  }, [messId]);

  return (
    <View>
      {mess ? (
        <View className="h-full bg-white">
          <Image source={{uri: mess.photo}} className="w-full h-64" />
          <View className="p-8 px-4">
            <Text className="text-black text-4xl font-bold">{mess.name}</Text>
            <Text className="text-md text-slate-400 mt-4">{mess.address}</Text>
          </View>
          <View className="absolute bottom-0 w-full p-4">
            <TouchableOpacity className="w-full p-4 rounded-full bg-red-400">
              <Text className="text-white text-xl text-center font-bold">
                Subscribe
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View className="h-full flex flex-col justify-center">
          <ActivityIndicator size={48} color="#ffaaaa" />
        </View>
      )}
    </View>
  );
}
